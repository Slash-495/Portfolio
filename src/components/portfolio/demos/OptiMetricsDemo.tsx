"use client";

import * as React from "react";
import { BarChart3, AlertCircle, ShieldCheck, Smartphone, Monitor } from "lucide-react";

export function OptiMetricsDemo() {
  const [viewMode, setViewMode] = React.useState<"aggregate" | "segmented" | "decay">("segmented");

  return (
    <div className="flex flex-col gap-5 p-5 rounded-xl border border-[#E5E5DF] bg-[#F9F9F6] text-[#1A1A1A]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E5E5DF] pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#455A30] font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Statistical A/B Experimentation Engine</span>
          </div>
          <h4 className="text-sm font-medium mt-0.5 text-[#1A1A1A]">
            Checkout Redesign Experiment (50,000 Users)
          </h4>
        </div>

        {/* View Selector */}
        <div className="flex items-center gap-1 bg-[#EFEFEA] p-1 rounded-lg text-xs font-mono">
          {[
            { id: "aggregate", label: "Naive View" },
            { id: "segmented", label: "Segment Breakdown" },
            { id: "decay", label: "Novelty Decay" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id as any)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                viewMode === mode.id
                  ? "bg-white text-[#1A1A1A] font-semibold shadow-xs"
                  : "text-[#666662] hover:text-[#1A1A1A]"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Content */}
      <div className="p-4 rounded-xl border border-[#E5E5DF] bg-white space-y-4">
        {viewMode === "aggregate" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C8C85]">SURFACE-LEVEL AGGREGATE LIFT</span>
              <span className="text-emerald-600 font-bold">+47.96% Conversion Lift</span>
            </div>
            <p className="text-xs text-[#2D2D2D] leading-relaxed">
              A standard unsegmented analysis suggested a massive win across 50,000 visitors, prompting an immediate 100% rollout recommendation. However, this concealed dangerous segment heterogeneity.
            </p>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2.5 text-xs text-amber-800">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Warning: Naive aggregation masks negative interaction effects in sub-populations (Simpson's Paradox).</span>
            </div>
          </div>
        )}

        {viewMode === "segmented" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#455A30] font-semibold">DEVICE HETEROGENEITY DETECTED</span>
              <span className="font-bold text-[#B91C1C]">Projected $96,300 Loss Avoided (per 50K)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Desktop */}
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-semibold text-emerald-800 flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5" /> Desktop Variant
                  </span>
                  <span className="text-emerald-700 font-bold">+135.66% Lift</span>
                </div>
                <div className="text-xs text-emerald-900">
                  Conversion surged from 4.12% to 9.71% (p &lt; 0.0001). Safe for full deployment.
                </div>
              </div>

              {/* Mobile */}
              <div className="p-3 rounded-lg border border-red-200 bg-red-50/50">
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="font-semibold text-red-800 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5" /> Mobile Variant
                  </span>
                  <span className="text-red-700 font-bold">-47.07% Crash</span>
                </div>
                <div className="text-xs text-red-900">
                  Conversion collapsed from 9.92% to 5.25% (p &lt; 0.0001). Projected to avoid $96,300 in lost revenue per 50K users.
                </div>
              </div>
            </div>
          </div>
        )}

        {viewMode === "decay" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8C8C85]">TEMPORAL NOVELTY DECAY ANALYSIS</span>
              <span className="text-amber-700 font-bold">80.7% Lift Evaporation</span>
            </div>
            <p className="text-xs text-[#2D2D2D] leading-relaxed">
              OptiMetrics tracked weekly performance to isolate curiosity-driven novelty. Week 1 conversion lift (+80.27%) decayed by 80.7% in Week 2 (+15.51%), verifying that initial numbers were inflated by temporary UI curiosity.
            </p>
            <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-[#E5E5DF]">
              <div>
                <div className="text-[10px] text-[#8C8C85] uppercase">Week 1 Peak Lift</div>
                <div className="text-sm font-bold text-emerald-700">+80.27%</div>
              </div>
              <div>
                <div className="text-[10px] text-[#8C8C85] uppercase">Week 2 Residual Lift</div>
                <div className="text-sm font-bold text-amber-700">+15.51%</div>
              </div>
            </div>
          </div>
        )}

        {/* Statistical Rigor Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E5E5DF] text-[11px] font-mono text-[#8C8C85]">
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#455A30]" />
            <span>SRM Chi-Square: p = 0.6355 (Unbiased)</span>
          </div>
          <div>MDE: ±0.81% (Power: 80%, α: 0.05)</div>
        </div>
      </div>
    </div>
  );
}
