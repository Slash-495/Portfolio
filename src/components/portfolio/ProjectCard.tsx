"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Activity, Terminal, ExternalLink, Github } from "lucide-react";
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
      className="group relative rounded-xl border border-zinc-200 dark:border-zinc-800/90 bg-white/70 dark:bg-[#111114]/80 backdrop-blur-md p-6 flex flex-col justify-between hover:border-zinc-400 dark:hover:border-zinc-700 transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Top Metadata */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              {project.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
              {project.status}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3
          onClick={() => onOpenCaseStudy(project)}
          className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-100 cursor-pointer group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors flex items-center justify-between"
        >
          {project.title}
          <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </h3>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono mt-1 mb-3">
          {project.tagline}
        </p>

        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
          {project.summary}
        </p>

        {/* Primary Metric Banner */}
        <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 mb-4 flex items-center justify-between font-mono">
          <span className="text-xs text-zinc-500 uppercase">
            {project.primaryMetric.label}
          </span>
          <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
            {project.primaryMetric.value}
          </span>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="subtle" className="text-[10px]">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800/80 gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onOpenCaseStudy(project, "demo")}
          className="text-[11px] gap-1.5 hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-500" />
          Live Demo
        </Button>

        <Button
          size="sm"
          variant="default"
          onClick={() => onOpenCaseStudy(project, "overview")}
          className="text-[11px] gap-1.5"
        >
          Deep Dive <ArrowUpRight className="w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}
