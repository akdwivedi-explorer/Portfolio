"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function Navbar() {
  const { data, loading } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  const hireMeEmail = data?.config?.EMAIL || SITE_CONFIG.email;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pt-4",
          isScrolled ? "px-6" : "px-6"
        )}
      >
        <div 
          className={cn(
            "max-w-5xl w-full h-14 flex items-center justify-between px-5 rounded-2xl transition-all duration-500",
            isScrolled 
              ? "nav-blur border-white/5" 
              : "bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <AnimatedLogo />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm transition-all duration-200",
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-secondary hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Command Palette Trigger */}
            <button
              onClick={openCommandPalette}
              id="cmd-palette-trigger"
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-secondary hover:text-white hover:border-white/20 transition-all duration-200 text-xs"
            >
              <Command size={11} className="text-muted" />
              <span className="font-medium">Search</span>
            </button>

            {/* CTA */}
            <Link
              href={`mailto:${hireMeEmail}`}
              id="nav-hire-me-btn"
              className="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all duration-200"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-secondary hover:text-white transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden nav-blur border-b border-white/5"
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm transition-colors",
                    pathname === link.href
                      ? "text-white bg-white/10"
                      : "text-secondary hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-white/5 mt-2">
                <Link
                  href={`mailto:${hireMeEmail}`}
                  className="block w-full text-center px-4 py-3 rounded-lg bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all"
                >
                  Hire Me
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
