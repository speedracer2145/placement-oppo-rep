from playwright.async_api import async_playwright
import urllib.parse
from typing import List

async def search_linkedin_jobs(target_title: str, location: str = "Bangalore", max_results: int = 3) -> List[dict]:
    """
    Uses Playwright to scrape the public LinkedIn job search page for a specific role and location.
    Extracts the job title, company name, and direct URL for the job posting.
    """
    print(f"[LINKEDIN SCRAPER] Deploying agent to find '{target_title}' in {location}...")
    
    # URL encode the query
    keywords = urllib.parse.quote(target_title)
    loc = urllib.parse.quote(location)
    
    # LinkedIn public jobs URL
    search_url = f"https://www.linkedin.com/jobs/search?keywords={keywords}&location={loc}&f_TPR=r2592000" # Last 30 days
    
    results = []
    
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
            )
            page = await context.new_page()
            
            # Navigate to the search page
            await page.goto(search_url, wait_until="domcontentloaded", timeout=30000)
            
            # Wait a moment for job cards to render
            await page.wait_for_timeout(3000)
            
            # Extract job cards
            # LinkedIn public jobs usually have ul > li with class containing 'job-search-card'
            job_cards = await page.query_selector_all("ul.jobs-search__results-list > li")
            
            for i, card in enumerate(job_cards):
                if i >= max_results:
                    break
                    
                title_elem = await card.query_selector("h3.base-search-card__title")
                company_elem = await card.query_selector("h4.base-search-card__subtitle")
                link_elem = await card.query_selector("a.base-card__full-link")
                
                if title_elem and company_elem and link_elem:
                    title = (await title_elem.inner_text()).strip()
                    company = (await company_elem.inner_text()).strip()
                    url = await link_elem.get_attribute("href")
                    
                    # Clean the URL (remove tracking params)
                    if url and "?" in url:
                        url = url.split("?")[0]
                        
                    results.append({
                        "title": title,
                        "company": company,
                        "url": url,
                        "snippet": f"Found on LinkedIn Jobs: {title} at {company}"
                    })
                    
            await browser.close()
            
    except Exception as e:
        print(f"[LINKEDIN SCRAPER ERROR] {e}")
        
    print(f"[LINKEDIN SCRAPER] Found {len(results)} jobs for '{target_title}'")
    return results

# Test block
if __name__ == "__main__":
    import asyncio
    async def test():
        jobs = await search_linkedin_jobs("Product Designer", "Bangalore")
        for j in jobs:
            print(j)
    asyncio.run(test())
