"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";
import { cn, formatDate } from "@/lib/utils";
import TagFilter from "@/components/ui/TagFilter";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function BlogPage() {
  const { data, loading } = usePortfolio();
  const blogPosts = data?.blogPosts || [];
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const ALL_BLOG_TAGS = useMemo(() => {
    return Array.from(new Set(blogPosts.flatMap(p => p.tags || []))).sort();
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.summary.toLowerCase().includes(search.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => post.tags?.includes(tag));
        
      return matchesSearch && matchesTags;
    });
  }, [search, selectedTags, blogPosts]);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="pt-32 pb-24 px-6 relative bg-transparent">
      <div className="max-w-4xl mx-auto">
        <section className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4"
          >
            Insights
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[0.9]"
          >
            Thoughts on <span className="text-gradient">engineering.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-medium"
          >
            Deep dives into Spring Boot, React, DevOps, and lessons learned from shipping production-grade software.
          </motion.p>
        </section>

        <section className="mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface border border-white/5 text-sm text-white focus:border-accent/40 focus:bg-white/5 outline-none transition-all shadow-glow-sm/5"
            />
          </div>

          <TagFilter 
            tags={ALL_BLOG_TAGS} 
            selectedTags={selectedTags}
            onTagClick={handleTagClick}
            onClear={() => setSelectedTags([])}
            className="w-full md:justify-end"
          />
        </section>

        <div className="flex flex-col gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block card-glass rounded-2xl p-6 md:p-8 border border-white/5 hover:border-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 text-[10px] text-muted font-bold uppercase tracking-widest mb-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-secondary" />
                          {formatDate(post.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} className="text-secondary" />
                          {post.readTimeMinutes} min read
                        </div>
                      </div>

                      <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-secondary text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                        {post.summary}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-white/5 text-[10px] text-muted transition-colors group-hover:text-secondary group-hover:border-white/20"
                          >
                            <Tag size={10} />
                            {tag}
                          </span>
                        ))}
                        <div className="ml-auto flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-widest group-hover:gap-2.5 transition-all">
                          {post.mediumUrl ? "Read on Portfolio" : "Read Post"}
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-secondary text-sm font-medium mb-4">No articles match all selected filters.</p>
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
