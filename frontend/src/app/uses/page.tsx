"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { USES_ITEMS } from "@/data";
import { SITE_CONFIG } from "@/lib/constants";
import { ExternalLink, Wrench, Monitor, Smartphone, Layout, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_ICONS: Record<string, any> = {
  Hardware: Monitor,
  Software: Layout,
  Productivity: Smartphone,
  DevTools: Cpu,
};

const CATEGORY_THEMES: Record<string, { border: string; bg: string; text: string; shadow: string }> = {
  Hardware: { border: "border-orange-500/20", bg: "bg-orange-500/10", text: "text-orange-400", shadow: "shadow-orange-500/10" },
  Software: { border: "border-blue-500/20", bg: "bg-blue-500/10", text: "text-blue-400", shadow: "shadow-blue-500/10" },
  Productivity: { border: "border-success/20", bg: "bg-success/10", text: "text-success", shadow: "shadow-success/10" },
  DevTools: { border: "border-accent/20", bg: "bg-accent/10", text: "text-accent", shadow: "shadow-accent/10" },
};

export default function UsesPage() {
  const categories = Array.from(new Set(USES_ITEMS.map((item) => item.category)));

  return (
    <div className="pt-32 pb-24 px-6 relative min-h-screen">
      <div className="bg-noise" />
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4">
              Arsenal
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[0.9]">
              Premium <span className="text-gradient">Tools.</span>
            </h1>
            <p className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-medium">
              Software I use, gadgets I love, and the professional setup that fuels my high-performance development workflow.
            </p>
          </motion.div>
        </section>

        {/* Categories Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {categories.map((category, catIndex) => {
            const Icon = CATEGORY_ICONS[category] || Wrench;
            const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES.DevTools;
            const items = USES_ITEMS.filter((item) => item.category === category);

            return (
              <motion.section
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: catIndex * 0.1, duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-10 group">
                  <div className={cn("p-3 rounded-2xl border transition-all duration-300 group-hover:bg-accent group-hover:text-black", theme.bg, theme.border, theme.text)}>
                    <Icon size={24} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-white tracking-tight">
                    {category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className={cn("group relative card-glass rounded-3xl p-6 border transition-all duration-500 overflow-hidden shadow-glow-sm/5", theme.shadow, "border-white/5 hover:border-accent/30")}
                    >
                      {/* Subtle hover background */}
                      <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="relative flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
                          {item.name}
                        </h3>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-white/5 border border-white/5 text-muted hover:text-white hover:border-accent/20 transition-all"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                      <p className="relative text-sm text-secondary leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Closing Note */}
        <motion.section
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-32 py-16 px-8 rounded-[3.5rem] bg-accent/5 border border-accent/10 text-center relative overflow-hidden group shadow-glow-sm/5"
        >
          {/* Animated background decoration */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px] group-hover:bg-accent/20 transition-all duration-700" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-success/10 rounded-full blur-[100px] group-hover:bg-success/20 transition-all duration-700" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Want to see more?</h2>
            <p className="text-secondary text-lg max-w-lg mx-auto mb-10 font-medium">
              This list is always evolving. Spend your time optimizing your setup to stay productive. If you have any questions, feel free to reach out.
            </p>
            <Link
              href={`mailto:${SITE_CONFIG.email}`}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-accent hover:bg-accent-hover text-white font-bold transition-all shadow-glow hover:-translate-y-1"
            >
              Get in Touch
            </Link>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
