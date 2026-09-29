"use client";

import * as React from "react";
import { Cpu, Layers, Sparkles, ArrowRight, Zap, Target } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface RecItem {
  id: string;
  title: string;
  category: string;
  similarity: number;
  inTop10: boolean;
}

export function TwoTowerRecDemo() {
  const [selectedUserContext, setSelectedUserContext] = React.useState(0);
  const [isRetrieving, setIsRetrieving] = React.useState(false);

  const userContexts = [
    {
      label: "ML Systems Engineer",
      history: "Distributed Training, PyTorch, CUDA Kernels, HNSW Vector Indices",
    },
    {
      label: "Full-Stack AI Builder",
      history: "Next.js 14, WebRTC, Gemini API, Real-Time Voice Streaming",
    },
  ];

  const itemsMap: Record<number, RecItem[]> = {
    0: [
      {
        id: "paper-1",
        title: "InfoNCE Loss & Contrastive Negative Sampling at Scale",
        category: "Deep Retrieval",
        similarity: 0.948,
        inTop10: true,
      },
      {
        id: "paper-2",
        title: "FAISS IVF-PQ Vector Quantization on 1M+ Items",
        category: "Vector Search",
        similarity: 0.915,
        inTop10: true,
      },
      {
        id: "paper-3",
        title: "GPU Memory Management for SharedArrayBuffers",
        category: "Systems Concurrency",
        similarity: 0.884,
        inTop10: true,
      },
    ],
    1: [
      {
        id: "paper-4",
        title: "WebRTC AudioWorklet Chunking with Whisper Voice Models",
        category: "Real-time AI",
        similarity: 0.962,
        inTop10: true,
      },
      {
        id: "paper-5",
        title: "BYOK Client-Side Encrypted Storage in Chrome Extensions",
        category: "Security & DevTools",
        similarity: 0.927,
        inTop10: true,
      },
      {
        id: "paper-6",
        title: "Multi-Agent DAG Topological Schedulers in TypeScript",
        category: "Agent Orchestration",
        similarity: 0.893,
        inTop10: true,
      },
    ],
  };

  const handleContextChange = (idx: number) => {
    setIsRetrieving(true);
    setSelectedUserContext(idx);
    setTimeout(() => setIsRetrieving(false), 280);
  };

  const currentItems = itemsMap[selectedUserContext];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            TWO-TOWER DUAL-ENCODER + INFONCE RETRIEVAL
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">RECALL@10: +4.2% LIFT</Badge>
          <Badge variant="active">LATENCY: &lt;2.4ms (1M CATALOG)</Badge>
        </div>
      </div>

      {/* User Context Selector */}
      <div className="flex flex-col gap-2">
        <span className="text-slate-400 text-[11px]">Select Query Tower Input Context:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {userContexts.map((ctx, idx) => (
            <button
              key={idx}
              onClick={() => handleContextChange(idx)}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedUserContext === idx
                  ? "bg-slate-900 border-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400"
              }`}
            >
              <div className="font-bold text-white text-xs mb-0.5">{ctx.label}</div>
              <div className="text-[10px] text-slate-400 line-clamp-1">{ctx.history}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Two-Tower Projection Visualization */}
      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
        <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase">Query Tower</span>
          <div className="text-xs font-bold text-white mt-1">User Context (128-dim)</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">&Vert;u&Vert; Normalized</div>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
            DOT PRODUCT (u &bull; v) / &tau;
          </span>
          <ArrowRight className="w-4 h-4 text-emerald-400 my-1" />
          <span className="text-[10px] text-slate-400 font-mono">InfoNCE Contrastive Space</span>
        </div>

        <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase">Item Tower (FAISS)</span>
          <div className="text-xs font-bold text-white mt-1">1M+ Candidate Items</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">&lt;2.4ms ANN Index</div>
        </div>
      </div>

      {/* Top Retrieved Items */}
      <div className="space-y-2 pt-1">
        <span className="text-slate-400 text-[11px]">Top Candidate Items from FAISS Index:</span>
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 flex items-center justify-between gap-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{item.title}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                  {item.category}
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                FAISS IVF-PQ inner-product match score
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-bold text-emerald-400">
                {(item.similarity * 100).toFixed(1)}% Sim
              </span>
              <div className="text-[10px] text-slate-500">Top-10 Candidate</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
