"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, ChevronRight, Link2, Settings2, Target, XOctagon, Code2, Play } from "lucide-react";
import Link from "next/link";

interface IntelData {
  company_name: string;
  hiring_culture: string;
  tech_stack: string[];
  red_flags: string[];
  green_flags: string[];
  interview_process: string;
  fit_score: number;
  fit_reasoning: string;
}

export default function Playground() {
  const [url, setUrl] = useState("https://www.anthropic.com/careers");
  const [roles, setRoles] = useState("Software Engineer, Machine Learning Engineer");
  const [goals, setGoals] = useState("Work on frontier AI models, High impact, Fast paced startup");
  const [antiGoals, setAntiGoals] = useState("Slow bureaucratic enterprise, Legacy tech stacks");
  const [techStack, setTechStack] = useState("Python, Rust, React, TypeScript");
  
  const [status, setStatus] = useState<"idle" | "scraping" | "analyzing" | "complete" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [intelData, setIntelData] = useState<IntelData | null>(null);

  const runAgent = async () => {
    setStatus("scraping");
    setIntelData(null);
    setErrorMsg("");

    try {
      // Simulate the step to analyzing for UI feel
      setTimeout(() => setStatus("analyzing"), 15000); // Scrapes usually take 10-15s

      const response = await fetch("http://127.0.0.1:8000/api/intel/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          user_preferences: {
            roles: roles.split(",").map(s => s.trim()),
            goals: goals.split(",").map(s => s.trim()),
            anti_goals: antiGoals.split(",").map(s => s.trim()),
            tech_stack: techStack.split(",").map(s => s.trim()),
          }
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setIntelData(data);
      setStatus("complete");
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to generate intel. Is the backend running?");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-brand selection:text-black">
      {/* Navbar */}
      <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between z-10 bg-surface/50 backdrop-blur">
        <Link href="/" className="flex items-center gap-2 text-brand font-mono tracking-widest uppercase hover:text-white transition-colors">
          <Terminal size={18} />
          <span>SIGNAL</span>
        </Link>
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          <Activity size={14} className={status === 'idle' || status === 'complete' ? 'text-muted' : 'text-brand animate-pulse'} />
          <span>Status: {status.toUpperCase()}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E24_1px,transparent_1px),linear-gradient(to_bottom,#1E1E24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        {/* Input Panel (Left) */}
        <div className="w-full lg:w-1/3 border-r border-border/50 bg-surface/80 p-6 sm:p-8 flex flex-col gap-8 overflow-y-auto z-10 relative">
          <div>
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <Settings2 size={20} className="text-brand" /> 
              Agent Configuration
            </h2>
            <p className="text-sm text-muted">Configure your Intel fingerprint.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted uppercase flex items-center gap-2">
                <Link2 size={12} /> Target Career URL
              </label>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-background border border-border rounded p-3 text-sm focus:outline-none focus:border-brand/50 font-mono"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-muted uppercase flex items-center gap-2">
                <Target size={12} /> Desired Roles
              </label>
              <input 
                type="text" 
                value={roles}
                onChange={(e) => setRoles(e.target.value)}
                className="w-full bg-background border border-border rounded p-3 text-sm focus:outline-none focus:border-brand/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-muted uppercase flex items-center gap-2">
                <Activity size={12} className="text-green-500" /> Career Goals
              </label>
              <textarea 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="w-full bg-background border border-border rounded p-3 text-sm focus:outline-none focus:border-brand/50 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-muted uppercase flex items-center gap-2">
                <XOctagon size={12} className="text-red-500" /> Anti-Goals (Dealbreakers)
              </label>
              <textarea 
                value={antiGoals}
                onChange={(e) => setAntiGoals(e.target.value)}
                className="w-full bg-background border border-border rounded p-3 text-sm focus:outline-none focus:border-brand/50 min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-muted uppercase flex items-center gap-2">
                <Code2 size={12} /> Tech Stack Expertise
              </label>
              <input 
                type="text" 
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full bg-background border border-border rounded p-3 text-sm focus:outline-none focus:border-brand/50 font-mono"
              />
            </div>

            <button 
              onClick={runAgent}
              disabled={status === "scraping" || status === "analyzing"}
              className="w-full bg-brand text-black font-bold font-mono uppercase tracking-widest py-4 rounded hover:bg-brand/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed box-glow"
            >
              <Play fill="black" size={16} />
              {status === "idle" || status === "complete" || status === "error" ? "Run Intel Engine" : "Agent Active..."}
            </button>
          </div>
        </div>

        {/* Output Panel (Right) */}
        <div className="flex-1 bg-background/50 p-6 sm:p-12 overflow-y-auto relative z-10 flex flex-col">
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-muted border border-border/50 border-dashed rounded-lg p-12 text-center"
              >
                <Terminal size={48} className="mb-4 opacity-20" />
                <h3 className="font-mono text-xl mb-2">Intel Engine Offline</h3>
                <p className="max-w-md text-sm leading-relaxed">Configure your target URL and intellectual fingerprint on the left, then run the agent to see live scraping and Qwen 2.5 analysis.</p>
              </motion.div>
            )}

            {(status === "scraping" || status === "analyzing") && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-full text-brand"
              >
                <div className="w-16 h-16 border-2 border-brand/20 border-t-brand rounded-full animate-spin mb-8"></div>
                <h3 className="font-mono text-xl mb-2 text-glow">
                  {status === "scraping" ? "1. Bypassing JS & Scraping DOM..." : "2. Qwen 2.5 Generating Intel..."}
                </h3>
                <p className="font-mono text-xs text-muted">This takes 20-40 seconds locally.</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-950/20 border border-red-500/50 text-red-400 p-6 rounded-lg font-mono text-sm"
              >
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><XOctagon size={16} /> Agent Execution Failed</h3>
                {errorMsg}
              </motion.div>
            )}

            {status === "complete" && intelData && (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8 pb-12"
              >
                <div className="flex items-end justify-between border-b border-border/50 pb-6">
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{intelData.company_name}</h1>
                    <div className="flex items-center gap-2 text-xs font-mono text-brand">
                      <ChevronRight size={14} /> Agent Report Complete
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono text-muted uppercase tracking-widest mb-1">Fit Score</div>
                    <div className="text-5xl font-black text-brand text-glow">{intelData.fit_score}/100</div>
                  </div>
                </div>

                <div className="bg-surface/50 border border-border p-6 rounded-lg">
                  <h3 className="text-sm font-mono text-brand uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Activity size={14} /> Fit Reasoning
                  </h3>
                  <p className="text-muted leading-relaxed">{intelData.fit_reasoning}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-surface/50 border border-border p-6 rounded-lg">
                    <h3 className="text-sm font-mono text-green-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ChevronRight size={14} /> Green Flags
                    </h3>
                    <ul className="space-y-3">
                      {intelData.green_flags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-green-500 mt-0.5">+</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-surface/50 border border-border p-6 rounded-lg">
                    <h3 className="text-sm font-mono text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ChevronRight size={14} /> Red Flags
                    </h3>
                    <ul className="space-y-3">
                      {intelData.red_flags.map((flag, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-red-500 mt-0.5">-</span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Code2 size={14} /> Detected Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {intelData.tech_stack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 text-xs font-mono bg-brand/10 text-brand border border-brand/20 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Terminal size={14} /> Hiring Culture
                  </h3>
                  <p className="text-muted leading-relaxed bg-background border border-border p-5 rounded font-mono text-sm">
                    {intelData.hiring_culture}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-mono text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Target size={14} /> Interview Process
                  </h3>
                  <p className="text-muted leading-relaxed bg-background border border-border p-5 rounded font-mono text-sm">
                    {intelData.interview_process}
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
