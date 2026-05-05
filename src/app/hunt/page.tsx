"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Activity, FileText, Upload, Radar, Briefcase, ExternalLink, AlertTriangle, CheckCircle2, User, Crosshair } from "lucide-react";
import Link from "next/link";

interface JobMatch {
  company_name: string;
  job_title: string;
  match_score: number;
  why_fit: string;
  missing_skills: string[];
  red_flags: string[];
  url: string;
}

interface UserProfile {
  archetype: string;
  target_job_titles: string[];
  career_level: string;
  top_skills: string[];
  summary: string;
}

export default function HuntEngine() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "profiling" | "profile_ready" | "hunting" | "complete" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [jobs, setJobs] = useState<JobMatch[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const extractProfile = async () => {
    if (!file) return;
    setStatus("profiling");
    setErrorMsg("");

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/profile/extract", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setProfile(data);
      setStatus("profile_ready");
    } catch (e: any) {
      setErrorMsg(e.message || "Failed to extract profile. Is the backend running?");
      setStatus("error");
    }
  };

  const runHunt = async () => {
    if (!file || !profile) return;
    setStatus("hunting");
    setJobs([]);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("resume", file);
    // In Phase 2 we will pass the target_job_titles to the hunt endpoint
    formData.append("targets", JSON.stringify(profile.target_job_titles));

    try {
      // Still hitting the old endpoint for now until we build Phase 2
      const response = await fetch("http://127.0.0.1:8000/api/hunt/run", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setJobs(data);
      setStatus("complete");
    } catch (e: any) {
      setErrorMsg(e.message || "Hunt failed.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-brand selection:text-black">
      {/* Navbar */}
      <header className="border-b border-border/50 px-6 py-4 flex items-center justify-between z-10 bg-surface/50 backdrop-blur">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 text-brand font-mono tracking-widest uppercase hover:text-white transition-colors">
            <Terminal size={18} />
            <span>SIGNAL v2</span>
          </Link>
          <nav className="hidden md:flex gap-4 text-sm font-mono">
            <Link href="/playground" className="text-muted hover:text-foreground">Intel Engine</Link>
            <Link href="/hunt" className="text-brand">Hunt Engine</Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-muted">
          <Activity size={14} className={status === 'profiling' || status === 'hunting' ? 'text-brand animate-spin' : 'text-muted'} />
          <span>Status: {status.toUpperCase()}</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E1E24_1px,transparent_1px),linear-gradient(to_bottom,#1E1E24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

        {/* Input Panel (Left) */}
        <div className="w-full lg:w-1/3 border-r border-border/50 bg-surface/80 p-6 sm:p-8 flex flex-col gap-8 z-10 relative overflow-y-auto">
          <div>
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <User size={20} className="text-brand" /> 
              Intellectual Fingerprint
            </h2>
            <p className="text-sm text-muted">Upload your resume. The AI will deduce your true strengths and construct a targeted search vector.</p>
          </div>

          <div className="space-y-6 flex-1">
            <div className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center gap-4 transition-colors relative ${file ? 'border-brand/50 bg-brand/5' : 'border-border bg-background/50'}`}>
              <input 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FileText size={32} className={file ? "text-brand" : "text-muted"} />
              <div>
                <p className="font-mono text-sm mb-1">{file ? file.name : "Upload Resume (PDF)"}</p>
                <p className="text-xs text-muted">Click or drag & drop</p>
              </div>
            </div>

            {status === "idle" || status === "error" ? (
              <button 
                onClick={extractProfile}
                disabled={!file}
                className="w-full bg-border text-foreground font-bold font-mono uppercase tracking-widest py-4 rounded hover:bg-border/80 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload size={16} />
                Extract Profile
              </button>
            ) : null}
            
            {status === "profiling" && (
               <div className="w-full bg-background border border-border text-brand font-mono text-sm py-4 rounded flex items-center justify-center gap-2">
                 <Activity size={16} className="animate-spin" />
                 Deducing Archetype...
               </div>
            )}

            <AnimatePresence>
              {profile && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-border/50"
                >
                  <div>
                    <span className="text-xs text-muted font-mono uppercase mb-1 block">Deduced Archetype</span>
                    <div className="text-lg font-bold text-brand">{profile.archetype}</div>
                  </div>
                  
                  <div>
                    <span className="text-xs text-muted font-mono uppercase mb-1 block">Level</span>
                    <div className="text-sm">{profile.career_level}</div>
                  </div>

                  <div>
                    <span className="text-xs text-muted font-mono uppercase mb-1 block">Top Skills</span>
                    <div className="flex flex-wrap gap-2">
                      {profile.top_skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-brand/10 text-brand px-2 py-1 rounded font-mono">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs text-muted font-mono uppercase mb-2 block">Generated Target Vectors</span>
                    <ul className="space-y-2">
                      {profile.target_job_titles.map((title, i) => (
                        <li key={i} className="text-sm flex items-center gap-2"><Crosshair size={14} className="text-brand"/> {title}</li>
                      ))}
                    </ul>
                  </div>

                  <button 
                    onClick={runHunt}
                    disabled={status === "hunting"}
                    className="w-full mt-4 bg-brand text-black font-bold font-mono uppercase tracking-widest py-4 rounded hover:bg-brand/90 transition-all flex items-center justify-center gap-2 box-glow"
                  >
                    <Radar size={16} />
                    {status === "hunting" ? "Hunting Targets..." : "Confirm & Deploy Hunt"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Output Panel (Right) */}
        <div className="flex-1 bg-background/50 p-6 sm:p-12 overflow-y-auto relative z-10">
          <AnimatePresence mode="wait">
            {(status === "idle" || status === "profiling" || status === "profile_ready") && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-full text-muted border border-border/50 border-dashed rounded-lg p-12 text-center"
              >
                <Radar size={48} className="mb-4 opacity-20" />
                <h3 className="font-mono text-xl mb-2">Radar Standby</h3>
                <p className="max-w-md text-sm leading-relaxed">Upload your resume to extract your intellectual fingerprint. We will construct a dynamic search to find roles perfectly suited to your skills.</p>
              </motion.div>
            )}

            {status === "hunting" && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-full text-brand"
              >
                <Radar size={48} className="animate-pulse mb-6 text-glow" />
                <h3 className="font-mono text-xl mb-2 text-glow">Agentic Web Hunt in Progress</h3>
                <p className="font-mono text-xs text-muted max-w-sm text-center">Searching real-time boards for "{profile?.target_job_titles[0]}" → Extracting JDs → Deep Evaluation via Qwen 2.5...</p>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-950/20 border border-red-500/50 text-red-400 p-6 rounded-lg font-mono text-sm"
              >
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2"><AlertTriangle size={16} /> Operation Failed</h3>
                {errorMsg}
              </motion.div>
            )}

            {status === "complete" && jobs.length > 0 && (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Activity className="text-brand" /> Opportunity Feed
                  </h2>
                  <span className="text-sm font-mono text-muted">{jobs.length} Matches Found</span>
                </div>

                {jobs.map((job, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-surface border border-border p-6 rounded-lg hover:border-brand/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{job.job_title}</h3>
                        <p className="text-sm font-mono text-muted uppercase">{job.company_name}</p>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <span className="text-xs font-mono text-muted mb-1">FIT SCORE</span>
                        <div className={`text-3xl font-black ${job.match_score > 75 ? 'text-brand text-glow' : 'text-yellow-500'}`}>
                          {job.match_score}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted leading-relaxed mb-6 bg-background/50 p-4 rounded border border-border/50">
                      <strong>Agent Analysis:</strong> {job.why_fit}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <h4 className="text-xs font-mono text-red-500 uppercase flex items-center gap-1 mb-2">
                          <AlertTriangle size={12} /> Missing Skills
                        </h4>
                        <ul className="space-y-1">
                          {job.missing_skills.length > 0 ? job.missing_skills.map((skill, i) => (
                            <li key={i} className="text-xs text-muted flex gap-2"><span>-</span> {skill}</li>
                          )) : <li className="text-xs text-muted">None detected.</li>}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono text-yellow-500 uppercase flex items-center gap-1 mb-2">
                          <Activity size={12} /> Red Flags / Risks
                        </h4>
                        <ul className="space-y-1">
                          {job.red_flags.length > 0 ? job.red_flags.map((flag, i) => (
                            <li key={i} className="text-xs text-muted flex gap-2"><span>!</span> {flag}</li>
                          )) : <li className="text-xs text-muted">None detected.</li>}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/50">
                      <button className="text-xs font-mono bg-brand/10 text-brand px-4 py-2 rounded hover:bg-brand/20 transition-colors">
                        Generate ATS Resume (Coming Soon)
                      </button>
                      <a 
                        href={job.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-mono bg-border/50 hover:bg-border text-foreground px-4 py-2 rounded flex items-center gap-2 transition-colors"
                      >
                        View Original <ExternalLink size={12} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
