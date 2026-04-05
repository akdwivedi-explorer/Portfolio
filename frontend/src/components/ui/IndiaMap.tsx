"use client";

import { motion } from "framer-motion";

export default function IndiaMap() {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,92,0,0.1)]"
      >
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d="M100 10L105 15L110 12L115 18L120 15L125 20L122 25L130 30L135 28L140 35L138 40L145 45L142 50L150 55L155 52L160 58L158 65L165 70L162 75L170 80L168 85L175 90L172 95L180 100L178 105L185 110L182 115L190 120L188 125L195 130L192 135L200 140L180 160L160 180L140 190L120 200L100 210L80 200L60 190L40 180L20 160L0 140L8 135L5 130L12 125L10 120L18 115L15 110L22 105L20 100L28 95L25 90L32 85L30 80L38 75L35 70L42 65L40 60L48 55L45 50L52 45L50 40L58 35L55 30L62 25L60 20L68 15L65 10L72 5L70 0L100 10Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.2"
          className="text-white"
        />
        {/* Simplified India Outline for visual representation */}
        <motion.path
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ delay: 1, duration: 1 }}
          d="M100 10C120 10 140 40 160 100C180 160 140 190 100 210C60 190 20 160 40 100C60 40 80 10 100 10Z"
          fill="currentColor"
          className="text-accent"
        />
        
        {/* The Pulsating Dot for India Location (simplified center) */}
        <g>
          <motion.circle
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            cx="100"
            cy="110"
            r="8"
            fill="currentColor"
            className="text-accent"
          />
          <circle
            cx="100"
            cy="110"
            r="3"
            fill="currentColor"
            className="text-accent shadow-[0_0_10px_var(--accent)]"
          />
        </g>
      </svg>
      
      {/* Glow Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent pointer-events-none" />
    </div>
  );
}
