"use client";

import { motion } from "framer-motion";

export default function Manifesto() {
  return (
    <section className="py-24 px-6 sm:px-12 max-w-4xl mx-auto">
      <h3 className="text-sm font-mono text-muted tracking-widest uppercase mb-12">Manifesto</h3>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <blockquote className="text-2xl sm:text-3xl font-medium italic border-l-4 border-brand pl-6 text-foreground">
          "The best engineers don't find jobs by applying to 200 companies. They get found — because their signal is clear."
        </blockquote>
        
        <div className="space-y-6 text-lg text-muted leading-relaxed">
          <p>
            SIGNAL is built on one belief: the placement process is broken because it's built for volume, not intelligence. You are not an average candidate. Your goals are specific. Your strengths are real. The right opportunity exists — it's just buried under noise.
          </p>
          <p>
            SIGNAL is the tool that cuts through it. Not by applying everywhere. But by knowing you well enough to know where you belong.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
