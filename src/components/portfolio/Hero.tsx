"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Github,
  Bot,
  ArrowRight,
  ExternalLink,
  GraduationCap,
  Layers,
  Code2,
} from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  onOpenCopilot: () => void;
}

export function Hero({ onOpenCopilot }: HeroProps) {
  return (
    <section className="relative pt-6 pb-12 sm:pt-14 sm:pb-16 flex flex-col gap-6 sm:gap-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Engineering Focus Pill: Focused strictly on capability */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center gap-2 font-mono text-xs"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-medium shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <span>Scalable AI Systems • Multi-Agent Workflows • Full-Stack Engineering</span>
        </div>
      </motion.div>

      {/* Main Typographic Manifesto */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4 max-w-4xl"
      >
        <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-widest flex items-center gap-2">
          <span>{PROFILE_DATA.name}</span>
          <span>//</span>
          <span>{PROFILE_DATA.title}</span>
        </div>

        {/* Exact Headline requested */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-[#0F172A] dark:text-[#F1F5F9] leading-[1.12]">
          Building scalable AI systems, multi-agent workflows, and robust full-stack applications.
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans max-w-3xl">
          {PROFILE_DATA.bio}
        </p>

        {/* Core Focus Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="text-slate-500 dark:text-slate-400 text-[11px] uppercase tracking-wider">
            CORE FOCUS:
          </span>
          {PROFILE_DATA.coreFocus.map((focus) => (
            <Badge
              key={focus}
              variant="subtle"
              className="text-[11px] font-medium py-1 px-3 bg-white dark:bg-[#0F172A] border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300"
            >
              {focus}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Benchmark telemetry card banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/80 dark:bg-[#0F172A]/70 border border-[#E2E8F0] dark:border-[#1E293B] backdrop-blur-xs font-mono shadow-xs"
      >
        {PROFILE_DATA.stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-lg sm:text-2xl font-bold text-[#0F172A] dark:text-[#F1F5F9] mt-0.5">
              {stat.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons: Exactly 'Chat with my AI Copilot' and 'View GitHub' */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-wrap items-center gap-4 font-mono text-xs pt-1"
      >
        <Button
          size="md"
          variant="default"
          onClick={() => {
            const el = document.getElementById("ai-chat") || document.getElementById("copilot");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="gap-2 bg-[#0F172A] text-white hover:bg-slate-800 dark:bg-[#F1F5F9] dark:text-[#0F172A] dark:hover:bg-white shadow-md font-semibold px-5 py-2.5 h-11"
        >
          <Bot className="w-4 h-4 text-emerald-500" />
          <span>Chat with my AI Copilot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>

        <a
          href="https://github.com/Slash-495"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 h-11 rounded-md border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 hover:text-black dark:hover:text-white transition-all font-mono text-xs font-semibold shadow-xs"
        >
          <Github className="w-4 h-4" />
          <span>View GitHub</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-60" />
        </a>
      </motion.div>
    </section>
  );
}
