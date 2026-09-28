"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Sparkles,
  Cpu,
  GraduationCap,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code2,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  onOpenCopilot: () => void;
}

export function Hero({ onOpenCopilot }: HeroProps) {
  const [copiedContact, setCopiedContact] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(label);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  return (
    <section className="relative pt-6 pb-10 sm:pt-12 sm:pb-14 flex flex-col gap-6 sm:gap-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Monospace telemetry and education pill */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-wrap items-center gap-2 font-mono text-[11px]"
      >
        <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          {PROFILE_DATA.status}
        </span>
        <span className="text-zinc-400">•</span>
        <span className="flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300 font-medium">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
          {PROFILE_DATA.education}
        </span>
      </motion.div>

      {/* Main Typographic Manifesto */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-3 max-w-4xl"
      >
        <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-semibold uppercase tracking-widest">
          {PROFILE_DATA.name} // {PROFILE_DATA.title}
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
          Building scalable AI systems & high-performance applications.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-3xl">
          {PROFILE_DATA.bio}
        </p>

        {/* Core Focus Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          <span className="text-zinc-500 text-[11px] uppercase tracking-wider">CORE FOCUS:</span>
          {PROFILE_DATA.coreFocus.map((focus) => (
            <Badge key={focus} variant="subtle" className="text-[11px] font-medium py-1">
              {focus}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* Contact & Profiles Quick Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap items-center gap-2.5 p-3 rounded-xl bg-zinc-100/80 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs font-mono"
      >
        <span className="text-zinc-500 text-[11px] uppercase tracking-wider px-1">CONTACT & LINKS:</span>

        {/* Email */}
        <a
          href={`mailto:${PROFILE_DATA.contact.email}`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-500" />
          <span>{PROFILE_DATA.contact.email}</span>
        </a>

        {/* Phone */}
        <a
          href={`tel:${PROFILE_DATA.contact.phone.replace(/\s+/g, "")}`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-500" />
          <span>{PROFILE_DATA.contact.phone}</span>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Slash-495"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors font-semibold"
        >
          <Github className="w-3.5 h-3.5" />
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* LinkedIn Placeholder */}
        <a
          href="https://linkedin.com/in/#"
          target="_blank"
          rel="noreferrer"
          title="LinkedIn Profile (Placeholder)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
        >
          <Linkedin className="w-3.5 h-3.5 text-blue-500" />
          <span>LinkedIn</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>

        {/* LeetCode Placeholder */}
        <a
          href="https://leetcode.com/#"
          target="_blank"
          rel="noreferrer"
          title="LeetCode Profile (Placeholder)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/60 transition-colors"
        >
          <Code2 className="w-3.5 h-3.5 text-amber-500" />
          <span>LeetCode</span>
          <ExternalLink className="w-3 h-3 opacity-60" />
        </a>
      </motion.div>

      {/* System Telemetry & Benchmark Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-200/90 dark:border-zinc-800/90 backdrop-blur-xs font-mono"
      >
        {PROFILE_DATA.stats.map((stat, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider">
              {stat.label}
            </span>
            <span className="text-lg sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
              {stat.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Call to Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3 font-mono text-xs"
      >
        <Button
          size="md"
          variant="default"
          onClick={() => {
            const el = document.getElementById("work");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="gap-2"
        >
          Explore Projects & Demos <ArrowDown className="w-3.5 h-3.5" />
        </Button>

        <Button
          size="md"
          variant="outline"
          onClick={onOpenCopilot}
          className="gap-2 border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 text-zinc-800 dark:text-zinc-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          Ask Arush&apos;s Copilot
        </Button>

        <Button
          size="md"
          variant="ghost"
          onClick={() => {
            const el = document.getElementById("specs");
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className="gap-1.5 text-zinc-600 dark:text-zinc-400"
        >
          <Cpu className="w-3.5 h-3.5" /> Systems & Academic Specs
        </Button>
      </motion.div>
    </section>
  );
}
