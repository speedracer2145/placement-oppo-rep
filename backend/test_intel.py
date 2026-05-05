import requests
import json
import time
import sys

def simulate_typing(text):
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(0.01)
    print("\n")

print("\n" + "="*60)
print("🔍 INITIATING AGENTIC INTEL PIPELINE")
print("="*60 + "\n")

url = "http://127.0.0.1:8000/api/intel/generate"
payload = {
    "url": "https://www.anthropic.com/careers",
    "user_preferences": {
        "roles": ["Software Engineer", "Machine Learning Engineer"],
        "goals": ["Work on frontier AI models", "High impact", "Fast paced startup"],
        "anti_goals": ["Slow bureaucratic enterprise", "Legacy tech stacks"],
        "tech_stack": ["Python", "Rust", "React", "TypeScript"]
    }
}

simulate_typing("[SYSTEM] Loading User Preference Vector...")
print(json.dumps(payload["user_preferences"], indent=2))
print()

simulate_typing(f"[AGENT] Target acquired: {payload['url']}")
simulate_typing("[AGENT] Dispatching headless Chromium scraper to bypass JS rendering...")
start_time = time.time()

try:
    response = requests.post(url, json=payload)
    end_time = time.time()
    
    simulate_typing(f"[SYSTEM] Scrape and Inference complete in {end_time - start_time:.2f} seconds.")
    print("-" * 60)
    
    if response.status_code == 200:
        data = response.json()
        simulate_typing("[AGENT] Qwen 2.5 (Local) Analysis Results:")
        
        print(f"\n🏢 Company: {data.get('company_name')}")
        print(f"🎯 FIT SCORE: {data.get('fit_score')}/100")
        
        print("\n🧠 Fit Reasoning:")
        print(data.get('fit_reasoning'))
        
        print("\n🟢 Green Flags (Matches your goals):")
        for flag in data.get('green_flags', []):
            print(f"  + {flag}")
            
        print("\n🔴 Red Flags (Conflicts with your anti-goals):")
        for flag in data.get('red_flags', []):
            print(f"  - {flag}")
            
        print("\n💻 Tech Stack Detected:")
        print(", ".join(data.get('tech_stack', [])))
        
        print("\n👥 Hiring Culture:")
        print(data.get('hiring_culture'))
        
        print("\n" + "="*60)
        
    else:
        print(f"Error {response.status_code}: {response.text}")
except Exception as e:
    print(f"Connection failed: {e}")
