"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { formatDateShort } from "@/lib/utils";
import { usePortfolio } from "@/providers/PortfolioProvider";

export default function ExperienceTimeline() {
  const { data, loading } = usePortfolio();
  const experiences = data?.experience || [];

  return (
    <section className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
            Career
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Experience
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-[7.5rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent/30 via-border to-transparent" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative flex gap-6 md:gap-8 pl-12 md:pl-0"
              >
                {/* Dot */}
                <div className="absolute left-[13px] md:left-[7.2rem] top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-background z-10" />

                {/* Date column (desktop) */}
                <div className="hidden md:flex md:w-28 flex-shrink-0 justify-end pt-1">
                  <span className="text-xs text-muted font-mono">
                    {formatDateShort(exp.startDate)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="card-glass rounded-2xl p-5 hover:border-white/10 transition-all duration-300">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-base">{exp.role}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                          {exp.companyUrl ? (
                            <a
                              href={exp.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent-hover text-sm flex items-center gap-1 transition-colors"
                              id={`exp-company-${exp.id}`}
                            >
                              {exp.company}
                              <ExternalLink size={11} />
                            </a>
                          ) : (
                            <span className="text-secondary text-sm">{exp.company}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {exp.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold">
                            Current
                          </span>
                        )}
                        <span className="text-xs text-muted font-mono md:hidden">
                          {formatDateShort(exp.startDate)} —{" "}
                          {exp.isCurrent ? "Present" : exp.endDate ? formatDateShort(exp.endDate) : ""}
                        </span>
                      </div>
                    </div>

                    {/* Date range (desktop) */}
                    <p className="hidden md:block text-xs text-muted mb-3 font-mono">
                      {formatDateShort(exp.startDate)} —{" "}
                      {exp.isCurrent ? "Present" : exp.endDate ? formatDateShort(exp.endDate) : ""}
                    </p>

                    {/* Description */}
                    <p className="text-secondary text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="flex flex-col gap-1.5">
                      {(exp.highlights || []).map((highlight: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-secondary"
                        >
                          <span className="text-accent mt-[3px] flex-shrink-0">▹</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
