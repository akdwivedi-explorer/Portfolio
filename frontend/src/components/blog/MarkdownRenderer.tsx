"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className }: Props) {
  return (
    <div className={cn("prose prose-invert prose-sm md:prose-base max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-4xl md:text-5xl font-black mt-20 mb-8 text-white tracking-tighter leading-tight" {...props} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-2xl md:text-3xl font-black mt-16 mb-6 text-white tracking-tight border-b border-white/5 pb-4 flex items-center gap-3 before:content-[''] before:w-1 before:h-6 before:bg-accent before:rounded-full before:inline-block" {...props} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-xl md:text-2xl font-bold mt-12 mb-4 text-white tracking-tight" {...props} />
          ),
          p: ({ ...props }) => (
            <p className="text-secondary/90 leading-[1.8] mb-8 text-lg font-medium" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="list-disc list-outside mb-8 space-y-3 text-secondary/90 ml-6 text-lg" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="list-decimal list-outside mb-8 space-y-3 text-secondary/90 ml-6 text-lg" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="pl-2" {...props} />
          ),
          code: ({ inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            return !inline ? (
              <div className="relative group/code my-10">
                <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover/code:opacity-30 transition-opacity duration-500" />
                <pre className="relative p-6 rounded-2xl bg-surface/80 backdrop-blur-md border border-white/10 overflow-x-auto text-[13px] leading-relaxed shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                    <span className="text-[10px] font-black text-muted uppercase tracking-[0.2em]">{match ? match[1] : 'code'}</span>
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
                    </div>
                  </div>
                  <code className={cn(className, "block")} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-sm font-bold font-mono border border-accent/20" {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-accent bg-surface/50 backdrop-blur-sm px-8 py-6 italic rounded-r-2xl mb-10 text-secondary leading-relaxed border-y border-r border-white/5" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-10 rounded-2xl border border-white/5 bg-surface/30 px-2">
              <table className="w-full text-left border-collapse my-4" {...props} />
            </div>
          ),
          th: ({ ...props }) => (
            <th className="px-6 py-4 border-b border-white/10 text-[11px] font-black text-accent uppercase tracking-[0.25em]" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-6 py-4 border-b border-white/5 text-sm md:text-base text-secondary/90 leading-relaxed font-medium" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
