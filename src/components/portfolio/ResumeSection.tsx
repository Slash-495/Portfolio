"use client";

import * as React from "react";
import { ArrowUpRight, Download, Eye, FileText, CheckCircle2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ResumeItem {
  id: string;
  title: string;
  badge: string;
  isPrimary?: boolean;
  roleNote: string;
  description: string;
  keyProjects: { name: string; detail: string }[];
  skills: string[];
  pdfUrl: string;
  downloadName: string;
  fileName: string;
}

const RESUMES: ResumeItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Software Engineering",
    badge: "Full Stack Track",
    isPrimary: true,
    roleNote: "Web Architecture & Distributed Systems",
    description:
      "Engineered for roles focusing on modern web architecture, distributed client state, WebRTC peer-to-peer streaming, and reactive microservices.",
    keyProjects: [
      {
        name: "Duffy",
        detail: "Real-time collaborative canvas workspace & WebRTC mesh communication with sub-50ms latency.",
      },
      {
        name: "LeetLens",
        detail: "Interactive algorithm execution profiler & AST call tree visualizer (400+ problems analyzed).",
      },
      {
        name: "Velora",
        detail: "High-concurrency e-commerce platform with deterministic cart state & optimistic UI updates.",
      },
    ],
    skills: [
      "React",
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "WebRTC",
      "PostgreSQL",
      "Prisma",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_fullstack_23bsm015.pdf",
    downloadName: "Arush_Jain_FullStack_Resume.pdf",
    fileName: "arush_jain_fullstack.pdf",
  },
  {
    id: "ai-systems",
    title: "AI & LLM Systems Engineering",
    badge: "Specialized Track • Agents & RAG",
    isPrimary: false,
    roleNote: "Multi-Agent DAGs & Hybrid Vector Retrieval",
    description:
      "Engineered for roles building agentic workflows, deterministic rule verification gates, dual-stream hybrid search (dense + sparse), and RAG pipelines.",
    keyProjects: [
      {
        name: "RailRoute Agent",
        detail: "3-agent triad DAG (Planner -> Verifier -> Ranker) raising operational pass rate to 100% and halving latency.",
      },
      {
        name: "Chambers & Infrastructure",
        detail: "Dual-stream FAISS + BM25 hybrid legal RAG with Cohere reranking, achieving 94.2% Precision@4.",
      },
      {
        name: "Two-Tower Recommender",
        detail: "InfoNCE contrastive dual-encoder retrieval with FAISS MIPS index (+34% MRR@10).",
      },
    ],
    skills: [
      "Python 3.11+",
      "LangGraph",
      "FastAPI",
      "FAISS",
      "BM25",
      "Cohere Rerank",
      "Gemini 1.5",
      "Redis",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_ai_systems.pdf",
    downloadName: "Arush_Jain_AI_Systems.pdf",
    fileName: "arush_jain_ai_systems.pdf",
  },
  {
    id: "machine-learning",
    title: "Machine Learning & Applied ML",
    badge: "Quantitative Track • Deep Learning & Inference",
    isPrimary: false,
    roleNote: "Probabilistic Modeling & Deep Retrieval",
    description:
      "Engineered for applied machine learning positions involving conformal quantile regression, loss landscape optimization, and mechatronic systems.",
    keyProjects: [
      {
        name: "Conformal Demand Forecasting",
        detail: "LightGBM + Conformal Quantile Regression (CQR 90%) mapped to Newsvendor, reducing stockouts to 11%.",
      },
      {
        name: "Multimodal Two-Tower Encoder",
        detail: "PyTorch dual-encoder matching user intent against high-dimensional catalog embeddings.",
      },
      {
        name: "Centrifugal Safety Footrest",
        detail: "Patent Application Published (App. No. 202421034177) for automated mechanical actuation.",
      },
    ],
    skills: [
      "PyTorch",
      "LightGBM",
      "Scikit-learn",
      "FAISS",
      "Optuna",
      "NumPy",
      "Pandas",
      "FastAPI",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_machine_learning.pdf",
    downloadName: "Arush_Jain_Machine_Learning.pdf",
    fileName: "arush_jain_machine_learning.pdf",
  },
  {
    id: "data-analytics",
    title: "Data & Business Analytics",
    badge: "Analytics Track • Warehousing & BI",
    isPrimary: false,
    roleNote: "PostgreSQL Dimensional Marts & Statistical Testing",
    description:
      "Engineered for analytics engineering and quantitative operations involving ELT SQL transformations, Metabase dashboards, and A/B hypothesis testing.",
    keyProjects: [
      {
        name: "Olist Analytics Engine",
        detail: "100k+ order PostgreSQL 15 warehouse with 4-layer ELT, quantifying R$ 1.73M in delivery delay churn.",
      },
      {
        name: "OptiMetrics",
        detail: "Statistical A/B experimentation suite with SRM validation saving $96,300+ in revenue.",
      },
      {
        name: "Roznamcha",
        detail: "PostgreSQL NTILE(5) RFM quintiles and time-series cohort retention matrices with sub-45ms latency.",
      },
    ],
    skills: [
      "PostgreSQL 15",
      "Metabase",
      "Python (Pandas, SciPy)",
      "Power BI (DAX)",
      "Statistical A/B Testing",
      "Docker Compose",
    ],
    pdfUrl: "/resumes/arush_jain_data_analytics.pdf",
    downloadName: "Arush_Jain_Data_Analytics.pdf",
    fileName: "arush_jain_data_analytics.pdf",
  },
];

export function ResumeSection() {
  const [previewResume, setPreviewResume] = React.useState<ResumeItem | null>(null);

  return (
    <section id="resume" className="scroll-mt-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E5DF] pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
            Credentials // 05
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
            Curated Resumes
          </h2>
        </div>
        <p className="text-sm text-[#8C8C85] max-w-md">
          Role-tailored single-page CVs emphasizing specialized engineering capabilities. Download the specific track aligned with your team&apos;s technical requirements.
        </p>
      </div>

      {/* Editorial List of Tailored Resumes */}
      <div className="flex flex-col border-t border-[#E5E5DF]">
        {RESUMES.map((item) => (
          <div
            key={item.id}
            className={`border-b border-[#E5E5DF] py-8 sm:py-9 px-2 -mx-2 flex flex-col lg:flex-row lg:items-start justify-between gap-6 group hover:bg-black/[0.015] transition-colors ${
              item.isPrimary ? "bg-[#455A30]/[0.02]" : ""
            }`}
          >
            {/* Column 1: Header & Role Identification */}
            <div className="lg:w-72 shrink-0 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 border ${
                    item.isPrimary
                      ? "border-[#455A30] text-[#455A30] bg-[#455A30]/5 font-medium"
                      : "border-[#E5E5DF] text-[#8C8C85]"
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-[#1A1A1A] group-hover:text-[#455A30] transition-colors tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs text-[#8C8C85] font-light">
                {item.roleNote}
              </p>
            </div>

            {/* Column 2: Overview & Projects */}
            <div className="flex-1 flex flex-col gap-4">
              <p className="text-sm text-[#666662] font-light leading-relaxed max-w-2xl">
                {item.description}
              </p>

              {/* Projects highlight */}
              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-[11px] uppercase tracking-widest text-[#8C8C85] font-mono">
                  Featured Case Studies
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
                  {item.keyProjects.map((p, i) => (
                    <div
                      key={i}
                      className="border border-[#E5E5DF] p-2.5 bg-white/40 flex flex-col gap-1"
                    >
                      <span className="text-xs font-medium text-[#1A1A1A]">
                        {p.name}
                      </span>
                      <span className="text-[11px] text-[#666662] font-light line-clamp-2 leading-snug">
                        {p.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {item.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-[#666662] bg-[#EAEAE4]/60 px-2 py-0.5 font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Column 3: Actions */}
            <div className="lg:w-44 shrink-0 flex flex-row lg:flex-col items-center lg:items-end justify-start gap-2.5 pt-2 lg:pt-0">
              <button
                onClick={() => setPreviewResume(item)}
                className="inline-flex items-center gap-1.5 text-xs text-[#666662] hover:text-[#1A1A1A] border border-[#E5E5DF] px-3 py-1.5 transition-colors bg-white/60 hover:bg-white w-full justify-center lg:justify-end"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview</span>
              </button>

              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#1A1A1A] hover:text-[#455A30] border border-[#E5E5DF] px-3 py-1.5 transition-colors bg-white/60 hover:bg-white w-full justify-center lg:justify-end"
              >
                <span>View PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={item.pdfUrl}
                download={item.downloadName}
                className="inline-flex items-center gap-1.5 text-xs text-[#F9F9F6] bg-[#1A1A1A] hover:bg-[#455A30] px-3 py-1.5 transition-colors w-full justify-center lg:justify-end font-light"
              >
                <span>Download</span>
                <Download className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* In-browser PDF Preview Modal */}
      {previewResume && (
        <Modal
          isOpen={!!previewResume}
          onClose={() => setPreviewResume(null)}
          title={previewResume.title}
          subtitle={previewResume.badge}
          maxWidth="4xl"
        >
          <div className="flex flex-col h-[75vh]">
            <div className="flex items-center justify-between py-2 border-b border-[#E5E5DF] text-xs text-[#666662] px-1">
              <span className="font-mono">{previewResume.fileName}</span>
              <div className="flex items-center gap-4">
                <a
                  href={previewResume.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#455A30] inline-flex items-center gap-1"
                >
                  <span>Open in Tab</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={previewResume.pdfUrl}
                  download={previewResume.downloadName}
                  className="hover:text-[#455A30] inline-flex items-center gap-1 font-medium text-[#1A1A1A]"
                >
                  <span>Download</span>
                  <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
            <div className="flex-1 w-full bg-[#F5F5F0] mt-2 rounded-xs overflow-hidden">
              <iframe
                src={previewResume.pdfUrl}
                className="w-full h-full border-0"
                title={`${previewResume.title} Preview`}
              />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
