"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { AchievementsSection } from "@/components/portfolio/AchievementsSection";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { SystemSpecs } from "@/components/portfolio/SystemSpecs";
import { RagCopilotWidget } from "@/components/copilot/RagCopilotWidget";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyModal } from "@/components/portfolio/CaseStudyModal";
import { Modal } from "@/components/ui/Modal";
import { PROJECTS, ProjectCaseStudy } from "@/lib/projects-data";

export default function Home() {
  const [isCopilotModalOpen, setIsCopilotModalOpen] = React.useState(false);
  const [activeProject, setActiveProject] = React.useState<ProjectCaseStudy | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = React.useState(false);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K opens Copilot
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCopilotModalOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOpenProjectFromCopilot = (project: ProjectCaseStudy) => {
    setActiveProject(project);
    setIsCaseStudyOpen(true);
    setIsCopilotModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#F9F9F6] text-[#1A1A1A]">
      {/* Top Header */}
      <Header onOpenCopilot={() => setIsCopilotModalOpen(true)} />

      {/* Main Content Area with generous whitespace */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 w-full flex flex-col gap-24 sm:gap-36 py-12 sm:py-20">
        {/* Massive Typographic Hero */}
        <Hero onOpenCopilot={() => setIsCopilotModalOpen(true)} />

        {/* Selected Work (Anti-Bento Typographic List) */}
        <ProjectGrid />

        {/* Milestones & Honors */}
        <AchievementsSection />

        {/* Narrative & Side Quests */}
        <AboutSection />

        {/* Architectural Tenets */}
        <SystemSpecs />

        {/* Ask AI Section */}
        <section id="ai-chat" className="scroll-mt-24 flex flex-col gap-8">
          <div className="flex flex-col gap-2 border-b border-[#E5E5DF] pb-6">
            <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
              Intelligence // 05
            </span>
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
              Ask the Copilot
            </h2>
            <p className="text-sm text-[#8C8C85] max-w-xl">
              An interactive grounded semantic engine trained on technical constraints, architecture diagrams, and system trade-offs.
            </p>
          </div>

          <div className="w-full">
            <RagCopilotWidget
              onOpenProjectCaseStudy={handleOpenProjectFromCopilot}
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Minimal Floating Action Button for Ask AI */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCopilotModalOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1A1A1A] text-[#F9F9F6] hover:bg-[#7A8B6B] transition-colors shadow-lg text-xs font-normal"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7A8B6B]" />
          <span>Ask AI</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] text-white/70 hidden sm:inline-block font-mono">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Floating Copilot Modal Overlay */}
      <Modal
        isOpen={isCopilotModalOpen}
        onClose={() => setIsCopilotModalOpen(false)}
        title="Ask AI Copilot"
        subtitle="Grounded semantic search across architecture specs and case studies"
        maxWidth="2xl"
      >
        <div className="h-[480px]">
          <RagCopilotWidget
            onOpenProjectCaseStudy={handleOpenProjectFromCopilot}
            isFloating={true}
          />
        </div>
      </Modal>

      {/* Case Study Modal triggered from Project Rows or Copilot Citations */}
      <CaseStudyModal
        project={activeProject}
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </div>
  );
}
