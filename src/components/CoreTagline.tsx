"use client";

import { motion } from "framer-motion";

export default function CoreTagline() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-start md:items-center">
      <div className="flex-1">
        <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-8">Core Tagline</h3>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-5xl sm:text-7xl font-extrabold tracking-tighter"
        >
          <span className="text-foreground block">Stop searching.</span>
          <span className="text-brand italic text-glow block mt-2">Start receiving.</span>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex-1 bg-surface p-8 rounded-lg border border-border"
      >
        <p className="text-xl leading-relaxed text-muted font-medium">
          SIGNAL is the placement layer the internet never built — an agentic
          intelligence that knows you deeply enough to filter the world down to what
          actually matters for your career.
        </p>
      </motion.div>
    </section>
  );
}
