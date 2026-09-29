"use client";

import * as React from "react";
import { Sparkles, FileText, CheckCircle2, RefreshCw, Briefcase, Target, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface OptimizationItem {
  id: string;
  section: string;
  originalText: string;
  enhancedText: string;
  scoreBefore: number;
  scoreAfter: number;
  addedKeywords: string[];
}

export function VeloraDemo() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [atsScore, setAtsScore] = React.useState(68);

  const optimizationItems: OptimizationItem[] = [
    {
      id: "v-1",
      section: "Work Experience • Full Stack Role",
      originalText: "Built frontend web components using Next.js and styled them with Tailwind CSS. Handled state management with React hooks.",
      enhancedText: "Architected high-throughput responsive web interfaces in Next.js 14 and Tailwind CSS, reducing layout shifts and cutting client hydration latency by 32% across 10K+ monthly sessions.",
      scoreBefore: 68,
      scoreAfter: 94,
      addedKeywords: ["Next.js 14", "Hydration Latency", "Client State", "10K+ Sessions"],
    },
    {
      id: "v-2",
      section: "Projects • Real-time Collaboration",
      originalText: "Made an audio calling feature using WebRTC and connected it with Node.js backend APIs.",
      enhancedText: "Engineered sub-50ms peer-to-peer real-time audio streaming pipeline using WebRTC mesh protocols and Node.js REST reconciliation, validated with zero packet drop.",
      scoreBefore: 71,
      scoreAfter: 96,
      addedKeywords: ["WebRTC Mesh", "Sub-50ms Latency", "REST Reconciliation", "Zero Packet Drop"],
    },
  ];

  const currentItem = optimizationItems[selectedItemIndex];

  const handleRunOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setAtsScore(currentItem.scoreAfter);
      setIsOptimizing(false);
    }, 450);
  };

  const handleSwitchItem = (idx: number) => {
    setSelectedItemIndex(idx);
    setAtsScore(optimizationItems[idx].scoreBefore);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            VELORA: AI RESUME BUILDER & ATS OPTIMIZER WORKFLOW
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">ATS SCORE: {atsScore}%</Badge>
          <Badge variant="active">PARSEABLE LAYOUT</Badge>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Target Job Role</div>
          <div className="text-sm font-bold text-white mt-1">Full-Stack Engineer</div>
          <div className="text-[10px] text-slate-400 mt-0.5">ATS Scanner Profile</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Keyword Alignment</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{atsScore >= 90 ? "94.8%" : "68.2%"}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{atsScore >= 90 ? "Strong Match" : "Missing Key Metrics"}</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Layout Integrity</div>
          <div className="text-xl font-bold text-white mt-1">100%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Single-Column Standard</div>
        </div>
      </div>

      {/* Active Section Selector */}
      <div className="flex items-center gap-2 pt-1">
        <span className="text-slate-400 text-[11px]">Select Bullet to Optimize:</span>
        <div className="flex gap-2">
          {optimizationItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => handleSwitchItem(idx)}
              className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                selectedItemIndex === idx
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
              }`}
            >
              Scenario #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Original Draft */}
        <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <span className="text-slate-400 text-[11px] font-medium">Candidate Initial Draft</span>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              Score: {currentItem.scoreBefore}%
            </span>
          </div>
          <p className="text-xs text-slate-300 font-sans leading-relaxed">
            &ldquo;{currentItem.originalText}&rdquo;
          </p>
          <div className="text-[10px] text-slate-500">
            Issues: Lacks quantifiable business impact and industry standard action verbs.
          </div>
        </div>

        {/* AI Enhanced Suggestion */}
        <div className={`p-3 rounded-lg border transition-all flex flex-col justify-between gap-3 ${
          atsScore >= 90
            ? "bg-emerald-950/20 border-emerald-500/40"
            : "bg-slate-900/40 border-slate-800"
        }`}>
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-medium">
              <Sparkles className="w-3 h-3" />
              <span>Velora ATS Optimization</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Score: {currentItem.scoreAfter}%
            </span>
          </div>
          <p className="text-xs text-slate-200 font-sans leading-relaxed font-normal">
            &ldquo;{currentItem.enhancedText}&rdquo;
          </p>
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-[10px] text-slate-400">Injected Keywords:</span>
            {currentItem.addedKeywords.map((kw, i) => (
              <span key={i} className="text-[10px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-800">
        <span className="text-slate-400 text-[11px]">
          {atsScore >= 90 ? "ATS Optimization applied successfully." : "Ready to run contextual keyword enhancer."}
        </span>
        <Button
          size="sm"
          variant="glow"
          onClick={handleRunOptimization}
          disabled={isOptimizing || atsScore >= 90}
          className="text-emerald-400 border-emerald-500/40 hover:border-emerald-400"
        >
          {isOptimizing ? "Optimizing Bullet via LLM..." : atsScore >= 90 ? "Optimized ✓" : "Run ATS Optimization Pass"}
        </Button>
      </div>
    </div>
  );
}
