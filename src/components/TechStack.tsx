"use client";

import { motion } from "framer-motion";

export default function TechStack() {
  const stacks = [
    {
      category: "AI layer",
      items: ["Claude API (sonnet)", "preference embeddings", "agentic web search", "fine-tuned resume scorer"],
      highlight: true
    },
    {
      category: "Frontend",
      items: ["Next.js 14", "React", "Tailwind", "Framer Motion", "TypeScript"]
    },
    {
      category: "Backend / infra",
      items: ["Python (FastAPI)", "Supabase", "Playwright (scraper)", "Vercel", "Docker"]
    }
  ];

  return (
    <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-8">Tech stack</h3>
      
      <div className="space-y-6">
        {stacks.map((stack, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-border/50 pb-6 last:border-0"
          >
            <div className="w-40 text-sm font-mono text-muted uppercase">
              {stack.category}
            </div>
            <div className="flex flex-wrap gap-3">
              {stack.items.map((item, j) => (
                <span 
                  key={j}
                  className={`px-3 py-1.5 text-xs font-mono border rounded ${
                    stack.highlight ? 'border-brand/50 text-brand bg-brand/5' : 'border-border text-foreground bg-surface'
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
