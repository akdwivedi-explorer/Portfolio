"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import TagFilter from "@/components/ui/TagFilter";
import { usePortfolio } from "@/providers/PortfolioProvider";

const STATUS_COLORS: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-accent/10 text-accent border-accent/20",
  planned: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function CaseStudies() {
  const { data, loading } = usePortfolio();
  const projects = data?.projects || [];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p: any) => p.tags?.forEach((t: string) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project: any) => {
      // AND Logic: Must contain ALL selected tags
      return selectedTags.every(tag => project.tags?.includes(tag));
    });
  }, [selectedTags, projects]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] mb-3">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Case Studies
            </h2>
          </div>
          
          <TagFilter 
            tags={allTags.slice(0, 8)} 
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            onClear={() => setSelectedTags([])}
            className="md:justify-end"
          />
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-6 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
              <div className="group relative card-glass rounded-2xl p-6 md:p-8 hover:border-white/10 transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-start gap-6">
                  {/* Left: Content */}
                  <div className="flex-1">
                    {/* Tags row */}
                    <div className="flex items-center flex-wrap gap-2 mb-4">
                      <span
                        className={cn(
                          "text-[10px] font-semibold px-2.5 py-1 rounded-full border",
                          STATUS_COLORS[project.status]
                        )}
                      >
                        {project.status === "in-progress" ? "In Progress" : 
                          project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-secondary text-sm leading-relaxed mb-5 max-w-lg">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 5).map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 5 && (
                        <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-muted">
                          +{project.tags.length - 5} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`project-live-${project.slug}`}
                          className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={12} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`project-github-${project.slug}`}
                          className="flex items-center gap-1.5 text-xs text-secondary hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub size={12} />
                          Source
                        </a>
                      )}
                      <Link
                        href={`/projects`}
                        className="flex items-center gap-1 text-xs text-muted hover:text-secondary transition-colors ml-auto"
                      >
                        Case study
                        <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <p className="text-secondary mb-4">No projects match all selected filters.</p>
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-accent hover:text-accent-hover font-medium underline underline-offset-4"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Link */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/projects"
            id="case-studies-view-all-btn"
            className="group flex items-center gap-2 px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-sm text-secondary hover:text-white transition-all duration-300"
          >
            View all projects
            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
