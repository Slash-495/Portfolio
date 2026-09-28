"use client";

import * as React from "react";
import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/portfolio/Hero";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { SystemSpecs } from "@/components/portfolio/SystemSpecs";
import { RagCopilotWidget } from "@/components/copilot/RagCopilotWidget";
import { Footer } from "@/components/layout/Footer";
import { CaseStudyModal } from "@/components/portfolio/CaseStudyModal";
import { Modal } from "@/components/ui/Modal";
import { PROJECTS, ProjectCaseStudy } from "@/lib/projects-data";
import { Bot, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    // Keep or minimize copilot modal
    setIsCopilotModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Header with Dark/Light Toggle */}
      <Header onOpenCopilot={() => setIsCopilotModalOpen(true)} />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 w-full flex flex-col gap-20 py-6 sm:py-10">
        {/* Hero Manifesto & Telemetry */}
        <Hero onOpenCopilot={() => setIsCopilotModalOpen(true)} />

        {/* High-Impact Project Case Studies */}
        <ProjectGrid />

        {/* System Specs & Engineering Matrix */}
        <SystemSpecs />

        {/* Embedded Interactive RAG Copilot Section */}
        <section id="copilot" className="scroll-mt-24 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Bot className="w-4 h-4 text-emerald-500" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  03 // CONVERSATIONAL INTELLIGENCE
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Embedded Portfolio RAG Copilot
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Query system architecture specs, throughput bottlenecks, and code decisions with verified source citations.
              </p>
            </div>
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

      {/* Floating Action Button for RAG Copilot */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCopilotModalOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 border border-zinc-700/60 shadow-2xl hover:scale-105 active:scale-95 transition-all font-mono text-xs font-semibold"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>RAG Copilot</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 text-[10px] hidden sm:inline-block">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Floating Copilot Modal Overlay */}
      <Modal
        isOpen={isCopilotModalOpen}
        onClose={() => setIsCopilotModalOpen(false)}
        title="PORTFOLIO RAG COPILOT"
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

      {/* Case Study Modal triggered from Copilot Citations */}
      <CaseStudyModal
        project={activeProject}
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </div>
  );
}
