export interface KnowledgeChunk {
  id: string;
  projectId?: string;
  projectTitle?: string;
  category: "Architecture" | "Case Study" | "Philosophy" | "Technical Specs" | "Contact" | "Education" | "Patent" | "Resume";
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "kb-railroute-1",
    projectId: "railroute-agent",
    projectTitle: "RailRoute Agent",
    category: "Case Study",
    title: "RailRoute Agent: 3-Agent Split-Journey Train Routing",
    keywords: ["railroute", "train", "agent", "multi-agent", "planner", "verifier", "ranker", "gemini", "streamlit", "python", "latency", "pass rate"],
    content:
      "RailRoute Agent is a specialized 3-agent autonomous routing system built by Arush Jain using Python, Gemini, and Streamlit (live at https://rail-route-finder.streamlit.app/, GitHub: https://github.com/Slash-495/Rail-Route-Finder). It discovers operationally safe split-journey train routes when direct tickets are waitlisted or unavailable. By executing a 3-agent (Planner/Verifier/Ranker) Gemini reflection system with parallel verification, it cut latency from 3.2s to 1.45s and raised the operational pass rate to 100%.",
  },
  {
    id: "kb-railroute-2",
    projectId: "railroute-agent",
    projectTitle: "RailRoute Agent",
    category: "Architecture",
    title: "RailRoute 3-Agent Triad & Safety Buffer Interlocks",
    keywords: ["railroute", "safety", "buffer", "layover", "planner", "verifier", "ranker", "handoff"],
    content:
      "Unlike monolithic LLMs that hallucinate impossible layovers or negative durations, RailRoute splits responsibilities: 1) Route Planner traverses station graphs for candidate junction transfers, 2) Schedule Verifier deterministically enforces a strict 45-minute to 180-minute platform transfer buffer, and 3) Journey Ranker evaluates comfort, cost, and transfer stress, guaranteeing zero missed connection risks.",
  },
  {
    id: "kb-chambers-1",
    projectId: "chambers-legal-rag",
    projectTitle: "Chambers & Infrastructure",
    category: "Case Study",
    title: "Chambers & Infrastructure: Hybrid Legal RAG for Indian GST Act",
    keywords: ["chambers", "legal", "rag", "gst", "faiss", "bm25", "cohere", "rerank", "fastapi", "aws", "precision", "hallucination"],
    content:
      "Chambers & Infrastructure (GST-RAG) is an enterprise legal RAG pipeline developed by Arush Jain over the Indian Goods & Services Tax (GST) Act (live at https://chambersandinfastructures.streamlit.app/, GitHub: https://github.com/Slash-495/GST-RAG). It uses a dual-stream hybrid retrieval pipeline combining dense semantic search (FAISS) with sparse statutory keyword search (BM25) fused via Reciprocal Rank Fusion (RRF) and scored with Cohere Cross-Encoder Rerank. It reduced legal hallucinations from 36.8% to 2.1% and achieved 94.2% Precision@4.",
  },
  {
    id: "kb-chambers-2",
    projectId: "chambers-legal-rag",
    projectTitle: "Chambers & Infrastructure",
    category: "Architecture",
    title: "Dual-Stream RRF & Cohere Cross-Encoder Reranking",
    keywords: ["chambers", "rrf", "cohere", "dense", "sparse", "dual-stream", "clause", "gst act"],
    content:
      "Naive semantic vectors often blur numerical statutory citations (like Section 16(2)(aa) vs Section 16(4)). Chambers & Infrastructure solves this with a dual-stream approach: BM25 guarantees exact legal clause and section number matches, FAISS captures conceptual context, RRF fuses the candidate lists, and Cohere Cross-Encoder reranks the top-50 down to the top-4 most authoritative statutory clauses.",
  },
  {
    id: "kb-roznamcha-1",
    projectId: "roznamcha",
    projectTitle: "Roznamcha",
    category: "Case Study",
    title: "Roznamcha: Customer Analytics & CRM Platform with Native PostgreSQL Logic",
    keywords: ["roznamcha", "crm", "customer analytics", "rfm", "ntile", "cohort", "retention", "postgres", "nextjs", "sql"],
    content:
      "Roznamcha is a modern Customer Analytics and CRM platform engineered by Arush Jain, live on Vercel at https://roznamcha-ivj4.vercel.app/ (GitHub: https://github.com/Slash-495/Roznamcha). Designed to demonstrate advanced SQL proficiency, all heavy mathematical scoring, NTILE(5) quintile customer segmentation, and time-series cohort retention matrices execute natively inside PostgreSQL database views rather than in client-side JavaScript, served to a responsive Next.js merchant dashboard with sub-45ms latency.",
  },
  {
    id: "kb-olist-1",
    projectId: "olist-analytics",
    projectTitle: "Olist E-Commerce Analytics Engine",
    category: "Case Study",
    title: "Olist E-Commerce Analytics Engine: Containerized ELT Data Warehouse",
    keywords: ["olist", "analytics", "data warehouse", "elt", "sql", "postgresql", "metabase", "bi", "docker", "logistics", "churn", "cltv"],
    content:
      "Olist Analytics Engine is an end-to-end Data Engineering & Warehouse Engine built by Arush Jain on 100,000+ real orders from the Kaggle Brazilian e-commerce dataset (GitHub: https://github.com/Slash-495/Olist-Analytics-Engine). It spins up a containerized PostgreSQL 15 warehouse via Docker Compose, automated ingestion pipelines, and a 4-layer ELT SQL model (raw_data -> staging -> intermediate -> marts) powering Metabase BI executive dashboards. It quantified that shipping delays drop review scores by 2.4 stars, causing an estimated R$ 1.73M in churned revenue.",
  },
  {
    id: "kb-optimetrics-1",
    projectId: "optimetrics",
    projectTitle: "OptiMetrics",
    category: "Case Study",
    title: "OptiMetrics: Statistical A/B Experimentation Engine & Novelty Decay Platform",
    keywords: ["optimetrics", "ab testing", "experimentation", "scipy", "statsmodels", "power bi", "dax", "srm", "sample ratio mismatch", "novelty decay", "statistics"],
    content:
      "OptiMetrics is a production-grade Python and Power BI statistical experimentation platform engineered by Arush Jain to detect hidden segment friction and prevent product rollout failures (GitHub: https://github.com/Slash-495/OptiMetrics). In a 50,000-user checkout redesign experiment showing a deceptive +47.96% aggregate lift, OptiMetrics detected an alarming -47.07% conversion crash on Mobile despite a +135.66% surge on Desktop, and quantified an 80.7% novelty decay in Week 2, projected to avoid $96,300 in lost mobile revenue per 50K users through a segmented rollout strategy.",
  },
  {
    id: "kb-conformal-1",
    projectId: "conformal-demand-forecasting",
    projectTitle: "Conformal Demand Forecasting",
    category: "Case Study",
    title: "Conformal Demand Forecasting: Probabilistic Supply Chain Engine",
    keywords: ["conformal", "demand", "forecasting", "lightgbm", "newsvendor", "fastapi", "docker", "stockout", "inventory", "inventory cost"],
    content:
      "Conformal Demand Forecasting is a probabilistic inventory forecasting engine engineered by Arush Jain using LightGBM, FastAPI, and Docker (GitHub: https://github.com/Slash-495/Conformal-Demand-Forecasting). By combining non-parametric Split Conformal Prediction intervals (90% coverage guarantee) with Newsvendor profit-maximization optimization, it cut retail stockout rates from 48% to 11% and reduced total inventory holding costs by 31% across 3,680 evaluated SKU items.",
  },
  {
    id: "kb-leetlens-1",
    projectId: "leetlens",
    projectTitle: "LeetLens",
    category: "Case Study",
    title: "LeetLens: AI LeetCode Coding Assistant & Execution Trace Visualizer",
    keywords: ["leetlens", "leetcode", "chrome extension", "byok", "solution review", "trace visualizer", "socratic", "complexity"],
    content:
      "LeetLens is a high-utility Chrome Extension engineered by Arush Jain that integrates directly into LeetCode (GitHub: https://github.com/Slash-495/LeetLens). Features include an automated Solution Review Engine for senior-level time/space complexity analysis, an interactive Execution Trace Visualizer for step-by-step recursion trees, intelligent brute-force vs. optimal code comparison (e.g. O(N²) vs O(N)), and 100% local Bring-Your-Own-Key (BYOK) encrypted storage.",
  },
  {
    id: "kb-duffy-1",
    projectId: "duffy",
    projectTitle: "Duffy",
    category: "Case Study",
    title: "Duffy: AI-Powered Real-Time Communication Platform with Whisper Live Transcription",
    keywords: ["duffy", "communication", "whisper", "live transcription", "webrtc", "rest api", "gemini", "gpt-4", "real-time"],
    content:
      "Duffy is an AI-powered real-time communication platform built by Arush Jain (GitHub: https://github.com/Slash-495/Duffy, deployed on Render: https://duffy.onrender.com/). It features responsive dashboards, reusable UI workflows, REST APIs, authentication systems, Gemini/GPT-4 integrations, and low-latency Whisper-based live voice transcription with modular frontend layouts.",
  },
  {
    id: "kb-velora-1",
    projectId: "velora",
    projectTitle: "Velora",
    category: "Case Study",
    title: "Velora: AI-Powered Resume Builder & ATS Job Optimization Platform",
    keywords: ["velora", "resume builder", "ats", "job tracker", "resume", "optimization", "nextjs", "tailwind", "ai resume", "vercel"],
    content:
      "Velora is an AI-powered resume builder and job tracking platform developed by Arush Jain (deployed on Vercel: https://velora-3jpcjj3y1-slashs-projects-1d391125.vercel.app/, GitHub: https://github.com/Slash-495/Velora). It generates ATS-friendly resumes, analyzes job descriptions, extracts missing skills, and provides personalized resume optimization suggestions alongside a centralized job application pipeline tracker.",
  },
  {
    id: "kb-two-tower-1",
    projectId: "two-tower-recommender",
    projectTitle: "Two-Tower Recommender",
    category: "Case Study",
    title: "Multimodal Two-Tower Product Recommender with Hard-Negative InfoNCE Sampling",
    keywords: ["two-tower", "recommender", "infonce", "hard negative", "faiss", "pytorch", "movielens", "candidate retrieval", "recall@10"],
    content:
      "The Multimodal Two-Tower Product Recommender is a candidate retrieval deep learning system engineered by Arush Jain in PyTorch and FAISS (GitHub: https://github.com/Slash-495). Implemented a hard-negative InfoNCE contrastive training loop benchmarked across 55K+ users and 20K+ candidate items on MovieLens, achieving a +4.2% Recall@10 lift over standard in-batch negative baselines across a controlled 6-model ablation study.",
  },
  {
    id: "kb-patent-1",
    category: "Patent",
    title: "Patent Application Published: Automatic Footrest Assembly for Two Wheeler (2025)",
    keywords: ["patent", "footrest", "two-wheeler", "sensor", "embedded", "pressure sensor", "202421034177", "indian patent office", "2025"],
    content:
      "Arush Jain has a published patent application (Indian Patent Application No. 202421034177, published 2025) for an Automatic Footrest Assembly for Two Wheeler. The invention is a sensor-based automation system using embedded controllers and pressure sensors, implementing hardware-software integration workflows with fail-safe operational logic.",
  },
  {
    id: "kb-achievements-1",
    category: "Philosophy",
    title: "Major Achievements, Honors & Distinctions",
    keywords: ["achievements", "honors", "distinctions", "awards", "amazon ml", "patent", "iiitdm", "leetcode", "open source"],
    content:
      "Arush Jain's major achievements include: 1) Amazon ML Summer School 2026 selected attendee (mentored by Amazon ML Scientists on LLMs and scalable systems), 2) Indian Patent Application No. 202421034177 published in 2025 for an Automatic Footrest Assembly for Two Wheeler (sensor-based with embedded controllers), 3) 400+ algorithmic problems solved across LeetCode & Codeforces, 4) Author of LeetLens open-source Chrome extension with AST recursion visualizers, and 5) Deployed engineering systems including Velora, Duffy, Roznamcha CRM, Olist Analytics Engine, OptiMetrics, Chambers GST-RAG, and RailRoute Agent.",
  },
  {
    id: "kb-education-1",
    category: "Education",
    title: "Education & Academic Standing at IIITDM Jabalpur",
    keywords: ["education", "college", "iiitdm", "jabalpur", "btech", "smart manufacturing", "university", "arush jain", "2027 grad", "2023", "2027"],
    content:
      "Arush Jain is a B.Tech student in Smart Manufacturing at IIITDM Jabalpur (2023 - 2027, 2027 Grad). His academic specialization spans AI systems, data analytics warehouses, multi-agent workflows, and advanced algorithmic data structures.",
  },
  {
    id: "kb-focus-1",
    category: "Technical Specs",
    title: "Core Engineering Focus Areas",
    keywords: ["focus", "core", "ai", "multi-agent", "analytics", "data warehouse", "full-stack", "data structures", "dsa", "algorithms"],
    content:
      "Arush Jain's primary engineering focus areas are: 1) Scalable AI Systems (fine-tuning, hybrid retrieval, dual-stream architectures), 2) Data Analytics Warehouses (PostgreSQL dimensional marts, ELT pipelines, A/B experimentation engines), 3) Multi-Agent Workflows (triad DAGs, deterministic verification), and 4) Full-Stack Applications (Next.js App Router, FastAPI, Docker).",
  },
  {
    id: "kb-about-personal-1",
    category: "Philosophy",
    title: "About Arush Jain: Engineering Journey, Side Quests & Interests",
    keywords: [
      "about",
      "bio",
      "who is arush",
      "journey",
      "f1",
      "mclaren",
      "liverpool",
      "strava",
      "running",
      "rock music",
      "ac/dc",
      "japanese",
      "philosophy",
      "side quests"
    ],
    content:
      "Arush Jain is an engineering student at IIITDM Jabalpur (2027 Grad) majoring in Smart Manufacturing, spending all his time architecting scalable AI systems, analytics warehouses, and full-stack applications. His path spans filing a patent application for a sensor-based safety footrest, engineering multi-agent LLM pipelines, probabilistic demand forecasting, and attending the Amazon ML Summer School. Offline, he stresses over McLaren's tire strategy in Formula 1, aggressively supports Liverpool FC, logs miles on Strava, geeks out over classic rock (AC/DC), and is learning Japanese (Rōmaji). His core belief: 'The best software comes from genuine curiosity and good taste, not just typing fast.'",
  },
  {
    id: "kb-resume-fullstack",
    category: "Resume",
    title: "Full-Stack Software Engineering Resume",
    keywords: ["resume", "cv", "fullstack", "full stack", "react", "nextjs", "node", "webrtc", "duffy", "leetlens", "velora", "download"],
    content:
      "The resume is specifically tailored for Full-Stack Software Engineering positions. It features Arush Jain's expertise in React, Next.js 14, TypeScript, Node.js, Express, WebRTC, Tailwind CSS, PostgreSQL, Prisma, and Docker. Highlighted projects include Duffy (AI-powered real-time communication platform with responsive dashboards and Whisper live transcription), LeetLens (interactive algorithm execution profiler & AST call tree visualizer), and Velora (AI-powered resume builder and ATS job optimization platform). Download or view directly at /resumes/arush_jain_fullstack.pdf.",
  },
  {
    id: "kb-resume-overview",
    category: "Resume",
    title: "Targeted Resumes Overview (Full Stack, AI Systems, Applied ML, Data Analytics)",
    keywords: ["resumes", "cv", "download", "ai systems", "machine learning", "data analytics", "tracks", "recruiter", "pdf", "fullstack"],
    content:
      "Arush Jain provides 4 specialized, single-page resumes tailored for distinct engineering tracks: 1) Full-Stack Software Engineering (React.js, Next.js, Node.js, Express, WebRTC, Duffy, LeetLens, Velora - /resumes/arush_jain_fullstack.pdf), 2) AI & LLM Systems Engineering (Python, Gemini API, Cohere Rerank, FAISS, BM25, FastAPI, RailRoute, Chambers GST-RAG - /resumes/arush_jain_ai_systems.pdf), 3) Machine Learning & Applied ML (Conformal Quantile Regression, PyTorch dual encoders, Newsvendor optimization, Automatic footrest assembly patent - /resumes/arush_jain_machine_learning.pdf), and 4) Data & Business Analytics (PostgreSQL 15 dimensional warehouse, Metabase BI, SciPy statistical A/B testing, Olist, OptiMetrics, Roznamcha - /resumes/arush_jain_data_analytics.pdf). All PDFs can be reviewed in the Resumes section (#resume) or downloaded directly.",
  },
  {
    id: "kb-contact-1",
    category: "Contact",
    title: "Contact Information & Developer Profiles",
    keywords: ["contact", "email", "github", "linkedin", "leetcode", "hire", "arush"],
    content:
      "Arush Jain can be reached via email at jainarush423@gmail.com. Check out his code repositories on GitHub at https://github.com/Slash-495, his LeetCode profile at https://leetcode.com/u/Slash495/, and his LinkedIn profile at https://www.linkedin.com/in/arushjain495.",
  },
];

export const SUGGESTED_PROMPTS = [
  "Which resume should I look at for Full-Stack or AI roles?",
  "Explain the dual-stream retrieval in Chambers & Infrastructure (GST-RAG).",
  "How does RailRoute Agent achieve a 100% operational pass rate?",
  "Tell me about Roznamcha's PostgreSQL RFM segmentation and cohort retention.",
  "How does OptiMetrics detect hidden mobile conversion crashes in A/B tests?",
  "What insights were uncovered by the Olist Analytics Engine?",
  "Who is Arush Jain and what are his interests outside of coding?",
];
