"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ShoppingCart, Database, Layers, Box } from "lucide-react";
import { cn } from "@/lib/utils";

const NODES = [
  { id: "gateway", name: "Gateway", icon: Layers, x: 50, y: 50, color: "text-accent" },
  { id: "auth", name: "Auth Service", icon: ShieldCheck, x: 15, y: 15, color: "text-secondary" },
  { id: "orders", name: "Order Service", icon: ShoppingCart, x: 85, y: 15, color: "text-secondary" },
  { id: "inventory", name: "Inv Service", icon: Box, x: 15, y: 85, color: "text-secondary" },
  { id: "db", name: "DB Cluster", icon: Database, x: 85, y: 85, color: "text-accent" },
];

const CONNECTIONS = [
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "orders" },
  { from: "gateway", to: "inventory" },
  { from: "orders", to: "db" },
  { from: "inventory", to: "db" },
];

export default function SystemArchitectureViz() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-surface/30 rounded-3xl overflow-hidden border border-white/5 group/viz shadow-2xl flex items-center justify-center">
      {/* Background Grid/Matrix Effect - Enhanced */}
      <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <svg viewBox="0 0 100 100" className="w-[92%] h-[92%] overflow-visible relative z-10">
        {/* Connection Lines & Particles */}
        <defs>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5C00" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8A2BE2" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow-v2">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {CONNECTIONS.map((conn, idx) => {
          const fromNode = NODES.find(n => n.id === conn.from)!;
          const toNode = NODES.find(n => n.id === conn.to)!;
          
          return (
            <g key={`conn-${idx}`}>
              <motion.line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="url(#gradient-primary)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: idx * 0.2 }}
              />
              
              {/* Moving Data Particle - More frequent */}
              {[0, 1].map((p) => (
                <motion.circle
                  key={`p-${p}`}
                  r="1.5"
                  fill="#FF5C00"
                  initial={{ cx: fromNode.x, cy: fromNode.y, opacity: 0 }}
                  animate={{
                    cx: [fromNode.x, toNode.x],
                    cy: [fromNode.y, toNode.y],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.8 + p * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: idx * 0.3 + p * 0.6,
                  }}
                  className="drop-shadow-[0_0_12px_#FF5C00]"
                  filter="url(#glow-v2)"
                />
              ))}
            </g>
          );
        })}

        {/* Nodes - Maximized Size */}
        {NODES.map((node, idx) => (
          <motion.g
            key={node.id}
            initial="initial"
            whileHover="hover"
            animate="animate"
            className="cursor-help"
          >
            {/* Hit Area */}
            <circle cx={node.x} cy={node.y} r="15" fill="transparent" className="pointer-events-auto" />

            {/* Pulsating Glow */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="12"
              className={cn("fill-current opacity-20 blur-3xl transition-all duration-700", node.color.replace("text-", "bg-"))}
              variants={{
                initial: { scale: 0.8, opacity: 0 },
                animate: { 
                  scale: [1, 1.2, 1], 
                  opacity: 0.2, 
                  transition: { repeat: Infinity, duration: 3, delay: idx * 0.2 } 
                },
                hover: { scale: 1.5, opacity: 0.4 }
              }}
            />
            
            {/* Node UI */}
            <motion.g
              variants={{
                initial: { scale: 0, opacity: 0 },
                animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 260, damping: 20, delay: idx * 0.1 } },
                hover: { scale: 1.2 }
              }}
            >
              <circle cx={node.x} cy={node.y} r="10" className="fill-black/60 shadow-2xl" />
              <circle cx={node.x} cy={node.y} r="9" className="fill-surface/90 stroke-white/20" strokeWidth="0.6" />
              
              <foreignObject x={node.x - 5} y={node.y - 5} width="10" height="10" className="overflow-visible pointer-events-none">
                <div className="w-full h-full flex items-center justify-center">
                  <node.icon className={cn("w-full h-full transition-all duration-500", node.color)} strokeWidth={1.5} />
                </div>
              </foreignObject>
            </motion.g>

            {/* Large Labels */}
            <motion.text
              x={node.x}
              y={node.y + 18}
              textAnchor="middle"
              className="text-[4px] font-black fill-white uppercase tracking-[0.15em] pointer-events-none drop-shadow-md"
              variants={{
                initial: { opacity: 0, y: node.y + 22 },
                animate: { opacity: 0 },
                hover: { opacity: 1, y: node.y + 18, transition: { type: "spring", stiffness: 300, damping: 20 } }
              }}
            >
              {node.name}
            </motion.text>
          </motion.g>
        ))}
      </svg>
      
      {/* Corner Status Badge - Smaller to avoid compression */}
      <div className="absolute top-4 right-4 flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl z-20 shadow-xl">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_var(--accent)]" />
        <span className="text-[8px] font-black text-white uppercase tracking-[0.2em]">Live Mesh</span>
      </div>
    </div>
  );
}
