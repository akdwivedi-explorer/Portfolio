"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="relative w-full h-px overflow-hidden">
      {/* Background line (very subtle) */}
      <div className="absolute inset-x-0 h-px bg-white/[0.05]" />
      
      {/* Glowing spotlight that animates across or stays in the center */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />
      
      {/* Immersive glow effect */}
      <div className="absolute inset-x-0 h-8 -top-4 opacity-10 bg-gradient-to-b from-accent/20 to-transparent blur-xl pointer-events-none" />
    </div>
  );
}
