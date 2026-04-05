"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { SKILLS } from "@/data";
import { Coffee, MapPin, Code2, Globe, Layers, Server, Box, GraduationCap, Shapes, Layout, Database, CheckCircle2, ArrowRight } from "lucide-react";

import { ICON_MAP, TECH_COLORS } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Workflow, Zap, Webhook, ShieldCheck } from "lucide-react";

const SystemArchitectureViz = dynamic(() => import("@/components/ui/SystemArchitectureViz"), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square rounded-2xl bg-surface animate-pulse" />
  ),
});

import { usePortfolio } from "@/providers/PortfolioProvider";

export default function AboutPage() {
  const { data, loading } = usePortfolio();

  const focusReveal = {
    hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
    }),
  };

  const aboutHeadline = data?.config?.ABOUT_HEADLINE || "Engineering that actually ships.";
  const aboutBio = data?.config?.ABOUT_BIO || `Hey, I'm ${SITE_CONFIG.name}, a ${SITE_CONFIG.role} based in ${SITE_CONFIG.location}. I specialize in building performant, scalable distributed systems using Java Spring Boot and Microservices architecture.`;

  return (
    <div className="relative pt-24 pb-16 px-6 overflow-hidden min-h-screen bg-transparent">
      
      <div className="max-w-4xl mx-auto">
        {/* Intro Section */}
        <section className="mb-16">
          <motion.div
            custom={0}
            variants={focusReveal}
            initial="hidden"
            animate="visible"
          >
            <p className="text-sm font-bold text-accent uppercase tracking-[0.3em] mb-4">
              About Me
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-[0.9]">
              {aboutHeadline.split(" ").map((word, i) => (
                <span key={i} className={word.toLowerCase().includes("ships.") ? "text-gradient" : ""}>
                   {word}{" "}
                </span>
              ))}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              custom={1}
              variants={focusReveal}
              initial="hidden"
              animate="visible"
              className="space-y-6 text-secondary leading-relaxed text-lg flex flex-col justify-center"
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {aboutBio.split(/(\*\*.*?\*\*)/).map((part: string, i: number) => 
                  part.startsWith("**") && part.endsWith("**") ? (
                    <span key={i} className="text-white font-bold drop-shadow-sm">
                      {part.slice(2, -2)}
                    </span>
                  ) : (
                    part
                  )
                )}
              </div>
            </motion.div>

            <motion.div
              custom={2}
              variants={focusReveal}
              initial="hidden"
              animate="visible"
              className="relative aspect-square lg:aspect-auto h-full min-h-[450px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group shadow-accent/5 backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-noise opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <SystemArchitectureViz />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Quick Facts Section */}
        <motion.section
          custom={3}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { label: "Based in", value: SITE_CONFIG.location, icon: MapPin },
            { label: "Role", value: "SDE (Backend)", icon: Code2 },
            { label: "Focus", value: "Distributed Systems", icon: Layers },
            { label: "Scale", value: "High Concurrency", icon: Zap },
          ].map((fact) => (
            <div
              key={fact.label}
              className="p-5 rounded-2xl bg-surface border border-white/5 flex flex-col gap-3 group hover:border-accent/20 transition-all duration-300"
            >
              <fact.icon size={18} className="text-secondary group-hover:text-accent transition-colors" />
              <div>
                <p className="text-[10px] text-muted uppercase font-bold tracking-[0.2em] mb-1">
                  {fact.label}
                </p>
                <p className="text-sm font-bold text-white tracking-tight">{fact.value}</p>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Tech Stack / Technical Arsenal Section */}
        <section className="mb-20">
          <motion.div
            custom={4}
            variants={focusReveal}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4">
                The Technical Arsenal
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                Full Stack <span className="text-gradient">Expertise.</span>
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-20">
            {Object.entries(data?.skills || {}).map(([category, catSkills]: [string, any], i) => {
              const icons: any = { Server, Layout, Database, Box, Zap, Code2, Layers, Globe, GraduationCap, Shapes, CheckCircle2, Workflow, Webhook, ShieldCheck };
              // Get icon from the first skill in category or fallback to Code2
              const CategoryIcon = icons[catSkills[0]?.icon] || Code2;
              
              return (
                <motion.div
                  key={category}
                  custom={5 + i}
                  variants={focusReveal}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                      <CategoryIcon size={16} className="text-accent" />
                    </div>
                    <h3 className="text-sm font-extrabold text-white uppercase tracking-[0.2em]">
                      {category}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {catSkills.map((skill: any) => {
                      const directIcon = skill.icon || "";
                      const rawIconUrl = skill.iconUrl || "";
                      const skillId = directIcon && !directIcon.includes("/") && !directIcon.includes(".")
                        ? directIcon.toLowerCase()
                        : rawIconUrl.startsWith("/icons/")
                          ? rawIconUrl.replace("/icons/", "").replace(".svg", "")
                          : skill.name.toLowerCase().replace(/\s+/g, "-");
                          
                      const Icon = ICON_MAP[skillId];
                      const colorClass = TECH_COLORS[skillId] || "text-accent";
                      
                      return (
                        <motion.div
                          key={skill.id}
                          whileHover={{ y: -4, scale: 1.05 }}
                          className="relative group/skill flex flex-col items-center justify-center p-4 rounded-xl bg-surface border border-white/5 hover:border-accent/30 transition-all duration-300 overflow-hidden text-center min-h-[90px]"
                        >
                          <div className={cn(
                            "absolute inset-0 opacity-0 group-hover/skill:opacity-10 transition-opacity duration-300 blur-xl",
                            colorClass.replace("text-", "bg-")
                          )} />
                          
                          {Icon && <Icon className={cn("text-2xl mb-2 transition-transform duration-300 group-hover/skill:scale-110", colorClass)} />}
                          <span className="text-[10px] font-bold text-secondary group-hover/skill:text-white uppercase tracking-wider transition-colors relative z-10">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Core Foundations & Methodology */}
        <section className="pb-20">
          <motion.div
            custom={9}
            variants={focusReveal}
            initial="hidden"
            animate="visible"
            className="p-10 rounded-[2.5rem] bg-surface border border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-noise opacity-10" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4">CS Foundations</p>
                <h3 className="text-2xl font-bold text-white mb-8">Algorithms &amp; Systems</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["dsa", "system-design", "oop", "os"].map((fundId) => {
                    const Icon = ICON_MAP[fundId];
                    const labels: Record<string, string> = {
                      "dsa": "DSA",
                      "system-design": "System Design",
                      "oop": "OOPs Mastery",
                      "os": "Operating Systems"
                    };
                    return (
                      <div key={fundId} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/20 transition-all group/item min-w-0">
                        {Icon && <Icon size={16} className={cn("flex-shrink-0 text-muted group-hover/item:text-accent transition-colors", TECH_COLORS[fundId])} />}
                        <span className="text-[11px] text-secondary font-bold group-hover/item:text-white transition-colors uppercase tracking-wider leading-tight">
                          {labels[fundId]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4">Methodology</p>
                <h3 className="text-2xl font-bold text-white mb-8">Delivery &amp; Standards</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: "Agile", icon: Workflow },
                    { name: "SCRUM", icon: Zap },
                    { name: "REST APIs", icon: Webhook },
                    { name: "Unit Testing", icon: ShieldCheck },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/20 transition-all group/item min-w-0">
                      <item.icon size={14} className="flex-shrink-0 text-accent group-hover:item:scale-110 transition-transform" />
                      <span className="text-[11px] text-secondary font-bold group-hover:item:text-white transition-colors uppercase tracking-wider leading-tight">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
