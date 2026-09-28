"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Terminal, ArrowDown, Sparkles, Activity, Shield, Cpu, Code2 } from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  onOpenCopilot: () => void;
}

export function Hero({ onOpenCopilot }: HeroProps) {
  return (
    <section className="relative pt-8 pb-12 sm:pt-14 sm:pb-16 flex flex-col gap-8">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Monospace telemetry pill */}
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
        <span className="text-zinc-500 dark:text-zinc-400">
          LOCATION: {PROFILE_DATA.location}
        </span>
        <span className="text-zinc-400 hidden sm:inline">•</span>
        <span className="text-zinc-500 dark:text-zinc-400 hidden sm:inline">
          PROTOCOL: HTTP/3 & WASM
        </span>
      </motion.div>

      {/* Main Typographic Manifesto */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col gap-4 max-w-4xl"
      >
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
          Engineering resilient distributed systems & tactile digital interfaces.
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-3xl">
          Operating at the rare convergence of systems engineering (Rust/WASM, lock-free ring buffers, edge proxies) and high-fidelity interaction design (120 FPS WebGL shaders, harmonic physics, and grounded AI copilot architectures).
        </p>
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
          Explore Case Studies <ArrowDown className="w-3.5 h-3.5" />
        </Button>

        <Button
          size="md"
          variant="outline"
          onClick={onOpenCopilot}
          className="gap-2 border-zinc-300 dark:border-zinc-700 hover:border-emerald-500 text-zinc-800 dark:text-zinc-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          Interactive RAG Copilot
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
          <Cpu className="w-3.5 h-3.5" /> System Specs
        </Button>
      </motion.div>
    </section>
  );
}
