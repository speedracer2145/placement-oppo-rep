import json
from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List

from services.pdf_parser import extract_text_from_pdf
from services.linkedin_scraper import search_linkedin_jobs
from services.scraper import scrape_url
from agents.evaluator_agent import analyze_job_fit, JobMatch

router = APIRouter()

@router.post("/run", response_model=List[JobMatch])
async def run_hunt(
    resume: UploadFile = File(...),
    targets: str = Form(...)  # JSON string of list of targets e.g. '["Product Designer"]'
):
    """
    Executes Phase 2 and 3 of the placement orchestrator:
    1. Agentic Search using the target job titles deduced in Phase 1
    2. Deep scraping of the found job descriptions
    3. LLM Gap Analysis scoring fit
    """
    if not resume.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for resumes.")

    try:
        # 1. Parse Inputs
        print("[HUNT] Parsing uploaded resume...")
        pdf_bytes = await resume.read()
        resume_text = extract_text_from_pdf(pdf_bytes)
        
        target_titles = json.loads(targets)
        if not target_titles:
            raise ValueError("No target titles provided")
        
        # 2. Agentic Web Hunt (Phase 2)
        found_jobs = []
        seen_urls = set()
        
        # Search the top 2 target vectors to get a broader net (e.g. 6 jobs total)
        for target in target_titles[:2]:
            print(f"[HUNT] Searching LinkedIn Jobs for '{target}'...")
            jobs = await search_linkedin_jobs(target, "Bangalore", max_results=4)
            for job in jobs:
                if job['url'] not in seen_urls:
                    seen_urls.add(job['url'])
                    found_jobs.append(job)

        if not found_jobs:
            print("[HUNT] No jobs found from LinkedIn scraper.")
            return []
        
        # Limit to 6 jobs total to keep LLM evaluation time reasonable
        found_jobs = found_jobs[:10]
        print(f"[HUNT] Extracted {len(found_jobs)} unique jobs across targets. Commencing Deep Evaluation...")

        # 3. Deep Evaluation (Phase 3)
        evaluation_results = []
        for job in found_jobs:
            try:
                print(f"[HUNT] Scraping JD for {job['title']} at {job['company']}...")
                jd_text = await scrape_url(job['url'])
                
                if not jd_text or len(jd_text) < 100:
                    print(f"[HUNT] Failed to extract meaningful JD for {job['company']}")
                    continue
                
                print(f"[HUNT] Evaluating fit for {job['company']} using Qwen 2.5...")
                score = await analyze_job_fit(jd_text, resume_text, job['company'], job['title'], job['url'])
                evaluation_results.append(score)
            except Exception as e:
                print(f"[HUNT] Error evaluating {job['company']}: {e}")
                continue

        # Sort by match score descending
        evaluation_results.sort(key=lambda x: x.match_score, reverse=True)
        return evaluation_results

    except Exception as e:
        print(f"Error in /hunt/run endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
