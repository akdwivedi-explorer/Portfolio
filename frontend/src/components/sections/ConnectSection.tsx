"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaMedium, FaReddit } from "react-icons/fa6";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { SITE_CONFIG } from "@/lib/constants";
import ContactForm from "./ContactForm";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function ConnectSection() {
  const { data, loading } = usePortfolio();

  const emailVal = data?.config?.EMAIL || SITE_CONFIG.email;
  const socialLinks = [
    { icon: FaGithub, href: data?.config?.GITHUB_URL || SITE_CONFIG.github, label: "GitHub" },
    { icon: FaLinkedin, href: data?.config?.LINKEDIN_URL || SITE_CONFIG.linkedin, label: "LinkedIn" },
    { icon: FaMedium, href: data?.config?.MEDIUM_URL || SITE_CONFIG.medium, label: "Medium" },
    { icon: SiLeetcode, href: data?.config?.LEETCODE_URL || SITE_CONFIG.leetcode, label: "LeetCode" },
    { icon: SiCodechef, href: data?.config?.CODECHEF_URL || SITE_CONFIG.codechef, label: "CodeChef" },
  ];

  return (
    <section id="connect" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to <span className="text-gradient-accent">build</span> something amazing?
            </h2>
            <p className="text-secondary text-lg mb-10 leading-relaxed">
              Whether you have a question about my work, want to discuss a new project, or just want to say hi, feel free to reach out. I&apos;m always open to new opportunities and collaborations.
            </p>

            <div className="flex flex-col gap-6">
              <a
                href={`mailto:${emailVal}`}
                className="group flex items-center gap-4 text-white hover:text-accent transition-colors w-fit"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider font-semibold">Email Me</p>
                  <p className="text-base font-medium">{emailVal}</p>
                </div>
              </a>

              <div className="flex gap-4 mt-4">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="card-glass rounded-3xl p-8 border border-white/10 shadow-2xl">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
