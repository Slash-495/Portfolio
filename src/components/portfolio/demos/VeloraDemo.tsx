"use client";

import * as React from "react";
import { Zap, Server, ShieldCheck, Database, RefreshCw, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface DataEntity {
  id: string;
  name: string;
  status: "Synced" | "Optimistic Pending";
  latency: number;
}

export function VeloraDemo() {
  const [items, setItems] = React.useState<DataEntity[]>([
    { id: "v-1", name: "Cluster Node-Alpha State", status: "Synced", latency: 28 },
    { id: "v-2", name: "Real-time Telemetry Ingestion", status: "Synced", latency: 34 },
    { id: "v-3", name: "Dynamic Token Cache Buffer", status: "Synced", latency: 22 },
  ]);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const triggerOptimisticMutation = () => {
    setIsUpdating(true);
    const newId = `v-${Date.now()}`;
    const optimisticItem: DataEntity = {
      id: newId,
      name: `Async Dispatch #${items.length + 1}`,
      status: "Optimistic Pending",
      latency: 0, // Instant UI update (0ms)
    };

    // 1. Optimistic UI update (0ms layout shift)
    setItems((prev) => [optimisticItem, ...prev]);

    // 2. Server reconciliation in 38ms
    setTimeout(() => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === newId ? { ...item, status: "Synced", latency: 38 } : item
        )
      );
      setIsUpdating(false);
    }, 280);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            VELORA: REACTIVE FULL-STACK PIPELINE & OPTIMISTIC UI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">API LATENCY: &lt;45ms</Badge>
          <Badge variant="active">100% END-TO-END TYPE-SAFE</Badge>
        </div>
      </div>

      {/* Reactive Pipeline Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Client Optimistic Dispatch</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">0ms</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Instant Visual Feedback</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Server Action Settlement</div>
          <div className="text-xl font-bold text-white mt-1">38ms</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Zod Schema Validated</div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Database Edge Cache</div>
          <div className="text-xl font-bold text-white mt-1">99.8%</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Sub-5ms Hot Queries</div>
        </div>
      </div>

      {/* Interactive Mutation Stream */}
      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-slate-400 text-[11px]">Real-Time Reactive Event Log:</span>
          <Button
            size="sm"
            variant="glow"
            onClick={triggerOptimisticMutation}
            disabled={isUpdating}
            className="text-emerald-400 border-emerald-500/40 hover:border-emerald-400"
          >
            {isUpdating ? "Settling with Edge DB..." : "Trigger Optimistic Mutation"}
          </Button>
        </div>

        <div className="space-y-2">
          {items.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className={`p-3 rounded-lg border transition-all flex items-center justify-between ${
                item.status === "Optimistic Pending"
                  ? "bg-amber-950/30 border-amber-500/60 text-amber-200 animate-pulse"
                  : "bg-slate-900/60 border-slate-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.status === "Optimistic Pending" ? "bg-amber-400" : "bg-emerald-400"}`} />
                <span className="font-bold text-white text-xs">{item.name}</span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="text-[11px] text-slate-400">
                  {item.status === "Optimistic Pending" ? "Client-Rendered (0ms)" : `Settled in ${item.latency}ms`}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.status === "Optimistic Pending"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
