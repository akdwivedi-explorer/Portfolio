"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  FolderOpen,
  BookOpen,
  Wrench,
  Mail,
  X,
  Search,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

const COMMANDS = [
  {
    group: "Navigation",
    items: [
      { id: "home", label: "Go to Home", href: "/", icon: Home },
      { id: "about", label: "Go to About", href: "/about", icon: User },
      { id: "projects", label: "Go to Projects", href: "/projects", icon: FolderOpen },
      { id: "blog", label: "Go to Blog", href: "/blog", icon: BookOpen },
      { id: "uses", label: "Go to Uses", href: "/uses", icon: Wrench },
    ],
  },
  {
    group: "Connect",
    items: [
      { id: "email", label: "Send Email", href: `mailto:${SITE_CONFIG.email}`, icon: Mail, external: true },
      { id: "github", label: "View GitHub", href: SITE_CONFIG.github, icon: FaGithub, external: true },
      { id: "linkedin", label: "View LinkedIn", href: SITE_CONFIG.linkedin, icon: FaLinkedin, external: true },
    ],
  },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    // Keyboard shortcut
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") setOpen(false);
    };
    // Custom event from Navbar
    const handleCustomEvent = () => setOpen(true);

    window.addEventListener("keydown", handleKey);
    window.addEventListener("open-command-palette", handleCustomEvent);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("open-command-palette", handleCustomEvent);
    };
  }, [toggle]);

  const runCommand = (item: { href: string; external?: boolean }) => {
    setOpen(false);
    setQuery("");
    if (item.external) {
      window.open(item.href, "_blank", "noopener noreferrer");
    } else {
      router.push(item.href);
    }
  };

  const filteredCommands = COMMANDS.map((group) => ({
    ...group,
    items: group.items.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((group) => group.items.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed left-1/2 top-1/4 -translate-x-1/2 z-[101] w-full max-w-md"
          >
            <Command
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: "#111111",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                <Search size={14} className="text-muted" />
                <Command.Input
                  value={query}
                  onValueChange={setQuery}
                  placeholder="Search commands, pages, or links..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-secondary outline-none"
                  autoFocus
                  id="command-palette-input"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded-md text-secondary hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>

              {/* List */}
              <Command.List className="max-h-72 overflow-y-auto py-2">
                <Command.Empty className="text-center text-sm text-secondary py-8">
                  No results found.
                </Command.Empty>

                {filteredCommands.map((group) => (
                  <Command.Group
                    key={group.group}
                    heading={group.group}
                    className="[&_[cmdk-group-heading]]:px-4 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest"
                  >
                    {group.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Command.Item
                          key={item.id}
                          value={item.label}
                          onSelect={() => runCommand(item)}
                          className="flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg text-sm text-secondary hover:text-white cursor-pointer transition-colors data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                          id={`cmd-${item.id}`}
                        >
                          <Icon size={15} className="flex-shrink-0" />
                          {item.label}
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}
              </Command.List>

              {/* Footer hint */}
              <div className="px-4 py-2.5 border-t border-white/5 flex gap-4 text-xs text-muted">
                <span><kbd className="font-mono">↑↓</kbd> navigate</span>
                <span><kbd className="font-mono">↵</kbd> select</span>
                <span><kbd className="font-mono">esc</kbd> close</span>
              </div>
            </Command>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
