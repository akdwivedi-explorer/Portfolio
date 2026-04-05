"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaReddit, FaMedium, FaEnvelope } from "react-icons/fa6";
import { SiLeetcode, SiCodechef } from "react-icons/si";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function Footer() {
  const { data, loading } = usePortfolio();
  const year = new Date().getFullYear();

  const SOCIAL_LINKS = [
    { icon: FaGithub, href: data?.config?.GITHUB_URL || SITE_CONFIG.github, label: "GitHub" },
    { icon: FaLinkedin, href: data?.config?.LINKEDIN_URL || SITE_CONFIG.linkedin, label: "LinkedIn" },
    { icon: FaMedium, href: data?.config?.MEDIUM_URL || SITE_CONFIG.medium, label: "Medium" },
    { icon: FaReddit, href: data?.config?.REDDIT_URL || SITE_CONFIG.reddit, label: "Reddit" },
    { icon: SiLeetcode, href: data?.config?.LEETCODE_URL || SITE_CONFIG.leetcode, label: "LeetCode" },
    { icon: SiCodechef, href: data?.config?.CODECHEF_URL || SITE_CONFIG.codechef, label: "CodeChef" },
    { icon: FaEnvelope, href: `mailto:${data?.config?.EMAIL || SITE_CONFIG.email}`, label: "Email" },
  ];

  const siteName = data?.config?.NAME || SITE_CONFIG.name;
  const siteRole = data?.config?.ROLE || SITE_CONFIG.role;

  return (
    <footer className="mt-auto relative">
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-base font-semibold tracking-tight text-white uppercase italic">
              {siteName}.
            </Link>
            <p className="mt-2 text-sm text-secondary max-w-[240px] leading-relaxed">
              {siteRole}.
            </p>
          </div>

          {/* Nav */}
          <div className="flex gap-12">
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Navigation</p>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-3">Connect</p>
              <ul className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <Icon size={13} />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-3 opacity-50">
          <p className="text-xs text-muted">
            © {year} {siteName}. Crafted with care.
          </p>
          <p className="text-xs text-muted">
            Built with{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              Next.js
            </a>{" "}
            &{" "}
            <a
              href="https://spring.io/projects/spring-boot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-white transition-colors"
            >
              Spring Boot
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
