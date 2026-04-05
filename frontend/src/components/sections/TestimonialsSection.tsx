"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function TestimonialsSection() {
  const { data, loading } = usePortfolio();
  const testimonials = data?.testimonials || [];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
            Social Proof
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            What Clients Say
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="card-glass rounded-2xl p-6 flex flex-col gap-4 hover:border-white/10 transition-all duration-300"
            >
              {/* Quote icon */}
              <Quote size={20} className="text-accent/50 flex-shrink-0" />

              {/* Content */}
              <p className="text-secondary text-sm leading-relaxed flex-1 italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-purple-600 flex items-center justify-center flex-shrink-0 text-white text-sm font-semibold">
                  {testimonial.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.authorName}
                  </p>
                  <p className="text-xs text-secondary">{testimonial.authorRole}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
