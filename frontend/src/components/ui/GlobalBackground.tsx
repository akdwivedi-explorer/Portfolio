"use client";

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-[100] overflow-hidden select-none bg-background">
      {/* Base Noise Texture - Static for a more solid feel */}
      <div className="absolute inset-0 opacity-[0.02] bg-noise" />

      {/* Primary Hero Gradient - Exact top-center transition */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />

      {/* Subtle Ambient Glows - Toned down and static */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1000px] max-w-7xl rounded-full bg-accent/[0.03] blur-[200px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[1200px] h-[1000px] rounded-full bg-success/[0.02] blur-[180px]" />
      
      {/* Subtle Bottom Vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
