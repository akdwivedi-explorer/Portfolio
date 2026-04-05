"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ICON_MAP, TECH_COLORS } from "@/lib/tech-icons";
import { usePortfolio } from "@/providers/PortfolioProvider";

function MarqueeTrack({ skills = [], reverse = false }: { skills: any[], reverse?: boolean }) {
  const items = [...skills, ...skills, ...skills, ...skills];

  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        animate={{
          x: reverse ? [ "-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: 120, // Much slower: 120s
          ease: "linear",
          repeat: Infinity,
        }}
        className="flex gap-6 pr-6 flex-shrink-0 [animation-play-state:running] group-hover:[animation-play-state:paused]"
      >
        {items.map((tech, i) => {
          // Priority: backend sends 'icon' as direct key (e.g. 'springboot'),
          // static data uses 'iconUrl' like '/icons/springboot.svg'
          const directIcon = tech.icon || "";  // backend field
          const rawIconUrl = tech.iconUrl || ""; // static fallback field
          const iconKey = directIcon && !directIcon.includes("/") && !directIcon.includes(".")
            ? directIcon.toLowerCase()
            : rawIconUrl.startsWith("/icons/")
              ? rawIconUrl.replace("/icons/", "").replace(".svg", "")
              : tech.name.toLowerCase().replace(/\s+/g, "-");
          const Icon = ICON_MAP[iconKey];
          const colorClass = TECH_COLORS[iconKey] || "text-accent";
          
          return (
            <motion.div
              key={`${tech.id}-${i}`}
              whileHover={{ y: -5, scale: 1.05 }}
              className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-300 flex-shrink-0 group/item cursor-default relative overflow-hidden"
            >
              {/* Brand Glow Effect */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover/item:opacity-10 transition-opacity duration-300 blur-xl",
                colorClass.replace("text-", "bg-")
              )} />
              
              {Icon && <Icon className={cn("text-2xl transition-all duration-300 group-hover/item:scale-110", colorClass)} />}
              <span className="text-sm text-secondary group-hover/item:text-white transition-colors whitespace-nowrap font-bold relative z-10">
                {tech.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function TechStackMarquee() {
  const { data, loading } = usePortfolio();
  // Flatten all skills into a single list for marquee
  const allSkills = Object.values(data?.skills || {}).flat();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <p className="text-center text-[11px] font-bold text-muted uppercase tracking-[0.3em]">
          Technologies I Work With
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <MarqueeTrack skills={allSkills} />
        <MarqueeTrack skills={allSkills} reverse />
      </div>
    </section>
  );
}
