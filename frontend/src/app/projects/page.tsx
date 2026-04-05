"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data";
import { useState, useMemo } from "react";
import { ExternalLink, ArrowUpRight, Search, X } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TagFilter from "@/components/ui/TagFilter";

const ALL_TAGS = Array.from(
  new Set(PROJECTS.flatMap((p) => p.tags))
).sort();

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-accent/10 text-accent border-accent/20",
  planned: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => project.tags.includes(tag));
        
      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="pt-32 pb-24 px-6 relative bg-transparent">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <section className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4"
          >
            My Work
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[0.9]"
          >
            Engineering that <span className="text-gradient">builds value.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
          >
            A curated list of projects that demonstrate technical craftsmanship, scalable architecture, and a focus on user experience.
          </motion.p>
        </section>

        {/* Filters and Search Bar */}
        <section className="mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-white/5 text-sm text-white focus:border-accent/40 focus:bg-white/5 outline-none transition-all shadow-glow-sm/5"
            />
          </div>

          <TagFilter 
            tags={ALL_TAGS} 
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            onClear={() => setSelectedTags([])}
            className="w-full md:justify-end"
          />
        </section>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="group card-glass h-full rounded-2xl p-6 flex flex-col border border-white/5 hover:border-white/10 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2.5 py-1 rounded-full border",
                        STATUS_COLORS[project.status]
                      )}
                    >
                      {project.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-muted font-mono">{project.year}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-secondary mb-6 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors"
                      >
                        <ExternalLink size={12} />
                        Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-secondary hover:text-white transition-colors"
                      >
                        <FaGithub size={12} />
                        Repo
                      </a>
                    )}
                    <Link
                      href={`/projects`}
                      className="ml-auto text-xs text-muted hover:text-white transition-colors flex items-center gap-1"
                    >
                      Case Study
                      <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-secondary text-sm font-medium mb-4">No projects match all selected filters.</p>
              <button
                onClick={() => { setSearch(""); setSelectedTags([]); }}
                className="text-accent hover:text-accent-hover font-bold underline underline-offset-4"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
