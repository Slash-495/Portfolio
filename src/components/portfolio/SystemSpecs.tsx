"use client";

import * as React from "react";

export function SystemSpecs() {
  const coreTenets = [
    {
      num: "01",
      title: "Deterministic Validation Gates Over Uncontrolled Loops",
      description:
        "Multi-agent systems must separate generative hypothesis discovery from operational validation. Hard operational constraints, time windows, and safety rules belong in deterministic code validators, not stochastic LLM prompts.",
      metric: "Constraint Enforcement",
    },
    {
      num: "02",
      title: "Database-Level Aggregation & Dimensional Modeling",
      description:
        "Pushing analytical aggregations, NTILE quintile scoring, and time-series cohort logic directly into PostgreSQL views and dimensional marts. Eliminates client-side memory compute lag and preserves frontend snappiness.",
      metric: "In-Database Compute",
    },
    {
      num: "03",
      title: "Dense-Sparse Hybrid Fusion for High-Stakes Grounding",
      description:
        "Pairing dense vector semantic retrieval (FAISS) with sparse statutory keyword matching (BM25) and cross-encoder reranking. Prevents semantic vector drift on exact section numbers, statutory clauses, and alphanumeric IDs.",
      metric: "Grounding Veracity",
    },
    {
      num: "04",
      title: "Subgroup Disaggregation Before Wide Rollouts",
      description:
        "Always disaggregate experimentation telemetry across device and traffic cohorts, and monitor novelty decay across multi-week evaluation horizons to avoid Simpson's Paradox before approving feature rollouts.",
      metric: "Simpson's Paradox Guard",
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
