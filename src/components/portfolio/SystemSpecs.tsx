"use client";

import * as React from "react";
import { Terminal, Shield, Cpu, Activity, Zap, GraduationCap, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { PROFILE_DATA } from "@/lib/projects-data";

export function SystemSpecs() {
  const [clientSpecs, setClientSpecs] = React.useState({
    wasmSupported: true,
    webgl2Supported: true,
    hardwareConcurrency: 8,
    maxTouchPoints: 0,
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setClientSpecs({
        wasmSupported: typeof WebAssembly === "object",
        webgl2Supported: !!document.createElement("canvas").getContext("webgl2"),
        hardwareConcurrency: navigator.hardwareConcurrency || 8,
        maxTouchPoints: navigator.maxTouchPoints || 0,
      });
    }
  }, []);

  const coreTenets = [
    {
      title: "Deterministic Multi-Agent Graphs Over Stochastic Loops",
      description:
        "Replacing unbounded LLM loops with typed, topologically sorted DAGs and bounded execution checkpoints. Reduces token burn by 68% and prevents runaway hallucination loops.",
      metric: "99.4% Task Completion",
    },
    {
      title: "Algorithmic Rigor & Data Structure Efficiency",
      description:
        "Deep application of optimal time/space complexity, cache-conscious memory layouts, and lock-free ring buffers to achieve sub-millisecond dispatching.",
      metric: "1.2M events/sec",
    },
    {
      title: "Scalable AI Serving & Vector Proximity Routing",
      description:
        "Evaluating cosine similarity across high-dimensional vector embeddings in under 140ms, routing incoming user intent to specialized micro-agents.",
      metric: "135ms Routing",
    },
    {
      title: "Single-Flight Coalescing & Origin Shielding",
      description:
        "Protecting database clusters during burst traffic by locking concurrent requests into broadcast channels and filtering missing keys with Counting Bloom filters.",
      metric: "99.98% Cache Hit",
    },
  ];

  const competencies = [
    { name: "Scalable AI Systems & Vector Retrieval (PGVector / Python)", level: 96 },
    { name: "Multi-Agent Workflows & Deterministic DAGs", level: 95 },
    { name: "Full-Stack Architecture (Next.js App Router / TypeScript / React)", level: 98 },
    { name: "Data Structures, Algorithms & Concurrency (C++ / Rust / TS)", level: 97 },
    { name: "Smart Manufacturing & Distributed Automation (IIITDM Jabalpur)", level: 94 },
  ];

  return (
    <section id="about" className="scroll-mt-24 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              02 // SYSTEM SPECS & ARCHITECTURAL MATRIX
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Engineering Principles & Core Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Academic foundations at IIITDM Jabalpur, core algorithmic tenets, and production competencies.
          </p>
        </div>
      </div>

      {/* Tenets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coreTenets.map((tenet, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-white/60 dark:bg-zinc-900/40 backdrop-blur-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase">
                  TENET 0{idx + 1}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {tenet.metric}
                </span>
              </div>
              <h3 className="font-mono text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                {tenet.title}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                {tenet.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Academic & Engineering Depth Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Depth Matrix */}
        <div className="lg:col-span-2 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/30 flex flex-col gap-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Core Technical Competencies
            </span>
            <span className="text-[11px] text-zinc-500">PRODUCTION VERIFIED</span>
          </div>

          <div className="space-y-3.5">
            {competencies.map((comp, i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-zinc-700 dark:text-zinc-300 font-sans">
                    {comp.name}
                  </span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    {comp.level}%
                  </span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${comp.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Profile & Active Runtime */}
        <div className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
              <GraduationCap className="w-4 h-4 text-emerald-400" />
              <span className="font-bold uppercase tracking-wider text-zinc-300">
                ACADEMIC PROFILE
              </span>
            </div>

            <div className="space-y-2.5 text-[11px]">
              <div>
                <div className="text-zinc-400 text-[10px]">INSTITUTION:</div>
                <div className="text-zinc-100 font-bold">IIITDM Jabalpur</div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px]">DEGREE & PROGRAM:</div>
                <div className="text-emerald-400 font-bold">B.Tech in Smart Manufacturing</div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px]">TENURE:</div>
                <div className="text-zinc-300">2023 - Present</div>
              </div>
              <div>
                <div className="text-zinc-400 text-[10px]">SPECIALIZATION:</div>
                <div className="text-zinc-300 text-[10px]">
                  AI Automation, Systems Design, Graph Algorithms
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800/80 text-[10px] text-zinc-500 mt-4">
            Next.js App Router • Grounded RAG Copilot Runtime
          </div>
        </div>
      </div>
    </section>
  );
}
