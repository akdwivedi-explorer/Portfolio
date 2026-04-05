"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BLOG_POSTS_FULL } from "@/data";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Calendar, Clock, ArrowLeft, Tag, Share2, Printer, ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import CommentSection from "@/components/blog/CommentSection";
import type { BlogPost } from "@/types";

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const foundPost = BLOG_POSTS_FULL.find(p => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
    } else {
      router.push('/blog');
    }
  }, [slug, router]);

  if (!post) return null;

  return (
    <div className="relative pt-24 pb-16 px-6 min-h-screen">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100] shadow-[0_0_10px_var(--accent)]"
        style={{ scaleX }}
      />


      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-secondary hover:text-white transition-all"
          >
            <div className="p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
              <ArrowLeft size={16} />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Back to Articles</span>
          </Link>
        </motion.div>

        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 text-[10px] text-muted font-black uppercase tracking-[0.25em] mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Calendar size={12} className="text-accent" />
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Clock size={12} className="text-accent" />
              {post.readTimeMinutes} min read
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-10 leading-[1] text-white"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2.5 mb-12"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface/50 border border-white/5 text-[10px] text-secondary font-black uppercase tracking-[0.2em] hover:border-accent/30 transition-colors cursor-default shadow-sm"
              >
                <Tag size={12} className="text-accent/60" />
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-6 py-8 border-y border-white/5"
          >
            <span className="text-[10px] text-muted font-black uppercase tracking-[0.3em]">Share Article</span>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 text-secondary hover:text-white transition-all shadow-sm hover:shadow-accent/5 group"
                aria-label="Copy link"
              >
                <Share2 size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button
                onClick={() => window.print()}
                className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 text-secondary hover:text-white transition-all shadow-sm hover:shadow-accent/5 group"
                aria-label="Print article"
              >
                <Printer size={18} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        </header>

        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative mb-8"
        >
          <div className="relative overflow-hidden max-h-[1200px]">
            <MarkdownRenderer content={post.content} />
            <div className="absolute bottom-0 left-0 right-0 h-80 bg-gradient-to-t from-background via-background/95 to-transparent z-10" />
          </div>
        </motion.article>

        {post.mediumUrl && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative px-8 py-16 md:px-12 md:py-20 rounded-[3.5rem] overflow-hidden mb-24 group isolate"
          >
            {/* Multi-layered Glass Effect */}
            <div className="absolute inset-0 bg-surface/40 backdrop-blur-3xl border border-white/10 shadow-2xl transition-colors group-hover:bg-surface/50" />
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />


            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter leading-tight">
                Deep dive <span className="text-gradient">on Medium.</span>
              </h3>
              <p className="text-secondary mb-12 max-w-2xl mx-auto leading-relaxed text-lg font-medium">
                I&apos;ve shared the full, in-depth technical case study on Medium—complete with architectural diagrams, production performance metrics, and detailed implementation patterns.
              </p>

              <a
                href={post.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-12 py-5 rounded-2xl bg-accent hover:bg-accent-hover text-white font-black transition-all shadow-[0_0_40px_rgba(255,92,0,0.2)] hover:shadow-[0_0_60px_rgba(255,92,0,0.35)] hover:-translate-y-1 active:scale-95 uppercase tracking-[0.2em] text-xs"
              >
                Continue Reading
                <ArrowRight size={20} className="stroke-[3]" />
              </a>

              <div className="mt-16 pt-12 border-t border-white/5 flex flex-wrap items-center justify-center gap-10 md:gap-20">
                <div className="text-center">
                  <p className="text-[11px] font-black text-accent uppercase tracking-[0.4em] mb-3">Popularity</p>
                  <p className="text-2xl font-black text-white">{post.claps || "0"}<span className="text-secondary text-sm font-bold ml-1">Claps</span></p>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/10" />
                <div className="text-center">
                  <p className="text-[11px] font-black text-accent uppercase tracking-[0.4em] mb-3">Reach</p>
                  <p className="text-2xl font-black text-white">{post.views || "0"}<span className="text-secondary text-sm font-bold ml-1">Views</span></p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Custom Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="relative z-20"
        >
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Community</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          <CommentSection blogPostSlug={slug} />
        </motion.div>

      </div>
    </div>
  );
}
