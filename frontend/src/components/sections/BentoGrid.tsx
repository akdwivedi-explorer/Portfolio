"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Wrench, Cpu } from "lucide-react";
import dynamic from "next/dynamic";

const SystemArchitectureViz = dynamic(() => import("@/components/ui/SystemArchitectureViz"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface animate-pulse rounded-2xl" />
  ),
});

const METRICS = [
  { label: "Meets Deadlines", emoji: "⏱️" },
  { label: "Fully Scoped", emoji: "📋" },
  { label: "Accurately Estimated", emoji: "🎯" },
  { label: "Production-Ready", emoji: "🚀" },
  { label: "Clean Architecture", emoji: "🏗️" },
  { label: "Well Documented", emoji: "📚" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as any },
  }),
};

import { usePortfolio } from "@/providers/PortfolioProvider";

export default function BentoGrid() {
  const { data, loading } = usePortfolio();
  const projectCount = data?.projects?.length || 0;

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
            Why Work With Me
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What you <span className="text-gradient-accent">get</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1 — Metrics (tall, spans 2 rows) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-1 md:row-span-2 card-glass rounded-2xl p-6 flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">What You Get</h3>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 transition-colors"
                >
                  <span className="text-base">{metric.emoji}</span>
                  <span className="text-sm text-white">{metric.label}</span>
                  <CheckCircle2
                    size={14}
                    className="ml-auto text-emerald-500 flex-shrink-0"
                  />
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-white/5">
              <p className="text-xs text-secondary">
                {projectCount}+ projects shipped across EdTech, SaaS &amp; DevTools.
              </p>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-2 card-glass rounded-2xl p-6 flex flex-col md:flex-row items-center gap-8 overflow-hidden group/arch"
          >
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Cpu size={16} className="text-accent" />
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">
                  The Architecture
                </p>
              </div>
              <h3 className="text-2xl font-black text-white mb-3 tracking-tighter uppercase leading-none italic">
                Scalable <br /> <span className="text-gradient">Architectures.</span>
              </h3>
              <p className="text-sm text-secondary leading-relaxed max-w-[280px]">
                Engineering backend systems that are <span className="text-white font-medium">decoupled</span>,
                high-concurrency, and built for production scale.
              </p>
            </div>

            <div className="flex flex-row items-center gap-4 w-full md:w-auto h-64 md:h-80 flex-1">
              <SystemArchitectureViz />
            </div>
          </motion.div>

          {/* Card 3 — Uses */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-1 card-glass rounded-2xl p-6 group"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wrench size={18} className="text-accent" />
              <h3 className="text-sm font-semibold text-white">My Setup</h3>
            </div>
            <p className="text-sm text-secondary mb-4 leading-relaxed">
              MacBook Pro M3 · IntelliJ IDEA · VS Code · Docker · Kubernetes
            </p>
            <Link
              href="/uses"
              id="bento-uses-link"
              className="inline-flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors group-hover:gap-2.5"
            >
              View full stack
              <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          {/* Card 4 — Stats */}
          <motion.div
            custom={3}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="md:col-span-1 card-glass rounded-2xl p-6"
          >
            <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
              By The Numbers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: `${projectCount}+`, label: "Projects Shipped" },
                { value: "1+", label: "Year Coding" },
                { value: "100%", label: "Client Satisfaction" },
                { value: "40%", label: "Avg Perf Gain" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-gradient-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-secondary leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
