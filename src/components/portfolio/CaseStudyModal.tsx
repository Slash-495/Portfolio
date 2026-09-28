"use client";

import * as React from "react";
import { ProjectCaseStudy } from "@/lib/projects-data";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  Cpu,
  Terminal,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Github,
  AlertCircle,
  CheckCircle2,
  GitCommit,
} from "lucide-react";
import { EventStreamerDemo } from "./demos/EventStreamerDemo";
import { VectorGraphDemo } from "./demos/VectorGraphDemo";
import { SpringPhysicsDemo } from "./demos/SpringPhysicsDemo";
import { CacheSimulatorDemo } from "./demos/CacheSimulatorDemo";

interface CaseStudyModalProps {
  project: ProjectCaseStudy | null;
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export function CaseStudyModal({
  project,
  isOpen,
  onClose,
  defaultTab = "overview",
}: CaseStudyModalProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTab);

  React.useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!project) return null;

  const tabs = [
    {
      id: "overview",
      label: "Overview & Constraints",
      icon: <Layers className="w-3.5 h-3.5" />,
    },
    {
      id: "architecture",
      label: "System Architecture",
      icon: <Cpu className="w-3.5 h-3.5" />,
    },
    {
      id: "demo",
      label: "Interactive Playground",
      icon: <Activity className="w-3.5 h-3.5 text-emerald-400" />,
      badge: "LIVE",
    },
    {
      id: "code",
      label: "Code & Trade-offs",
      icon: <Terminal className="w-3.5 h-3.5" />,
    },
  ];

  const renderInteractiveDemo = () => {
    switch (project.interactiveDemoType) {
      case "event-streamer":
        return <EventStreamerDemo />;
      case "vector-graph":
        return <VectorGraphDemo />;
      case "spring-physics":
        return <SpringPhysicsDemo />;
      case "cache-simulator":
        return <CacheSimulatorDemo />;
      default:
        return null;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${project.title} — Deep Dive`}
      subtitle={project.tagline}
      maxWidth="4xl"
    >
      <div className="flex flex-col gap-6">
        {/* Top Summary Bar & Metrics Grid */}
        <div className="flex flex-col gap-4 bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Badge variant="metric">{project.category}</Badge>
              <Badge variant="active">{project.status}</Badge>
              <span className="text-xs text-zinc-500 font-mono">
                RELEASE: {project.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(project.githubUrl, "_blank")}
                  className="gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> Source
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => window.open(project.liveUrl, "_blank")}
                  className="gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                </Button>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
            {project.metrics.map((metric, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[11px] font-mono text-zinc-500 uppercase">
                  {metric.label}
                </span>
                <span className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
                  {metric.value}
                </span>
                <span className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                  {metric.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

        {/* Tab 1: Overview & Constraints */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Context & Problem */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                The Problem & System Constraints
              </h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.problem.context}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="p-3.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200 block mb-2">
                    Key Bottlenecks:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {project.problem.painPoints.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-500">✕</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs font-mono font-semibold text-zinc-900 dark:text-zinc-200 block mb-2">
                    Engineering Constraints:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {project.problem.constraints.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-500">✓</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Solution Overview */}
            <div className="flex flex-col gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Architectural Solution
              </h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {project.solution.overview}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                {project.solution.architectureHighlights.map((hl, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg border border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20 text-xs text-zinc-700 dark:text-zinc-300 flex items-center gap-2.5 font-mono"
                  >
                    <span className="text-emerald-500 font-bold">0{i + 1}.</span>
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <span className="text-xs font-mono text-zinc-500 mr-2">
                STACK:
              </span>
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="default">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: System Architecture */}
        {activeTab === "architecture" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="flex flex-col gap-2">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                Architecture Topography & Pipeline
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.architecture.diagramDescription}
              </p>
            </div>

            {/* Architecture Node Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {project.architecture.nodes.map((node, i) => (
                <div
                  key={node.id}
                  className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/70 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase">
                        Step 0{i + 1}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-500 font-semibold">
                        {node.tech}
                      </span>
                    </div>
                    <div className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      {node.title}
                    </div>
                    <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug">
                      {node.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Data Flow Timeline */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
              <h5 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold mb-3">
                Execution Lifecycle
              </h5>
              <div className="space-y-2.5">
                {project.architecture.dataFlowSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono text-zinc-400 font-bold shrink-0">
                      [0{idx + 1}]
                    </span>
                    <span className="text-zinc-700 dark:text-zinc-300">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Playground */}
        {activeTab === "demo" && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                  Live Interactive Benchmark & Simulation
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Simulating real production workload conditions right in your browser.
                </p>
              </div>
              <Badge variant="active">LIVE CLIENT RUNTIME</Badge>
            </div>

            {renderInteractiveDemo()}
          </div>
        )}

        {/* Tab 4: Code & Trade-offs */}
        {activeTab === "code" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            {/* Trade-offs Matrix */}
            <div className="flex flex-col gap-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-cyan-400" />
                Technical Trade-Offs & Architectural Decisions
              </h4>
              <div className="space-y-3">
                {project.solution.tradeOffs.map((trade, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex flex-col gap-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between text-xs font-mono">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        Chosen: {trade.choice}
                      </span>
                      <span className="text-zinc-400 line-through">
                        Alternative: {trade.alternative}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                      {trade.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Highlights */}
            <div className="flex flex-col gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                Critical Code Snippet
              </h4>
              {project.codeHighlights.map((code, idx) => (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100"
                >
                  <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-400">
                    <span>{code.title}</span>
                    <span className="uppercase text-[10px] text-zinc-500">
                      {code.language}
                    </span>
                  </div>
                  <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed text-zinc-300">
                    <code>{code.code}</code>
                  </pre>
                  <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800/80 text-xs text-zinc-400">
                    <span className="text-zinc-300 font-semibold font-mono text-[11px] mr-1.5">
                      RATIONALE:
                    </span>
                    {code.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
