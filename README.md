# SIGNAL v2.0: Agentic AI Placement Engine

![SIGNAL UI Banner](https://img.shields.io/badge/Status-Active_Development-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Local Execution](https://img.shields.io/badge/AI-100%25_Local_Ollama-orange)

SIGNAL is an autonomous, multi-agent career orchestration platform. Instead of a spray-and-pray job hunt, SIGNAL uses local LLMs to deduce your true professional archetype from your resume, deploys stealth web scrapers to find highly specific roles, and performs rigorous gap analysis to score your fit before you even apply. 

Built as a beautiful, immersive web product, it brings the power of agentic AI directly to the candidate—running entirely locally with zero API costs.

---

## 🚀 Features (What's Done)

### 1. Intellectual Fingerprinting (The Profiler Agent)
SIGNAL doesn't ask what you want; it deduces what you are best at. Upload your base PDF resume, and the Qwen 2.5 LLM analyzes your history to generate:
- Your core **Archetype** (e.g., "Platform Engineering Specialist").
- Your **Career Level** and **Top Skills**.
- 3-4 highly specific **Target Job Vectors** to hunt for.

### 2. The Agentic Hunt (Playwright Scrapers)
We bypassed flaky search APIs. SIGNAL spins up a headless Chromium browser via `Playwright` to autonomously navigate public job boards (like LinkedIn Jobs). It loops through your deduced Target Vectors, hunting for real, live roles in your target cities (e.g., Bangalore, Mumbai) and extracting the raw posting links.

### 3. Deep Evaluation (The Evaluator Agent)
For every job found, the Scraper Agent rips the raw HTML of the Job Description. The Evaluator Agent then compares your resume against the JD to calculate a strict **0-100 Fit Score**. It outputs:
- **Why it's a fit**: A targeted explanation of alignment.
- **Missing Skills**: Exactly what you lack for the role.
- **Red Flags**: Dealbreakers (e.g., "Requires 5 years experience, candidate has 1").

### 4. Immersive Command Center UI
A stunning, terminal-inspired web dashboard built with Next.js and Framer Motion. It visualizes the entire multi-agent pipeline in real-time, from PDF extraction to the final Opportunity Feed.

---

## 🛠️ Architecture & Tech Stack

SIGNAL is designed as a decoupled modern web application communicating with a heavy Python AI backend.

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: FastAPI, Uvicorn (Python 3.14).
- **AI Engine**: Ollama running **Qwen 2.5:7b** (100% local, private inference).
- **Web Scraping**: Playwright (Async), BeautifulSoup4.
- **Document Processing**: PyMuPDF (`fitz`).

---

## 🗺️ Roadmap (Future Work)

SIGNAL is actively evolving. The immediate roadmap focuses on closing the loop from "finding" to "applying".

- [ ] **ATS Resume Generator (Priority 1):** A new agent that takes high-scoring jobs and dynamically rewrites the user's base resume bullet points to perfectly match the JD. It will export a customized, ATS-safe PDF tailored for that single application.
- [ ] **Persistent Tracking Database:** Transition from a stateless session to a SQLite/PostgreSQL database to power a Kanban-style Application Tracker (Found → Applied → Interview).
- [ ] **Multi-Source Radar:** Expand the Playwright scrapers beyond LinkedIn to hunt on **Wellfound (AngelList)** and **Naukri.com** for deeper startup/Indian market penetration.
- [ ] **Auto-Apply Agent:** Advanced Playwright scripts to autonomously fill out Greenhouse and Lever application forms with user approval.

---

## ⚙️ Local Setup Instructions

Because SIGNAL runs heavy local AI models, it requires specific setup.

### Prerequisites
1. **Ollama**: Install from [ollama.com](https://ollama.com) and pull the model:
   ```bash
   ollama run qwen2.5:7b
   ```
2. **Node.js** (v18+)
3. **Python 3.10+**

### 1. Start the Backend
Navigate to the `backend` directory, install dependencies, and run the FastAPI server.
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
playwright install chromium
uvicorn main:app --port 8000
```

### 2. Start the Frontend
In a new terminal, navigate to the root directory and start Next.js.
```bash
npm install
npm run dev
```

### 3. Hunt
Open `http://localhost:3000/hunt`, upload your PDF resume, and watch the agents work.

---
*Built to level the playing field for candidates in the AI era.*
