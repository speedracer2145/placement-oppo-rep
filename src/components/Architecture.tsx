"use client";

import { motion } from "framer-motion";

const engines = [
  {
    num: "01",
    title: "Preference Engine",
    desc: "Learns your intellectual fingerprint. Goals, anti-goals, domain obsessions, energy levels. Gets smarter every interaction."
  },
  {
    num: "02",
    title: "Hunt Engine",
    desc: "Agentic web crawler. Surfaces roles from labs, product cos, startups globally. Scores every opportunity in real time against your profile."
  },
  {
    num: "03",
    title: "Resume Brain",
    desc: "Not GPT guessing. Trained on hand-curated resumes from real top-tier hires. Scores, rewrites, and tells you exactly what's missing."
  }
];

const layers = [
  {
    name: "Preference Core",
    layer: "layer 1",
    title: "Identity model + preference training",
    desc: "Builds a weighted vector of your goals, skills, domains, aversions. Every score is relative to this — not to average candidates."
  },
  {
    name: "Hunt Agent",
    layer: "layer 2",
    title: "Agentic opportunity crawler + scorer",
    desc: "Scrapes research lab pages, job boards, GitHub repos, company career sites. Runs every result through preference core before surfacing to you."
  },
  {
    name: "Intel Engine",
    layer: "layer 3",
    title: "Company hiring deep-dives on demand",
    desc: "Synthesizes hiring culture, interview process, what each company actually values, red flags, and a direct personal fit assessment."
  },
  {
    name: "Resume Brain",
    layer: "layer 4",
    title: "Trained resume intelligence engine",
    desc: "Curated training set from real successful resumes at top labs and product companies. Scores, gaps, rewrites — grounded in data not vibes."
  },
  {
    name: "Apply Layer",
    layer: "layer 5",
    title: "One-click application pipeline",
    desc: "Tracks status, surfaces prep material per company, maintains your application history with timeline and notes."
  }
];

export default function Architecture() {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-12">Three-engine architecture</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {engines.map((eng, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface border border-border p-8 rounded-lg"
          >
            <div className="text-4xl font-bold text-brand mb-4">{eng.num}</div>
            <h4 className="text-xl font-bold mb-3">{eng.title}</h4>
            <p className="text-muted leading-relaxed text-sm">{eng.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4">
        {layers.map((layer, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col md:flex-row bg-surface border border-border rounded-lg overflow-hidden group hover:border-brand/40 transition-colors"
          >
            <div className="bg-border/30 p-6 md:w-48 flex flex-col justify-center border-b md:border-b-0 md:border-r border-border">
              <h5 className="font-bold text-lg">{layer.name}</h5>
              <span className="text-xs font-mono text-muted uppercase mt-1">{layer.layer}</span>
            </div>
            <div className="p-6 flex-1">
              <h6 className="font-bold text-brand mb-2">{layer.title}</h6>
              <p className="text-muted text-sm leading-relaxed">{layer.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
