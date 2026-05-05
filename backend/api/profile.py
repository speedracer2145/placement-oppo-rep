from fastapi import APIRouter, HTTPException, UploadFile, File
from services.pdf_parser import extract_text_from_pdf
from agents.profiler_agent import extract_fingerprint, UserProfile

router = APIRouter()

@router.post("/extract", response_model=UserProfile)
async def extract_profile_endpoint(resume: UploadFile = File(...)):
    """
    Takes a PDF resume, parses it, and uses Qwen 2.5 to extract the user's
    Intellectual Fingerprint (archetype, target roles, top skills).
    """
    if not resume.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported for resumes.")

    try:
        print("[PROFILER] Parsing uploaded resume...")
        pdf_bytes = await resume.read()
        resume_text = extract_text_from_pdf(pdf_bytes)
        
        if len(resume_text) < 50:
             raise HTTPException(status_code=400, detail="Could not extract sufficient text from the PDF.")

        print(f"[PROFILER] Extracted {len(resume_text)} chars. Deducing Intellectual Fingerprint with Qwen 2.5...")
        profile = await extract_fingerprint(resume_text)
        
        print(f"[PROFILER] Fingerprint deduced: {profile.archetype}")
        return profile

    except Exception as e:
        print(f"Error in /profile/extract endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
