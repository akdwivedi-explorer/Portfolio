"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onClear: () => void;
  className?: string;
}

export default function TagFilter({ 
  tags, 
  selectedTags, 
  onTagClick, 
  onClear,
  className 
}: TagFilterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <p className="text-xs font-bold text-muted uppercase tracking-widest mr-2">Filter:</p>
      
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 border",
              isSelected 
                ? "bg-accent border-accent text-white shadow-glow-sm scale-105" 
                : "bg-surface border-white/5 text-secondary hover:text-white hover:border-white/20"
            )}
          >
            {tag}
          </button>
        );
      })}

      {selectedTags.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={onClear}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted hover:text-white transition-all ml-2"
        >
          <X size={12} />
          Clear all
        </motion.button>
      )}
    </div>
  );
}
