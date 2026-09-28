"use client";

import * as React from "react";
import { Server, ShieldCheck, Flame, Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function CacheSimulatorDemo() {
  const [coalescingEnabled, setCoalescingEnabled] = React.useState(true);
  const [isSimulating, setIsSimulating] = React.useState(false);
  const [completedRequests, setCompletedRequests] = React.useState(1000);
  const [originRequests, setOriginRequests] = React.useState(1);
  const [dbLoad, setDbLoad] = React.useState(2); // percent
  const [latencyMs, setLatencyMs] = React.useState(3.18);

  const runSimulation = () => {
    setIsSimulating(true);
    setCompletedRequests(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 100;
      setCompletedRequests(Math.min(1000, progress));

      if (progress >= 1000) {
        clearInterval(interval);
        setIsSimulating(false);
      }
    }, 40);

    if (coalescingEnabled) {
      setOriginRequests(1);
      setDbLoad(2);
      setLatencyMs(3.18);
    } else {
      setOriginRequests(1000);
      setDbLoad(98);
      setLatencyMs(1420);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 font-mono text-xs">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-zinc-300">
            SINGLE-FLIGHT REQUEST COALESCER & ORIGIN SHIELD
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant={coalescingEnabled ? "active" : "outline"}>
            COALESCING: {coalescingEnabled ? "ARMED (1 ORIGIN REQ)" : "DISABLED"}
          </Badge>
          <Badge variant="metric">p99: {latencyMs}ms</Badge>
        </div>
      </div>

      {/* Simulator Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">Incoming Concurrent Ingress</div>
          <div className="text-lg font-bold text-zinc-100 mt-1">
            {completedRequests.toLocaleString()} / 1,000
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">HTTP/3 Edge Termination</div>
        </div>

        <div
          className={`p-3 rounded-lg border transition-all ${
            coalescingEnabled
              ? "bg-zinc-900/60 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/50 text-red-200"
          }`}
        >
          <div className="text-[10px] text-zinc-400 uppercase">Origin Database Requests</div>
          <div className="text-lg font-bold mt-1">
            {isSimulating ? "Processing..." : `${originRequests} Outbound`}
          </div>
          <div className="text-[10px] mt-0.5">
            {coalescingEnabled
              ? "99.9% Backend Load Eliminated"
              : "Cache Stampede: Severe DB Thrash!"}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800">
          <div className="text-[10px] text-zinc-500 uppercase">Origin CPU & Memory Load</div>
          <div
            className={`text-lg font-bold mt-1 ${
              dbLoad > 80 ? "text-red-400" : "text-zinc-100"
            }`}
          >
            {dbLoad}%
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full transition-all duration-300 ${
                dbLoad > 80 ? "bg-red-500" : "bg-emerald-400"
              }`}
              style={{ width: `${dbLoad}%` }}
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-zinc-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setCoalescingEnabled(!coalescingEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
              coalescingEnabled
                ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-300"
                : "bg-red-950/40 border-red-800 text-red-400"
            }`}
          >
            {coalescingEnabled ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5" /> Coalescing: Enabled
              </>
            ) : (
              <>
                <Flame className="w-3.5 h-3.5" /> Coalescing: Disabled
              </>
            )}
          </button>
          <span className="text-[11px] text-zinc-500">
            {coalescingEnabled ? "Collapses 1,000 -> 1" : "Simulates raw cache stampede"}
          </span>
        </div>

        <Button
          size="sm"
          variant="glow"
          disabled={isSimulating}
          onClick={runSimulation}
          className="w-full sm:w-auto text-emerald-300 border-emerald-500/40 hover:border-emerald-400"
        >
          {isSimulating ? (
            "Streaming 1,000 requests..."
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Trigger 1,000 Burst Ingress
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
