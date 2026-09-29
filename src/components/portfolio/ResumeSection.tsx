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
      "Engineered for roles focusing on modern web architecture, distributed client state, WebRTC real-time streaming, and responsive microservices.",
    keyProjects: [
      {
        name: "Duffy",
        detail: "AI-powered real-time communication platform with responsive dashboards and Whisper live transcription.",
      },
      {
        name: "LeetLens",
        detail: "Interactive coding assistant Chrome extension with multi-level hints, AST call tree visualizer & BYOK.",
      },
      {
        name: "Velora",
        detail: "AI-powered resume builder and job tracking platform with ATS optimization suggestions (under development).",
      },
    ],
    skills: [
      "JavaScript",
      "TypeScript",
      "React.js",
      "Next.js 14",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "WebRTC",
      "PostgreSQL",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_fullstack.pdf",
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
      "Engineered for roles building agentic workflows, deterministic verification gates, dual-stream hybrid search (dense + sparse), and RAG pipelines.",
    keyProjects: [
      {
        name: "RailRoute Agent",
        detail: "3-agent Gemini reflection system cutting latency 2.2x and raising operational pass rate to 100% (n=12 test scenarios).",
      },
      {
        name: "Chambers & Infrastructure",
        detail: "Dual-stream FAISS + BM25 hybrid legal RAG with Cohere reranking, achieving 94.2% Precision@4 (20-question statutory benchmark).",
      },
      {
        name: "Two-Tower Recommender",
        detail: "PyTorch dual-encoder candidate retrieval with hard-negative InfoNCE contrastive training (+4.2% Recall@10 over baseline).",
      },
    ],
    skills: [
      "Python 3.11+",
      "Google Gemini API",
      "FastAPI",
      "FAISS",
      "BM25",
      "Cohere Rerank",
      "Streamlit",
      "Docker",
      "AWS (S3, Textract)",
    ],
    pdfUrl: "/resumes/arush_jain_ai_systems.pdf",
    downloadName: "Arush_Jain_AI_Systems_Resume.pdf",
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
        detail: "LightGBM + CQR 90% prediction intervals mapped to Newsvendor, cutting stockout rate from 48% to 11% (3,680 test items).",
      },
      {
        name: "Two-Tower Product Recommender",
        detail: "PyTorch dual-encoder candidate retrieval with hard-negative InfoNCE sampling (+4.2% Recall@10, 55K+ users / 20K+ items).",
      },
      {
        name: "Automatic Footrest Assembly",
        detail: "Sensor-based automation system using embedded controllers and pressure sensors (Patent Application Published 2025).",
      },
    ],
    skills: [
      "PyTorch",
      "LightGBM",
      "scikit-learn",
      "FAISS",
      "NumPy",
      "Pandas",
      "Conformal Prediction",
      "FastAPI",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_machine_learning.pdf",
    downloadName: "Arush_Jain_Machine_Learning_Resume.pdf",
    fileName: "arush_jain_machine_learning.pdf",
  },
  {
    id: "data-analytics",
    title: "Data & Business Analytics",
    badge: "Analytics Track • Warehousing & BI",
    isPrimary: false,
    roleNote: "Financial Operations & SQL Warehousing",
    description:
      "Engineered for analytics engineering and quantitative operations involving ELT SQL transformations, Metabase dashboards, inventory models, and A/B testing.",
    keyProjects: [
      {
        name: "Conformal Inventory Optimization",
        detail: "Mapped calibrated intervals to Newsvendor cost optimization, cutting holding cost by 31% across 3,680 test items.",
      },
      {
        name: "OptiMetrics",
        detail: "Audited checkout A/B test detecting -47.07% mobile collapse, projected to avoid $96,300 in lost revenue per 50K users.",
      },
      {
        name: "Olist Analytics Engine",
        detail: "4-layer ELT SQL warehouse (100K+ transaction records), quantifying R$ 1.73M logistics delay opportunity.",
      },
    ],
    skills: [
      "PostgreSQL 15",
      "SQL (CTEs, Window Functions)",
      "Metabase",
      "Python (Pandas, SciPy)",
      "Power BI (DAX)",
      "Docker",
    ],
    pdfUrl: "/resumes/arush_jain_data_analytics.pdf",
    downloadName: "Arush_Jain_Data_Analytics_Resume.pdf",
    fileName: "arush_jain_data_analytics.pdf",
  },
];

export function ResumeSection() {
  const [previewResume, setPreviewResume] = React.useState<ResumeItem | null>(null);

  return (
    <section id="resume" className="scroll-mt-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[#E5E5DF] pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
            Credentials // 05
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
            Curated Resumes
          </h2>
          <p className="text-sm text-[#8C8C85] max-w-md pt-1">
            Role-tailored single-page CVs emphasizing specialized engineering capabilities. Download the primary full-stack profile or review specialized domain tracks below.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-3">
          <a
            href="/resumes/arush_jain_fullstack.pdf"
            download="Arush_Jain_FullStack_Resume.pdf"
            className="px-4 py-2 bg-[#1A1A1A] text-[#F9F9F6] hover:bg-[#455A30] transition-colors text-xs font-normal inline-flex items-center gap-2"
          >
            <span>Download Primary Resume (Full Stack) ↓</span>
          </a>
        </div>
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
