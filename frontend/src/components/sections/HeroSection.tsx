"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { SITE_CONFIG } from "@/lib/constants";
import { usePortfolio } from "@/providers/PortfolioProvider";

const focusReveal = {
  hidden: { opacity: 0, y: 15, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  }),
};

export default function HeroSection() {
  const { data } = usePortfolio();

  const heroBadge = data?.config?.HERO_BADGE || "Available for new projects";
  const heroTitle = data?.config?.HERO_TITLE || "Code that feels designed.";
  const heroName = data?.config?.NAME || SITE_CONFIG.name;
  const heroRole = data?.config?.ROLE || SITE_CONFIG.role;
  const emailVal = data?.config?.EMAIL || SITE_CONFIG.email;

  const dynamicSocials = [
    { icon: FaGithub, href: data?.config?.GITHUB_URL || SITE_CONFIG.github, label: "GitHub" },
    { icon: FaLinkedin, href: data?.config?.LINKEDIN_URL || SITE_CONFIG.linkedin, label: "LinkedIn" },
    { icon: FaMedium, href: data?.config?.MEDIUM_URL || SITE_CONFIG.medium, label: "Medium" },
    { icon: SiLeetcode, href: data?.config?.LEETCODE_URL || SITE_CONFIG.leetcode, label: "LeetCode" },
    { icon: SiCodechef, href: data?.config?.CODECHEF_URL || SITE_CONFIG.codechef, label: "CodeChef" },
    { icon: Mail, href: `mailto:${emailVal}`, label: "Email" },
  ];

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-32 pb-24 overflow-hidden">

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Status Badge */}
        <motion.div
          custom={0}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[11px] font-bold text-emerald-400 mb-10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          {heroBadge}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          custom={1}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] mb-8"
        >
          {heroTitle.split(" ").map((word, i) => (
            <span key={i} className={word.toLowerCase().includes("designed") ? "text-gradient-accent" : ""}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="text-secondary text-lg md:text-2xl max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
        >
          I&apos;m{" "}
          <span className="text-white">{heroName}</span> — a{" "}
          <span className="text-white font-semibold">{heroRole}</span> crafting
          high-performance web apps with Java + Spring Boot, Golang, Node.js, and Express.js.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/projects"
            id="hero-view-work-btn"
            className="group flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-white font-semibold transition-all duration-300 hover:-translate-y-1"
          >
            View Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href={`mailto:${emailVal}`}
            id="hero-contact-btn"
            className="flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold transition-all duration-300 hover:-translate-y-1"
          >
            <Mail size={18} />
            Connect
          </a>
        </motion.div>

        {/* Social Links — Dynamic */}
        <motion.div
          custom={4}
          variants={focusReveal}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-5"
        >
          {dynamicSocials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-2xl text-muted hover:text-white bg-white/5 border border-white/5 hover:border-accent/20 transition-all duration-300 hover:scale-110"
            >
              <Icon size={20} />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Dotted Path Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="relative flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-accent"
          />
          <div className="w-[1px] h-12 border-l border-dashed border-accent/30" />
        </div>
      </motion.div> */}
    </section>
  );
}
