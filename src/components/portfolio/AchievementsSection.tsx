"use client";

import * as React from "react";
import {
  Award,
  FileCheck2,
  GraduationCap,
  Code2,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PatentFootrestDemo } from "./demos/PatentFootrestDemo";

export function AchievementsSection() {
  const [showPatentDemo, setShowPatentDemo] = React.useState(false);

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case "Award":
        return <Award className="w-5 h-5 text-emerald-500" />;
      case "FileCheck2":
        return <FileCheck2 className="w-5 h-5 text-indigo-500" />;
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-sky-500" />;
      case "Code2":
        return <Code2 className="w-5 h-5 text-amber-500" />;
      case "Terminal":
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      default:
        return <Award className="w-5 h-5 text-emerald-500" />;
    }
  };

  return (
    <section id="achievements" className="scroll-mt-24 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Award className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              02 // DISTINCTIONS, HONORS & INTELLECTUAL PROPERTY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Honors, Patent & Technical Milestones
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Competitive national selections, intellectual property filings, academic standing, and open-source contributions.
          </p>
        </div>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {ACHIEVEMENTS.map((item) => {
          const isPatent = item.id === "two-wheeler-footrest-patent";
          return (
            <div
              key={item.id}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isPatent
                  ? "md:col-span-2 bg-gradient-to-br from-indigo-500/[0.03] via-transparent to-emerald-500/[0.03] border-indigo-200/80 dark:border-indigo-900/40 shadow-xs"
                  : item.id === "amazon-ml-summer-school"
                  ? "md:col-span-2 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-transparent border-emerald-200/80 dark:border-emerald-900/40 shadow-xs"
                  : "bg-white/80 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
              }`}
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/60">
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                        {item.category} • {item.year}
                      </span>
                      <span className="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {item.organization}
                      </span>
                    </div>
                  </div>

                  <Badge
                    variant={
                      item.id === "amazon-ml-summer-school"
                        ? "active"
                        : item.id === "two-wheeler-footrest-patent"
                        ? "default"
                        : "subtle"
                    }
                    className="font-mono text-[11px]"
                  >
                    {item.badge}
                  </Badge>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                  {item.description}
                </p>

                {/* Technical Highlights */}
                <div className="space-y-1.5 mb-4">
                  {item.highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-sans"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics & Actions */}
              <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                {/* Metric pills */}
                <div className="flex flex-wrap items-center gap-3">
                  {item.metrics?.map((m, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-[11px]"
                    >
                      <span className="text-zinc-500 uppercase">{m.label}: </span>
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">{m.value}</span>
                    </div>
                  ))}
                </div>

                {/* Patent Interactive Simulation Toggle */}
                {isPatent && (
                  <div className="w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowPatentDemo((prev) => !prev)}
                      className="gap-2 border-indigo-300 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs w-full sm:w-auto font-mono"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>{showPatentDemo ? "Hide Mechanical Simulator" : "Test Centrifugal Interlock Simulator"}</span>
                      {showPatentDemo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </Button>
                  </div>
                )}

                {/* External verification link if available */}
                {item.verificationLink && (
                  <a
                    href={item.verificationLink.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-medium"
                  >
                    <span>{item.verificationLink.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              {/* Embedded Patent Interactive Simulation */}
              {isPatent && showPatentDemo && (
                <div className="mt-5 pt-4 border-t border-indigo-200 dark:border-indigo-900/60">
                  <div className="mb-2 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>INTERACTIVE HARDWARE BENCHMARK</span>
                    <span className="text-emerald-500 font-semibold">PATENT APP: 202421034177</span>
                  </div>
                  <PatentFootrestDemo />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
