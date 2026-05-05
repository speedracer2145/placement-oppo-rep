"use client";

import { Terminal, MessageCircle, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 py-12 flex flex-col md:flex-row gap-8 justify-between items-center">
        
        <div className="flex-1 max-w-md">
          <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-6">GitHub source code</h3>
          <a href="#" className="block p-6 rounded-lg border border-border bg-surface hover:border-brand/40 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <h4 className="font-bold text-lg font-mono flex items-center gap-2">
                <Terminal size={20} />
                alok-dev/signal
              </h4>
              <span className="flex items-center gap-1 text-xs font-mono px-3 py-1 bg-border/50 rounded-full group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                View Repo <ExternalLink size={12} />
              </span>
            </div>
            <p className="text-sm text-muted">
              An agentic AI placement intelligence platform. Learns your profile, hunts opportunities globally, scores fit in real time, deep dives company hiring culture, and trains resume intelligence on curated data — not guesswork. Built by a final year CS student. Open source. Self-hostable.
            </p>
          </a>
        </div>

        <div className="flex flex-col items-center md:items-end gap-4 text-sm text-muted font-mono">
          <p>Designed by <span className="text-brand">alok</span> • Built with stack</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground flex items-center gap-2 border border-border px-4 py-2 rounded hover:border-brand/50 transition-colors">
              <MessageCircle size={14} /> TWEET ↗
            </a>
            <a href="#" className="hover:text-foreground flex items-center gap-2 border border-border px-4 py-2 rounded hover:border-brand/50 transition-colors">
              PH LAUNCH ↗
            </a>
            <a href="#" className="hover:text-foreground flex items-center gap-2 border border-border px-4 py-2 rounded hover:border-brand/50 transition-colors">
              BUILD V2 ↗
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
