"use client";

import * as React from "react";
import { Code2, Key, Lightbulb, ShieldCheck, Play, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function LeetLensDemo() {
  const [activeTab, setActiveTab] = React.useState<"review" | "trace" | "compare">("review");
  const [selectedComplexity, setSelectedComplexity] = React.useState("O(N) Optimal");

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            LEETLENS: AI LEETCODE MENTOR & EXECUTION VISUALIZER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">MANIFEST V3 EXTENSION</Badge>
          <Badge variant="active">100% BYOK ENCRYPTED STORAGE</Badge>
        </div>
      </div>

      {/* Feature Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab("review")}
          className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
            activeTab === "review"
              ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          Solution Review Engine
        </button>
        <button
          onClick={() => setActiveTab("trace")}
          className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
            activeTab === "trace"
              ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          Execution Trace Visualizer
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
            activeTab === "compare"
              ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          Intelligent Approach Comparison
        </button>
      </div>

      {activeTab === "review" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/70 border border-slate-800">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">Target LeetCode Problem:</div>
              <div className="text-white font-bold text-xs">#42. Trapping Rain Water (Hard)</div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BYOK: Zero Key Transmission</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col gap-2 font-sans text-xs">
            <div className="flex items-center justify-between font-mono text-[11px] pb-2 border-b border-slate-800">
              <span className="text-emerald-400 font-bold">SENIOR ENGINEER CODE REVIEW:</span>
              <span className="text-slate-400">Score: 96 / 100</span>
            </div>
            <div className="text-slate-300 space-y-1.5 font-mono text-xs">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Time Complexity:</strong> O(N) single-pass two-pointer approach correctly bounds iterations.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <span><strong>Space Complexity:</strong> O(1) auxiliary space achieved without auxiliary leftMax/rightMax arrays.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-400 font-bold">!</span>
                <span><strong>Edge Case Watch:</strong> Monotonically decreasing heights correctly yield zero trapped volume.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "trace" && (
        <div className="flex flex-col gap-3">
          <div className="p-3.5 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between font-mono text-[11px] pb-2 border-b border-slate-800">
              <span className="text-emerald-400 font-bold">STEP-BY-STEP RECURSION TRACE:</span>
              <span className="text-slate-400">Step 3 of 6</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono py-2">
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">leftPointer (i)</span>
                <div className="text-sm font-bold text-white">Index 2</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500">rightPointer (j)</span>
                <div className="text-sm font-bold text-white">Index 9</div>
              </div>
              <div className="p-2 rounded bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-emerald-400">Trapped Water</span>
                <div className="text-sm font-bold text-emerald-400">6 Units</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Visualizes algorithm state step-by-step so learners understand pointer movements and conditional branches intuitively.
            </p>
          </div>
        </div>
      )}

      {activeTab === "compare" && (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800">
              <span className="text-red-400 font-bold text-xs">Brute Force Approach</span>
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                Time: O(N²) • Space: O(1)
              </div>
              <p className="text-[11px] text-slate-400 font-sans mt-2">
                Recalculates maximum left and right boundaries for every individual bar. Times out on N &gt; 10⁴.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40">
              <span className="text-emerald-400 font-bold text-xs">Two-Pointer Optimal Approach</span>
              <div className="text-[11px] text-emerald-300 mt-1 font-mono">
                Time: O(N) • Space: O(1)
              </div>
              <p className="text-[11px] text-slate-300 font-sans mt-2">
                Maintains running maximums from both ends simultaneously. Passes 100% of test cases in 1ms.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
