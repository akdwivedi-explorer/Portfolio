"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for the "trailing" effect (outer ring)
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const shouldInteract = 
        target.closest("a") || 
        target.closest("button") || 
        target.hasAttribute("data-cursor-interact");
      
      setIsHovering(!!shouldInteract);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main precision dot (following instantly) */}
          <motion.div
            style={{ x: mouseX, y: mouseY }}
            className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          />

          {/* Trailing Ring */}
          <motion.div
            style={{ x: cursorX, y: cursorY }}
            animate={{
              scale: isHovering ? 2.5 : 1,
              opacity: isHovering ? 0.3 : 0.6,
            }}
            className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
          />

          {/* Subtle Torch/Ambient Light (Immersion) */}
          <motion.div
            style={{ x: cursorX, y: cursorY }}
            animate={{
              scale: isHovering ? 1.4 : 1,
              opacity: 0.15,
            }}
            className="fixed top-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.15)_0%,transparent_70%)] rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 blur-2xl"
          />
        </>
      )}
    </AnimatePresence>
  );
}
