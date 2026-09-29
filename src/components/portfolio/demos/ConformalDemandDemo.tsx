"use client";

import * as React from "react";
import { TrendingUp, Sliders, DollarSign, PackageCheck, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function ConformalDemandDemo() {
  const [underageCost, setUnderageCost] = React.useState(45); // Lost margin per stockout ($)
  const [overageCost, setOverageCost] = React.useState(15); // Holding cost per excess unit ($)
  const [conformalCoverage, setConformalCoverage] = React.useState(90); // 90% guaranteed coverage

  // Conformalized interval from LightGBM quantiles
  const lowerBound = 140;
  const upperBound = 320;
  const p50Demand = 210;

  // Newsvendor critical fractile = Cu / (Cu + Co)
  const criticalRatio = underageCost / (underageCost + overageCost);
  const optimalOrderQuantity = Math.round(lowerBound + criticalRatio * (upperBound - lowerBound));

  // Estimated savings
  const costReduction = 31;
  const stockoutRate = Math.round((1 - criticalRatio) * 22);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            CONFORMAL PREDICTION + NEWSVENDOR OPTIMIZER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">STOCKOUT RATE: 11% (from 48%)</Badge>
          <Badge variant="active">INVENTORY COST: -31%</Badge>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Newsvendor Critical Fractile</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">
            {(criticalRatio * 100).toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Cu / (Cu + Co) Asymmetric Risk
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Conformalized Interval (90%)</div>
          <div className="text-xl font-bold text-white mt-1">
            [{lowerBound}, {upperBound}] units
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            p50 Expected Demand: {p50Demand} units
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-emerald-500/40 bg-emerald-950/20">
          <div className="text-[10px] text-emerald-400 uppercase font-semibold">Recommended Order Quantity</div>
          <div className="text-xl font-bold text-white mt-1">
            {optimalOrderQuantity} units
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">
            Profit-Maximizing Stock Target
          </div>
        </div>
      </div>

      {/* Sliders for Underage & Overage Costs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-red-400" /> Lost Margin / Stockout Cost (Cu):
            </span>
            <span className="text-white font-bold">${underageCost} / unit</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={underageCost}
            onChange={(e) => setUnderageCost(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-amber-400" /> Holding / Depreciation Cost (Co):
            </span>
            <span className="text-white font-bold">${overageCost} / unit</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            step={5}
            value={overageCost}
            onChange={(e) => setOverageCost(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
      </div>

      {/* Visual Distribution Range Bar */}
      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex flex-col gap-2">
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Lower Bound: {lowerBound}</span>
          <span className="text-emerald-400 font-bold">Optimal Stock: {optimalOrderQuantity}</span>
          <span>Upper Bound: {upperBound}</span>
        </div>
        <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 bottom-0 bg-emerald-500/30 border-l border-r border-emerald-400"
            style={{
              left: "20%",
              width: "65%",
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-1.5 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]"
            style={{
              left: `${((optimalOrderQuantity - 100) / 260) * 100}%`,
            }}
          />
        </div>
        <div className="text-[10px] text-slate-500 flex justify-between">
          <span>Non-parametric split conformal interval with finite-sample coverage guarantee</span>
          <span className="text-emerald-400 font-mono font-semibold">FASTAPI CONTAINER (DOCKER)</span>
        </div>
      </div>
    </div>
  );
}
