from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any

from services.scraper import scrape_url
from agents.intel_agent import generate_company_intel, HiringIntel

router = APIRouter()

class IntelRequest(BaseModel):
    url: str
    user_preferences: Dict[str, Any]

@router.post("/generate", response_model=HiringIntel)
async def generate_intel(request: IntelRequest):
    """
    Takes a company career URL and user preferences, scrapes the page,
    and returns an AI-generated structured hiring brief with a fit score.
    """
    try:
        # Step 1: Scrape the raw text from the URL
        print(f"Scraping {request.url}...")
        scraped_text = await scrape_url(request.url)
        
        if not scraped_text:
            raise HTTPException(status_code=400, detail="Could not extract text from the provided URL. It might be heavily protected or invalid.")
            
        print(f"Extracted {len(scraped_text)} characters. Generating intel via Claude...")
        
        # Step 2: Pass the text and preferences to the LLM
        intel = await generate_company_intel(scraped_text, request.user_preferences)
        
        return intel
        
    except Exception as e:
        print(f"Error in /generate endpoint: {e}")
        raise HTTPException(status_code=500, detail=str(e))
