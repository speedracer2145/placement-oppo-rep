import asyncio
from playwright.async_api import async_playwright
from bs4 import BeautifulSoup

async def scrape_url(url: str) -> str:
    """
    Scrapes the text content of a given URL using Playwright.
    Returns cleaned text.
    """
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Setup context with user agent to avoid basic blocks
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        try:
            # Wait until there are no network connections for at least 500 ms.
            await page.goto(url, wait_until="networkidle", timeout=30000)
            html_content = await page.content()
            
            # Clean up with BeautifulSoup
            soup = BeautifulSoup(html_content, "html.parser")
            
            # Remove scripts, styles, and empty tags
            for element in soup(["script", "style", "nav", "footer", "header"]):
                element.decompose()
                
            text = soup.get_text(separator="\n", strip=True)
            return text
            
        except Exception as e:
            print(f"Error scraping {url}: {e}")
            return ""
        finally:
            await browser.close()

if __name__ == "__main__":
    # Test script locally
    import sys
    if len(sys.argv) > 1:
        url = sys.argv[1]
        text = asyncio.run(scrape_url(url))
        print(text[:1000] + "\n...[truncated]")
