"use client";

import * as React from "react";
import { BookOpen, Search, ShieldCheck, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RetrievalResult {
  section: string;
  clause: string;
  denseRank: number;
  sparseRank: number;
  cohereScore: number;
  textSnippet: string;
}

export function HybridLegalRagDemo() {
  const [retrievalMode, setRetrievalMode] = React.useState<"hybrid" | "dense-only">("hybrid");
  const [isQuerying, setIsQuerying] = React.useState(false);

  const results: RetrievalResult[] = [
    {
      section: "Section 17(5)(h)",
      clause: "Apportionment of credit and blocked credits",
      denseRank: 4,
      sparseRank: 1,
      cohereScore: 0.964,
      textSnippet: "Goods lost, stolen, destroyed, written off or disposed of by way of gift or free samples...",
    },
    {
      section: "Section 16(2)(aa)",
      clause: "Eligibility and conditions for taking input tax credit",
      denseRank: 1,
      sparseRank: 3,
      cohereScore: 0.942,
      textSnippet: "Details of invoice or debit note has been furnished by the supplier in GSTR-1 and communicated to recipient...",
    },
    {
      section: "Rule 42 of CGST Rules",
      clause: "Manner of determination of input tax credit",
      denseRank: 6,
      sparseRank: 2,
      cohereScore: 0.891,
      textSnippet: "Determination of input tax credit in respect of inputs or input services being partly used for taxable...",
    },
  ];

  const handleSimulate = (mode: "hybrid" | "dense-only") => {
    setIsQuerying(true);
    setRetrievalMode(mode);
    setTimeout(() => {
      setIsQuerying(false);
    }, 350);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            DUAL-STREAM RETRIEVAL: FAISS (DENSE) + BM25 (SPARSE) + COHERE
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">PRECISION@4: 94.2%</Badge>
          <Badge variant="active">HALLUCINATION: 2.1% (from 36.8%)</Badge>
        </div>
      </div>

      {/* Query Bar */}
      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 flex flex-col gap-2">
        <div className="text-[10px] text-slate-500 uppercase">GST Statutory Query:</div>
        <div className="text-xs text-white font-sans bg-slate-950 p-2.5 rounded border border-slate-800">
          &ldquo;What are the statutory conditions and blocked credit clauses for Input Tax Credit on destroyed capital goods under the Indian GST Act?&rdquo;
        </div>
      </div>

      {/* Mode Comparison Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleSimulate("hybrid")}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
              retrievalMode === "hybrid"
                ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            Hybrid Dual-Stream + Cohere (Our Architecture)
          </button>
          <button
            onClick={() => handleSimulate("dense-only")}
            className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
              retrievalMode === "dense-only"
                ? "bg-amber-950/70 border-amber-500/80 text-amber-300 font-semibold"
                : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            Baseline Naive Dense Vector Only
          </button>
        </div>

        <div className="text-[11px] text-slate-400">
          {retrievalMode === "hybrid" ? (
            <span className="text-emerald-400 font-semibold">2.1% Hallucinations • Exact statutory match</span>
          ) : (
            <span className="text-amber-400 font-semibold">36.8% Hallucinations • Misses exact sub-clauses</span>
          )}
        </div>
      </div>

      {/* Retrieved Legal Clauses */}
      <div className="space-y-2 pt-1">
        <span className="text-slate-400 text-[11px]">Ranked Legal Clauses:</span>
        {results.map((res, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border transition-all ${
              retrievalMode === "hybrid"
                ? "bg-slate-900/80 border-slate-800 hover:border-slate-700"
                : idx === 0
                ? "bg-amber-950/20 border-amber-500/30"
                : "bg-slate-900/40 border-slate-800 opacity-60"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{res.section}</span>
                <span className="text-slate-500">•</span>
                <span className="text-[11px] text-emerald-400 font-medium">{res.clause}</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-slate-400">
                <span>FAISS Rank: #{res.denseRank}</span>
                <span>BM25 Rank: #{res.sparseRank}</span>
                <span className="text-emerald-400 font-bold">
                  Cohere Score: {(res.cohereScore * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <p className="text-[11px] text-slate-300 font-sans italic bg-slate-950/60 p-2 rounded border border-slate-900">
              &ldquo;{res.textSnippet}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
