"use client";

import { motion } from "framer-motion";

export default function AnimatedLogo() {
  const letters = "ashutosh".split("");

  return (
    <motion.div 
      className="flex items-center text-sm font-bold tracking-tight text-white cursor-pointer select-none"
      initial="initial"
      whileHover="hover"
    >
      <span className="text-accent mr-[2px]">a</span>
      <div className="flex overflow-hidden">
        {letters.slice(1).map((char, i) => (
          <motion.span
            key={i}
            variants={{
              initial: { y: 0, opacity: 1 },
              hover: { 
                y: [0, -20, 20, 0],
                opacity: [1, 0, 0, 1],
                transition: { 
                  duration: 0.4, 
                  delay: i * 0.03,
                  ease: "easeInOut"
                }
              }
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <motion.span 
        className="ml-[1px] text-accent"
        animate={{ 
          opacity: [1, 0, 1],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "linear"
        }}
      >
        .
      </motion.span>
    </motion.div>
  );
}
