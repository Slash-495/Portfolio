"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectCaseStudy } from "@/lib/projects-data";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  onOpenCaseStudy: (project: ProjectCaseStudy, tab?: string) => void;
}

export function ProjectCard({ project, onOpenCaseStudy }: ProjectCardProps) {
  return (
    <div
      onClick={() => onOpenCaseStudy(project, "overview")}
      className="group cursor-pointer border-b border-[#E5E5DF] py-7 sm:py-9 px-2 -mx-2 transition-colors hover:bg-black/[0.015]"
    >
      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8">
        {/* Left: Project Category */}
        <div className="w-full md:w-48 shrink-0 text-xs tracking-wider uppercase text-[#8C8C85] font-sans">
          {project.category}
        </div>

        {/* Center: Massive Project Title & Subtitle */}
        <div className="flex-1 flex flex-col gap-1.5">
          <h3 className="text-2xl sm:text-3xl lg:text-[2rem] font-normal tracking-tight text-[#1A1A1A] group-hover:text-[#455A30] transition-colors leading-tight">
            {project.title}
          </h3>
          <p className="text-sm sm:text-base text-[#666662] font-light leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
        </div>

        {/* Right: Year, Direct Links, Arrow */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-5 text-sm text-[#8C8C85] shrink-0 self-start md:self-baseline pt-1 md:pt-0">
          {project.liveUrl && !project.isExtensionOrRepoOnly && (
            <div className="flex items-center gap-1.5">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#455A30] hover:text-[#1A1A1A] transition-colors font-medium underline underline-offset-4 decoration-[#455A30]/40 hover:decoration-[#1A1A1A]"
                title={project.coldStartNote}
              >
                Live app ↗
              </a>
              {project.coldStartNote && (
                <span className="text-[10px] text-[#8C8C85] font-mono" title={project.coldStartNote}>
                  (sleep tier)
                </span>
              )}
            </div>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-[#666662] hover:text-[#1A1A1A] transition-colors"
            >
              {project.isExtensionOrRepoOnly ? "Extension Repo ↗" : "Code ↗"}
            </a>
          )}
          <span className="text-xs text-[#8C8C85] font-mono">{project.year}</span>
          <ArrowUpRight className="w-4 h-4 text-[#8C8C85] group-hover:text-[#455A30] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
}
