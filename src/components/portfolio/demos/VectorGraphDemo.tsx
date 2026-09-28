"use client";

import * as React from "react";
import { GitBranch, Cpu, ArrowRight, ShieldCheck, Database, Code2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface AgentSpec {
  id: string;
  name: string;
  domain: string;
  icon: React.ReactNode;
  vectorSimilarity: number;
  isSelected: boolean;
}

const SAMPLE_PROMPTS = [
  "Calculate quarterly multi-currency tax amortization and generate ledger entries",
  "Implement an authenticated high-speed JWT middleware in Rust with zero-copy header parsing",
  "Audit Kubernetes Helm charts and Dockerfiles for zero-day CVE container vulnerabilities",
];

export function VectorGraphDemo() {
  const [query, setQuery] = React.useState(SAMPLE_PROMPTS[0]);
  const [isRouting, setIsRouting] = React.useState(false);
  const [latencyMs, setLatencyMs] = React.useState(134);

  // Compute mock cosine similarities based on active query keywords
  const agents: AgentSpec[] = React.useMemo(() => {
    const q = query.toLowerCase();
    let finScore = 0.42;
    let codeScore = 0.38;
    let secScore = 0.25;

    if (q.includes("tax") || q.includes("currency") || q.includes("amortization") || q.includes("ledger")) {
      finScore = 0.94;
      codeScore = 0.29;
      secScore = 0.18;
    } else if (q.includes("rust") || q.includes("jwt") || q.includes("middleware") || q.includes("code")) {
      codeScore = 0.96;
      finScore = 0.21;
      secScore = 0.44;
    } else if (q.includes("kubernetes") || q.includes("cve") || q.includes("vulnerabilities") || q.includes("audit")) {
      secScore = 0.95;
      codeScore = 0.51;
      finScore = 0.14;
    }

    const max = Math.max(finScore, codeScore, secScore);

    return [
      {
        id: "financial-agent",
        name: "Financial Ledger Agent",
        domain: "Tax & Multi-Currency Amortization",
        icon: <Database className="w-4 h-4 text-emerald-400" />,
        vectorSimilarity: finScore,
        isSelected: finScore === max,
      },
      {
        id: "systems-code-agent",
        name: "Systems Code Architect",
        domain: "Low-Level Rust & Zero-Copy Concurrency",
        icon: <Code2 className="w-4 h-4 text-cyan-400" />,
        vectorSimilarity: codeScore,
        isSelected: codeScore === max,
      },
      {
        id: "security-auditor",
        name: "Infrastructure SecOps",
        domain: "Container & Kubernetes CVE Analysis",
        icon: <ShieldCheck className="w-4 h-4 text-amber-400" />,
        vectorSimilarity: secScore,
        isSelected: secScore === max,
      },
    ];
  }, [query]);

  const handleSelectPrompt = (prompt: string) => {
    setIsRouting(true);
    setQuery(prompt);
    setTimeout(() => {
      setLatencyMs(Math.floor(125 + Math.random() * 20));
      setIsRouting(false);
    }, 180);
  };

  const selectedAgent = agents.find((a) => a.isSelected) || agents[0];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 font-mono text-xs">
      {/* Telemetry Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold uppercase tracking-wider text-zinc-300">
            HNSW SEMANTIC VECTOR ROUTER & DAG COMPILER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">ROUTING: {latencyMs}ms</Badge>
          <Badge variant="active">TOKEN SAVINGS: -68%</Badge>
        </div>
      </div>

      {/* Preset Prompts */}
      <div className="flex flex-col gap-2">
        <span className="text-zinc-400 text-[11px]">Select or test a sample query:</span>
        <div className="flex flex-col gap-1.5">
          {SAMPLE_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPrompt(prompt)}
              className={`text-left p-2 rounded-lg border transition-all text-[11px] font-sans ${
                query === prompt
                  ? "bg-zinc-800/90 border-cyan-500/60 text-zinc-100 shadow-sm"
                  : "bg-zinc-900/50 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
              }`}
            >
              &ldquo;{prompt}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Vector Cosine Similarity Ratings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`p-3 rounded-lg border transition-all flex flex-col justify-between ${
              agent.isSelected
                ? "bg-zinc-900 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40"
                : "bg-zinc-950/60 border-zinc-800/80 opacity-70"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="p-1 rounded bg-zinc-800">{agent.icon}</div>
                <span
                  className={`text-[11px] font-bold ${
                    agent.isSelected ? "text-cyan-400" : "text-zinc-500"
                  }`}
                >
                  {(agent.vectorSimilarity * 100).toFixed(1)}% match
                </span>
              </div>
              <div className="font-semibold text-zinc-200 text-xs mb-0.5">
                {agent.name}
              </div>
              <div className="text-[10px] text-zinc-400 line-clamp-1">
                {agent.domain}
              </div>
            </div>

            {/* Similarity bar */}
            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                className={`h-full transition-all duration-300 ${
                  agent.isSelected ? "bg-cyan-400" : "bg-zinc-600"
                }`}
                style={{ width: `${agent.vectorSimilarity * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Generated DAG Execution Pipeline */}
      <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/80 mt-1">
        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
          <span>COMPILED TOPOLOGICAL DAG:</span>
          <span className="text-cyan-400 font-semibold">
            STATUS: READY IN {latencyMs}ms
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            [1] Sanitize & Vectorize
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-semibold">
            [2] Dispatch {selectedAgent.name}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="px-2 py-1 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
            [3] Context Compress (-68%)
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
          <span className="px-2 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
            [4] Output Synthesis
          </span>
        </div>
      </div>
    </div>
  );
}
