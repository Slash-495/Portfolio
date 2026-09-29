"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Terminal, ExternalLink, Github, CheckCircle2, Cpu } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenCaseStudy: (project: ProjectCaseStudy, tab?: string) => void;
}

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="group relative rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white/90 dark:bg-[#0F172A]/80 backdrop-blur-md p-6 flex flex-col justify-between hover:border-slate-400 dark:hover:border-slate-700 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Top Bento Metadata & Live Status Badge */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {project.year}
            </span>
          </div>

          {/* Prominent Live Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
            <span>{project.status}</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          onClick={() => onOpenCaseStudy(project)}
          className="text-lg sm:text-xl font-mono font-bold text-[#0F172A] dark:text-[#F1F5F9] cursor-pointer group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between"
        >
          {project.title}
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-[#0F172A] dark:group-hover:text-[#F1F5F9] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </h3>

        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1 mb-3">
          {project.tagline}
        </p>

        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Bento Primary Metric Callout Banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-[#E2E8F0] dark:border-[#1E293B] mb-4 flex items-center justify-between font-mono">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              {project.primaryMetric.label}
            </span>
            <span className="text-base sm:text-lg font-bold text-[#0F172A] dark:text-[#F1F5F9] mt-0.5">
              {project.primaryMetric.value}
            </span>
          </div>
          <Badge variant="metric" className="bg-emerald-600 text-white dark:bg-emerald-500 dark:text-black font-mono text-[10px]">
            VERIFIED
          </Badge>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="subtle"
              className="text-[10px] bg-slate-100 dark:bg-slate-800/60 border-[#E2E8F0] dark:border-[#1E293B] text-slate-700 dark:text-slate-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Buttons: GitHub Link + Live Demo + Deep Dive */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-[#E2E8F0] dark:border-[#1E293B] gap-2 font-mono text-xs">
        <div className="flex items-center gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0B0F19] hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors text-[11px]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenCaseStudy(project, "demo")}
            className="text-[11px] gap-1.5 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 border-[#E2E8F0] dark:border-[#1E293B]"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Live Demo</span>
          </Button>
        </div>

        <Button
          size="sm"
          variant="default"
          onClick={() => onOpenCaseStudy(project, "overview")}
          className="text-[11px] gap-1.5 bg-[#0F172A] text-white hover:bg-slate-800 dark:bg-[#F1F5F9] dark:text-[#0F172A] dark:hover:bg-white"
        >
          <span>Deep Dive</span>
          <ArrowUpRight className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}
