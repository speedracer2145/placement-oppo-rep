"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

export default function ProblemSolution() {
  return (
    <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      <div className="mb-12">
        <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-2">The Problem</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Today Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-surface border border-border p-8 rounded-lg flex flex-col gap-6"
        >
          <div className="flex items-center gap-3 text-red-500 font-mono text-sm uppercase tracking-wider">
            <XCircle size={16} />
            <span>how it is today</span>
          </div>
          
          <ul className="space-y-4 text-muted">
            {["5 different job sites, all noisy", "no context on how companies actually hire", "resume feedback is AI hallucination", "zero personalization to your goals", "you chase. you guess. you wait."].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-red-500/50 mt-1">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Signal Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-brand/20 p-8 rounded-lg flex flex-col gap-6 relative overflow-hidden box-glow"
        >
          <div className="absolute inset-0 bg-brand/[0.02] pointer-events-none"></div>
          <div className="flex items-center gap-3 text-brand font-mono text-sm uppercase tracking-wider">
            <CheckCircle2 size={16} />
            <span>how signal works</span>
          </div>
          
          <ul className="space-y-4 text-foreground">
            {["one agent scans everywhere for you", "deep company briefs: culture, hiring, fit", "resume engine trained on real curated data", "preference model shaped entirely by you", "signal surfaces. you decide. you apply."].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-brand/50 mt-1">›</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
