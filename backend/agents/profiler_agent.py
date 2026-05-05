import json
from pydantic import BaseModel
from typing import List
import ollama

class UserProfile(BaseModel):
    archetype: str
    target_job_titles: List[str]
    career_level: str
    top_skills: List[str]
    summary: str

async def extract_fingerprint(resume_text: str) -> UserProfile:
    """
    Uses Ollama (Qwen 2.5) to deeply analyze a resume and extract the user's intellectual fingerprint.
    Determines their ideal archetype and specific target job titles.
    """
    
    prompt = f"""
    You are an elite AI Career Strategist.
    Analyze the following Candidate Resume and deduce their 'Intellectual Fingerprint'.
    
    Resume:
    {resume_text[:8000]}
    
    Determine the following:
    1. Archetype: A 2-3 word description of their core professional identity (e.g., 'Platform Engineering Specialist', 'AI Product Visionary', 'Full-Stack Craftsman').
    2. Target Job Titles: 3 to 4 specific job titles they are BEST suited for right now. Be precise (e.g., 'Senior Machine Learning Engineer', 'Staff Data Scientist').
    3. Career Level: E.g., 'Entry-Level', 'Mid-Level', 'Senior', 'Staff', 'Lead'.
    4. Top Skills: The 5 most critical technical or domain skills they possess.
    5. Summary: A punchy, 2-sentence summary of their unique value proposition.
    
    Provide your output STRICTLY as a JSON object matching this structure:
    {{
      "archetype": "string",
      "target_job_titles": ["string"],
      "career_level": "string",
      "top_skills": ["string"],
      "summary": "string"
    }}
    """
    
    try:
        response = await ollama.AsyncClient().chat(
            model='qwen2.5:7b',
            format='json',
            messages=[
                {
                    'role': 'system',
                    'content': 'You are an expert AI Career Strategist. You respond ONLY with valid, parseable JSON matching the requested schema.'
                },
                {
                    'role': 'user',
                    'content': prompt
                }
            ]
        )
        
        response_text = response['message']['content']
        data = json.loads(response_text)
        return UserProfile(**data)
        
    except Exception as e:
        print(f"Error profiling resume: {e}")
        return UserProfile(
            archetype="Unknown Specialist",
            target_job_titles=["Software Engineer"],
            career_level="Unknown",
            top_skills=["Problem Solving"],
            summary="Could not extract profile due to an error."
        )
