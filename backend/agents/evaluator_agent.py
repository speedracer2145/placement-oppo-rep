import json
from pydantic import BaseModel
from typing import List
import ollama

class JobMatch(BaseModel):
    company_name: str
    job_title: str
    match_score: int
    why_fit: str
    missing_skills: List[str]
    red_flags: List[str]
    url: str

async def analyze_job_fit(scraped_job_text: str, resume_text: str, company_name: str, job_title: str, url: str) -> JobMatch:
    """
    Uses Ollama (Qwen 2.5) to compare a scraped job description against the user's resume
    and return a structured match analysis.
    """
    
    prompt = f"""
    You are an elite AI technical recruiter.
    Analyze the following Job Description against the Candidate's Resume.
    
    Job Description (from {company_name} - {job_title}):
    {scraped_job_text[:8000]} 
    
    Candidate Resume:
    {resume_text[:8000]}
    
    Score the candidate's fit for this specific role out of 100. Be realistic and rigorous.
    Identify why they are a good fit, what specific skills they are missing that the job requires,
    and any red flags (e.g., job requires 10 years experience but candidate is a new grad).
    
    Provide your output STRICTLY as a JSON object matching this structure:
    {{
      "company_name": "{company_name}",
      "job_title": "{job_title}",
      "match_score": int (0-100),
      "why_fit": "string (1-2 sentences explaining the strongest alignment)",
      "missing_skills": ["string"],
      "red_flags": ["string"],
      "url": "{url}"
    }}
    """
    
    try:
        response = await ollama.AsyncClient().chat(
            model='qwen2.5:7b',
            format='json',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are an expert AI recruiter. You respond ONLY with valid, parseable JSON matching the requested schema.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )
        
        response_text = response['message']['content']
        data = json.loads(response_text)
        # Ensure URL is maintained
        if "url" not in data or data["url"] != url:
            data["url"] = url
        return JobMatch(**data)
        
    except Exception as e:
        print(f"Error matching job: {e}")
        return JobMatch(
            company_name=company_name,
            job_title=job_title,
            match_score=0,
            why_fit="Error analyzing fit.",
            missing_skills=[],
            red_flags=[str(e)],
            url=url
        )
