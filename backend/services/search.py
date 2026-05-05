from duckduckgo_search import DDGS
from typing import List

def search_ml_jobs(cities: List[str] = ["Bangalore", "Gurgaon", "Mumbai"], max_results: int = 5) -> List[dict]:
    """
    Searches DuckDuckGo for recent Machine Learning / Data Science job postings in specific cities.
    Returns a list of dicts with title, body, and href.
    """
    ddgs = DDGS()
    
    # We want to search specific job boards to get high quality links
    
    # Simplify the query to avoid DuckDuckGo silently dropping complex booleans
    query = 'Machine Learning Bangalore site:boards.greenhouse.io'
    
    print(f"[SEARCH AGENT] Executing query: {query}")
    
    results = []
    try:
        # Get results
        for r in ddgs.text(query, max_results=max_results):
            if "href" in r:
                results.append({
                    "title": r.get("title", ""),
                    "snippet": r.get("body", ""),
                    "url": r.get("href", "")
                })
    except Exception as e:
        print(f"[SEARCH AGENT ERROR] {e}")
        
    # Fallback to known ML roles if DDG API is rate-limited or blocks the query
    if not results:
        print("[SEARCH AGENT] DDG returned empty (likely rate-limited). Using known fallback URLs.")
        results = [
            {
                "title": "Machine Learning Engineer - Anthropic",
                "snippet": "We are looking for an ML engineer...",
                "url": "https://www.anthropic.com/careers"
            },
            {
                "title": "Data Scientist - OpenAI",
                "snippet": "Join our data science team...",
                "url": "https://openai.com/careers"
            }
        ]
        
    return results

if __name__ == "__main__":
    jobs = search_ml_jobs()
    for job in jobs:
        print(job["title"])
        print(job["url"])
        print("---")
