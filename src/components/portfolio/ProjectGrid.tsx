"use client";

import * as React from "react";
import { ProjectCaseStudy, PROJECTS } from "@/lib/projects-data";
import { ProjectCard } from "./ProjectCard";
import { CaseStudyModal } from "./CaseStudyModal";

interface ProjectGridProps {
  onOpenCopilotWithProject?: (projectName: string) => void;
}

export function ProjectGrid({ onOpenCopilotWithProject }: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("ALL");
  const [activeProject, setActiveProject] = React.useState<ProjectCaseStudy | null>(null);
  const [activeTab, setActiveTab] = React.useState<string>("overview");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const categories = [
    { label: "All", value: "ALL" },
    { label: "AI Systems", value: "AI Systems" },
    { label: "Data & Analytics", value: "Data & Analytics" },
    { label: "Full Stack", value: "Full Stack" },
    { label: "Applied ML", value: "Applied ML" },
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
    <section id="work" className="scroll-mt-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5E5DF] pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
            Index // 01
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
            Selected Work
          </h2>
        </div>

        {/* Flat Minimal Category Filter */}
        <div className="flex flex-wrap items-center gap-5 sm:gap-7 text-xs font-normal">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`transition-colors py-1 ${
                selectedCategory === cat.value
                  ? "text-[#1A1A1A] font-medium border-b border-[#1A1A1A]"
                  : "text-[#8C8C85] hover:text-[#1A1A1A]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clean Typographic Borderless List */}
      <div className="flex flex-col">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpenCaseStudy={handleOpenCaseStudy}
          />
        ))}
      </div>

      {/* Case Study Modal (Editorial Reader Mode) */}
      <CaseStudyModal
        project={activeProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={activeTab}
      />
    </section>
  );
}
