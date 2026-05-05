"use client";

import { motion } from "framer-motion";

const roadmap = [
  {
    version: "v1",
    time: "now",
    title: "Core shell — preference + hunt + intel + resume",
    items: [
      "Preference training UI seeded with profile",
      "Sample opportunity feed with AI fit scoring via Claude API",
      "Company intel engine (any company, full hiring brief)",
      "Resume paste-and-score with gap analysis"
    ]
  },
  {
    version: "v2",
    time: "next",
    title: "Real agentic search + resume training data",
    items: [
      "Live web scraper: LinkedIn, Wellfound, research lab pages, HN Who's Hiring",
      "Resume training set: curated from YouTube walkthroughs + real hires",
      "Preference model fine-tuning via feedback loops",
      "Deadline tracker + application timeline"
    ]
  },
  {
    version: "v3",
    time: "launch",
    title: "SaaS launch + open source release",
    items: [
      "Auth + multi-user profiles (Next.js + Supabase)",
      "GitHub open source with full MIT license",
      "ProductHunt launch + HN Show HN post",
      "Self-hostable Docker deployment"
    ]
  }
];

export default function Roadmap() {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-12">Build Roadmap</h3>
      
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {roadmap.map((stage, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Timeline dot */}
            <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-background bg-surface absolute left-0 md:left-1/2 -translate-x-0 md:-translate-x-1/2 shrink-0 group-hover:border-brand transition-colors z-10 box-content">
              <span className={`text-xs font-bold ${stage.time === 'now' ? 'text-brand' : 'text-muted'}`}>{stage.version}</span>
            </div>
            
            {/* Card */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-lg border border-border bg-surface ml-auto md:ml-0 group-hover:border-brand/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <span className={`text-xs font-mono px-2 py-1 rounded ${stage.time === 'now' ? 'bg-brand/10 text-brand' : 'bg-border/50 text-muted'}`}>
                  {stage.time}
                </span>
                <h4 className="font-bold text-foreground">{stage.title}</h4>
              </div>
              <ul className="space-y-2">
                {stage.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-muted">
                    <span className="text-brand/50 mt-0.5">›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
