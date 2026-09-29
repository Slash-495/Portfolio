"use client";

import * as React from "react";
import { Train, ShieldCheck, Clock, ArrowRight, Play, CheckCircle2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface SplitRoute {
  id: string;
  junction: string;
  legA: string;
  legB: string;
  layoverMinutes: number;
  safetyPassed: boolean;
  score: number;
}

export function RailRouteDemo() {
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [selectedRouteIdx, setSelectedRouteIdx] = React.useState(0);
  const [latencyMs, setLatencyMs] = React.useState(1450);

  const candidateRoutes: SplitRoute[] = [
    {
      id: "opt-1",
      junction: "Kanpur Central (CNB)",
      legA: "Train 12424 (NDLS -> CNB) • Arr 21:05",
      legB: "Train 12560 (CNB -> BSB) • Dep 22:15",
      layoverMinutes: 70,
      safetyPassed: true,
      score: 98.4,
    },
    {
      id: "opt-2",
      junction: "Prayagraj Junction (PRYJ)",
      legA: "Train 12310 (NDLS -> PRYJ) • Arr 04:20",
      legB: "Train 15004 (PRYJ -> BSB) • Dep 05:40",
      layoverMinutes: 80,
      safetyPassed: true,
      score: 94.1,
    },
    {
      id: "opt-3",
      junction: "Lucknow Charbagh (LKO)",
      legA: "Train 12004 (NDLS -> LKO) • Arr 12:40",
      legB: "Train 14204 (LKO -> BSB) • Dep 13:00",
      layoverMinutes: 20, // Too short! Unsafe
      safetyPassed: false,
      score: 52.0,
    },
  ];

  const runTriadSimulation = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setLatencyMs(Math.floor(1380 + Math.random() * 120));
      setIsProcessing(false);
    }, 550);
  };

  const activeRoute = candidateRoutes[selectedRouteIdx];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Train className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            3-AGENT TRIAD: PLANNER → VERIFIER → RANKER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">LATENCY: {latencyMs}ms (down from 3.2s)</Badge>
          <Badge variant="active">PASS RATE: 100% VERIFIED</Badge>
        </div>
      </div>

      {/* Origin / Destination Selector */}
      <div className="p-3 rounded-lg bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs">
          <span className="text-slate-400">Route Query:</span>
          <span className="font-bold text-white">New Delhi (NDLS)</span>
          <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-bold text-white">Varanasi (BSB)</span>
          <span className="text-[10px] text-amber-400 font-medium px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
            Direct Tickets: Waitlisted (WL 84)
          </span>
        </div>

        <Button
          size="sm"
          variant="glow"
          onClick={runTriadSimulation}
          disabled={isProcessing}
          className="text-emerald-400 border-emerald-500/40 hover:border-emerald-400"
        >
          {isProcessing ? "Executing Agents..." : "Run Split Discovery"}
        </Button>
      </div>

      {/* 3-Agent Execution Pipeline Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Agent 1: Planner */}
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase">Agent 01</span>
              <span className="text-emerald-400 text-[10px] font-bold">GEMINI LLM</span>
            </div>
            <div className="font-bold text-white text-xs mb-1">Route Planner</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Explores station topological graphs. Identified 3 intermediate junction candidates.
            </p>
          </div>
          <div className="text-[10px] text-emerald-400 mt-2 font-mono">
            STATUS: 3 CANDIDATES GENERATED
          </div>
        </div>

        {/* Agent 2: Verifier */}
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase">Agent 02</span>
              <span className="text-cyan-400 text-[10px] font-bold">PYTHON ENGINE</span>
            </div>
            <div className="font-bold text-white text-xs mb-1">Schedule Verifier</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Enforces 45m &le; Layover &le; 180m safe transfer buffers. Filtered unsafe 20m sprint.
            </p>
          </div>
          <div className="text-[10px] text-cyan-400 mt-2 font-mono">
            STATUS: 2 ROUTES CLEARED, 1 REJECTED
          </div>
        </div>

        {/* Agent 3: Ranker */}
        <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] text-slate-500 uppercase">Agent 03</span>
              <span className="text-indigo-400 text-[10px] font-bold">PARETO SCORER</span>
            </div>
            <div className="font-bold text-white text-xs mb-1">Journey Ranker</div>
            <p className="text-[11px] text-slate-400 font-sans">
              Weights total duration, layover convenience, fare, and platform transit stress.
            </p>
          </div>
          <div className="text-[10px] text-indigo-400 mt-2 font-mono">
            STATUS: OPTIMAL PARETO SORTED
          </div>
        </div>
      </div>

      {/* Discovered Candidate Split Routes */}
      <div className="flex flex-col gap-2 pt-1">
        <span className="text-slate-400 text-[11px]">Evaluated Split Route Candidates:</span>
        <div className="space-y-2">
          {candidateRoutes.map((route, idx) => (
            <div
              key={route.id}
              onClick={() => setSelectedRouteIdx(idx)}
              className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                selectedRouteIdx === idx
                  ? "bg-slate-900 border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30"
                  : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{route.junction}</span>
                  {route.safetyPassed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> SAFE ({route.layoverMinutes}m Layover)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] text-red-400 font-bold px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30">
                      <AlertTriangle className="w-3 h-3" /> REJECTED ({route.layoverMinutes}m unsafe)
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  <span>Leg 1: {route.legA}</span> &rarr; <span>Leg 2: {route.legB}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase">Rank Score</div>
                  <div className={`font-bold ${route.safetyPassed ? "text-emerald-400" : "text-red-400"}`}>
                    {route.score} / 100
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
