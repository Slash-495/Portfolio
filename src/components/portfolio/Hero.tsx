"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { PROFILE_DATA } from "@/lib/projects-data";

interface HeroProps {
  onOpenCopilot: () => void;
}

export function Hero({ onOpenCopilot }: HeroProps) {
  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24 flex flex-col gap-10 sm:gap-14">
      {/* Massive Typographic Headline */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-5xl flex flex-col gap-6"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-normal tracking-tight text-[#1A1A1A] leading-[1.06]">
          Building scalable AI systems, multi-agent workflows, and robust full-stack applications.
        </h1>
      </motion.div>

      {/* Editorial Subtext & Status Row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[#E5E5DF] pt-8"
      >
        <div className="max-w-xl flex flex-col gap-3">
          <div className="flex items-center gap-2.5 text-xs text-[#666662] tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#455A30] shrink-0" />
            <span>AI Systems, Analytics & Full-Stack Engineer</span>
            <span>•</span>
            <span>IIITDM Jabalpur</span>
          </div>
          <p className="text-base sm:text-lg text-[#666662] font-light leading-relaxed">
            Focused on deterministic multi-agent graphs, relational analytics warehouses, and thoughtful developer experiences.
          </p>
        </div>

        {/* Quiet Minimal Actions */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-sm text-[#1A1A1A]">
          <a
            href="#work"
            className="hover:text-[#455A30] transition-colors underline underline-offset-4 decoration-[#E5E5DF] hover:decoration-[#455A30]"
          >
            Explore selected work ↓
          </a>
          <a
            href="#resume"
            className="text-[#666662] hover:text-[#1A1A1A] transition-colors"
          >
            Resumes ↓
          </a>
          <button
            onClick={onOpenCopilot}
            className="text-[#666662] hover:text-[#455A30] transition-colors inline-flex items-center gap-1"
          >
            <span>Ask AI</span>
            <span className="text-xs text-[#455A30]">↗</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
}
