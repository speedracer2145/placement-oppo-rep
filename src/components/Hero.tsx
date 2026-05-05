"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

export default function Hero() {
  const tags = [
    "open source",
    "ai-native",
    "agentic",
    "preference learning",
    "resume intelligence",
    "self-hostable",
  ];

  return (
    <section className="relative pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto overflow-hidden">
      {/* Background glowing grid/elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-lg opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-brand/20 to-transparent blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-start gap-6"
      >
        <div className="flex items-center gap-2 text-brand text-xs sm:text-sm font-mono tracking-widest uppercase">
          <Terminal size={14} />
          <span>AI placement intelligence · open source · v1.0</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-brand text-glow"
        >
          SIGNAL
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-medium italic text-foreground/90 max-w-2xl"
        >
          You shouldn&apos;t have to hunt. Your next role should find you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg text-muted max-w-3xl leading-relaxed mt-4"
        >
          SIGNAL is an agentic AI placement platform that learns your intellectual
          fingerprint, hunts opportunities across the web in real time, scores them
          against your goals, deep-dives company hiring culture, and trains a resume
          intelligence engine on curated real-world data — not guesswork. Built by a
          final year CS student who got tired of noise.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-3 mt-8"
        >
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-4 py-1.5 text-xs font-mono border border-border rounded text-muted hover:text-brand hover:border-brand/50 transition-colors cursor-default bg-surface/50"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 flex gap-4"
        >
          <a href="/hunt" className="inline-flex items-center gap-2 bg-brand text-black font-bold font-mono px-8 py-4 rounded hover:bg-brand/90 transition-colors box-glow uppercase tracking-widest text-sm">
            Deploy Hunt Engine ↗
          </a>
          <a href="/playground" className="inline-flex items-center gap-2 bg-transparent text-brand border border-brand/50 font-bold font-mono px-8 py-4 rounded hover:bg-brand/10 transition-colors uppercase tracking-widest text-sm">
            Try Intel Engine
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
