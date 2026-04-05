"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "framer-motion";

export default function GlobeViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let phi = 1.8; // Initial phi to center India
    let width = 0;
    let globe: any;
    const location: [number, number] = [20.5937, 78.9629]; // India

    const initGlobe = (newWidth: number) => {
      if (!canvasRef.current || newWidth === 0) return;
      width = newWidth;
      
      if (globe) globe.destroy();

      // Use actual device pixel ratio for pixel-perfect rendering
      const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 2;

      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 1.8,
        theta: 0.3,
        dark: 0.6, 
        diffuse: 1.5,
        mapSamples: 16000, 
        mapBrightness: 18, 
        baseColor: [0.3, 0.3, 0.4], 
        markerColor: [1, 0.5, 0.2], 
        glowColor: [1, 0.5, 0.2],
        markers: [
          { location, size: 0.15 }, 
          { location: [37.7749, -122.4194], size: 0.04 },
          { location: [51.5074, -0.1278], size: 0.04 },
          { location: [35.6762, 139.6503], size: 0.04 },
        ],
        onRender: (state: any) => {
          state.phi = phi;
          phi += 0.007; 
          
          // Pulsating India marker (selective)
          const pulse = 0.12 + Math.sin(Date.now() / 400) * 0.04;
          state.markers[0].size = pulse;

          // Coordinate Projection for Floating Label
          if (labelRef.current) {
            const r = state.width / 2 / dpr;
            const lat = (location[0] * Math.PI) / 180;
            const lng = (location[1] * Math.PI) / 180;
            
            // Project 3D coordinate to 2D
            // Using the current state.phi which matches the rotation
            const x = r + r * Math.cos(lat) * Math.sin(lng + state.phi);
            const y = r - r * Math.sin(lat);
            
            // Determine if marker is on the visible side
            const isVisible = Math.cos(lng + state.phi) > 0;
            
            // Apply styles directly to DOM element to avoid React re-renders
            labelRef.current.style.transform = `translate(-50%, -100%) translate(${x}px, ${y - 20}px) scale(${isVisible ? 1 : 0.8})`;
            labelRef.current.style.opacity = isVisible ? "1" : "0";
            labelRef.current.style.pointerEvents = isVisible ? "auto" : "none";
          }
        },
      } as any);
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect.width > 0) {
          initGlobe(entry.contentRect.width);
        }
      }
    });

    if (canvasRef.current?.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement);
    }

    // Drag interaction
    let isDragging = false;
    let lastX = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMouseDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      lastX = clientX;
    };
    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      phi -= (clientX - lastX) * 0.005;
      lastX = clientX;
    };
    const onMouseUp = () => { isDragging = false; };

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("touchstart", onMouseDown, { passive: true });
    canvas.addEventListener("touchmove", onMouseMove, { passive: true });
    canvas.addEventListener("touchend", onMouseUp);

    return () => {
      if (globe) globe.destroy();
      resizeObserver.disconnect();
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("touchstart", onMouseDown);
      canvas.removeEventListener("touchmove", onMouseMove);
      canvas.removeEventListener("touchend", onMouseUp);
    };
  }, []);

  return (
    <div 
      className="relative w-full aspect-square group/globe"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", cursor: "grab" }}
        className="opacity-95 contrast-[1.1]"
        id="globe-canvas"
      />
      
      {/* Floating Dynamic Label (DOM-driven for performance) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            ref={labelRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              pointerEvents: "none",
            }}
            className="z-20"
          >
            <div className="px-3 py-1.5 rounded-full card-glass border border-accent/30 shadow-glow-sm shadow-accent/20 flex items-center gap-2 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                Based in India
              </span>
            </div>
            
            {/* Connector Line */}
            <div className="w-[1px] h-4 bg-gradient-to-b from-accent/50 to-transparent mx-auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
