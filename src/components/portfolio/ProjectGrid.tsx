"use client";

import * as React from "react";
import { ProjectCaseStudy, PROJECTS } from "@/lib/projects-data";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";
import { Terminal, Filter } from "lucide-react";

interface ProjectGridProps {
  onOpenCopilotWithProject?: (projectName: string) => void;
}

export function ProjectGrid({ onOpenCopilotWithProject }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [activeProject, setActiveProject] = React.useState<ProjectCaseStudy | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const categories = [
    "ALL",
    "Distributed Systems",
    "AI & RAG",
    "Design Systems",
    "Edge Infrastructure",
  ];

  const filteredProjects = React.useMemo(() => {
    if (selectedCategory === "ALL") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const handleOpenCaseStudy = (project: ProjectCaseStudy, tab: string = "overview") => {
    setActiveProject(project);
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  return (
    <section id="projects" className="scroll-mt-24 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              01 // HIGH-IMPACT DELIVERABLES
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Selected Engineering Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Production systems, sub-millisecond pipelines, and verified performance benchmarks.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider rounded-md transition-all ${
                selectedCategory === cat
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-xs font-semibold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
        ))}
      </div>

      {/* Deep Dive Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={activeTab}
      />
    </section>
  );
}
