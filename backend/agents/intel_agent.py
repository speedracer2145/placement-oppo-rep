import os
import json
from pydantic import BaseModel
from typing import List
import ollama

class HiringIntel(BaseModel):
    company_name: str
    hiring_culture: str
    tech_stack: List[str]
    red_flags: List[str]
    green_flags: List[str]
    interview_process: str
    fit_score: int
    fit_reasoning: str

async def generate_company_intel(scraped_text: str, user_preferences: dict) -> HiringIntel:
    """
    Uses Ollama (Qwen 2.5) to extract structured intel from raw scraped text and score
    it against the user's specific preference vector.
    """
    
    prompt = f"""
    You are an elite talent placement AI. 
    Analyze the following scraped raw text from a company's career/about page.
    Extract the key information about their engineering culture, tech stack, and interview process.
    
    Then, score this company out of 100 based on how well it aligns with the following User Preferences:
    {json.dumps(user_preferences, indent=2)}
    
    Raw Scraped Text:
    {scraped_text[:10000]} # Limit tokens just in case
    
    Provide your output STRICTLY as a JSON object matching this structure:
    {{
      "company_name": "string",
      "hiring_culture": "string (short paragraph)",
      "tech_stack": ["string"],
      "red_flags": ["string"],
      "green_flags": ["string"],
      "interview_process": "string",
      "fit_score": int (0-100),
      "fit_reasoning": "string (why did you give this score based on the user preferences)"
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
        # Parse the JSON response
        data = json.loads(response_text)
        return HiringIntel(**data)
        
    except Exception as e:
        print(f"Error generating intel: {e}")
        # Return empty shell if error
        return HiringIntel(
            company_name="Error",
            hiring_culture="Failed to generate.",
            tech_stack=[],
            red_flags=[],
            green_flags=[],
            interview_process="Unknown",
            fit_score=0,
            fit_reasoning=str(e)
        )
