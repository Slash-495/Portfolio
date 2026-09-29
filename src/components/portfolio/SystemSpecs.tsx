"use client";

import * as React from "react";

export function SystemSpecs() {
  const coreTenets = [
    {
      num: "01",
      title: "Deterministic Multi-Agent Graphs Over Stochastic Loops",
      description:
        "Replacing unbounded LLM generation with topologically sorted pipelines and deterministic rule validators. Enforces hard operational constraints and prevents runaway hallucination loops.",
      metric: "100% Pass Rate",
    },
    {
      num: "02",
      title: "Database-Level Aggregation & Dimensional Marts",
      description:
        "Pushing heavy mathematical scoring, NTILE quintiles, and time-series cohort logic directly into PostgreSQL views. Eliminates client-side compute lag and protects browser performance.",
      metric: "<45ms Query Latency",
    },
    {
      num: "03",
      title: "Hybrid Dense-Sparse Grounding with Cross-Encoders",
      description:
        "Pairing dense vector semantic retrieval (FAISS) with sparse exact keyword matching (BM25) fused via Reciprocal Rank Fusion, eliminating alphanumeric citation hallucinations in statutory corpora.",
      metric: "2.1% Hallucination Rate",
    },
    {
      num: "04",
      title: "Statistical Rigor & Subgroup Experimentation",
      description:
        "Validating traffic allocation via Sample Ratio Mismatch (SRM) tests and disaggregating metrics by device cohort to prevent Simpson's Paradox and catastrophic rollout failures.",
      metric: "$96,300+ Loss Saved",
    },
  ];

  return (
    <section id="specs" className="scroll-mt-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E5DF] pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
            Principles // 04
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
            Architectural Tenets
          </h2>
        </div>
        <p className="text-sm text-[#8C8C85] max-w-sm">
          Foundational engineering rules applied across every production pipeline and multi-agent system.
        </p>
      </div>

      {/* Clean Typographic List of Tenets */}
      <div className="flex flex-col">
        {coreTenets.map((tenet) => (
          <div
            key={tenet.num}
            className="border-b border-[#E5E5DF] py-7 sm:py-8 px-2 -mx-2 flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8 group hover:bg-black/[0.015] transition-colors"
          >
            {/* Number */}
            <div className="w-full md:w-24 shrink-0 text-xs font-mono text-[#8C8C85]">
              // {tenet.num}
            </div>

            {/* Title & Description */}
            <div className="flex-1 flex flex-col gap-1.5">
              <h3 className="text-lg sm:text-xl font-normal text-[#1A1A1A] group-hover:text-[#455A30] transition-colors tracking-tight">
                {tenet.title}
              </h3>
              <p className="text-sm text-[#666662] font-light leading-relaxed max-w-2xl">
                {tenet.description}
              </p>
            </div>

            {/* Benchmark Metric Tag */}
            <div className="shrink-0 self-start md:self-baseline pt-1 md:pt-0">
              <span className="text-xs text-[#455A30] font-mono tracking-wide">
                {tenet.metric}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
