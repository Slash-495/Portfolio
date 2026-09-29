export interface KnowledgeChunk {
  id: string;
  projectId?: string;
  projectTitle?: string;
  category: "Architecture" | "Case Study" | "Philosophy" | "Technical Specs" | "Contact" | "Education" | "Patent";
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
      "RailRoute Agent is a specialized 3-agent autonomous routing system built by Arush Jain using Python, Gemini, and Streamlit (live at https://rail-route-finder.streamlit.app/, GitHub: https://github.com/Slash-495/Rail-Route-Finder). It discovers operationally safe split-journey train routes when direct tickets are waitlisted or unavailable. By executing a triad DAG (Route Planner -> Schedule Verifier -> Journey Ranker) with parallel verification, it cut latency from 3.2s to 1.45s and raised the operational pass rate to 100%.",
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
    id: "kb-conformal-1",
    projectId: "conformal-demand-forecasting",
    projectTitle: "Conformal Demand Forecasting",
    category: "Case Study",
    title: "Conformal Demand Forecasting: Probabilistic Supply Chain Engine",
    keywords: ["conformal", "demand", "forecasting", "lightgbm", "newsvendor", "fastapi", "docker", "stockout", "inventory", "inventory cost"],
    content:
      "Conformal Demand Forecasting is a probabilistic inventory forecasting engine engineered by Arush Jain using LightGBM, FastAPI, and Docker. By combining non-parametric Split Conformal Prediction intervals (90% coverage guarantee) with Newsvendor profit-maximization optimization, it cut retail stockout rates from 48% to 11% and reduced total inventory holding costs by 31%.",
  },
  {
    id: "kb-conformal-2",
    projectId: "conformal-demand-forecasting",
    projectTitle: "Conformal Demand Forecasting",
    category: "Architecture",
    title: "Newsvendor Critical Fractile & Asymmetric Risk Mapping",
    keywords: ["conformal", "newsvendor", "critical ratio", "underage", "overage", "stockout", "safety stock"],
    content:
      "Standard MSE regressions predict expected average demand, which fails when underage costs (lost customer margin) and overage costs (spoilage/holding expense) are asymmetric. Arush's system calculates the Newsvendor critical ratio Cu / (Cu + Co) and maps it across the conformalized prediction interval to determine the exact profit-maximizing order quantity in real-time.",
  },
  {
    id: "kb-two-tower-1",
    projectId: "two-tower-recommender",
    projectTitle: "Multimodal Two-Tower Recommender",
    category: "Case Study",
    title: "Multimodal Two-Tower Recommender: Dual-Encoder InfoNCE Retrieval",
    keywords: ["recommender", "two-tower", "infonce", "pytorch", "faiss", "contrastive", "recall", "dual-encoder"],
    content:
      "Multimodal Two-Tower Recommender is a deep learning dual-encoder candidate generation model trained by Arush Jain in PyTorch with FAISS vector retrieval. Using InfoNCE contrastive loss and in-batch negative sampling, it aligns 128-dimensional user context and item embeddings, driving a +4.2% lift in Recall@10 and a +3.6% lift in Recall@50 over matrix factorization with sub-2.4ms retrieval latency across 1M+ catalog items.",
  },
  {
    id: "kb-leetlens-1",
    projectId: "leetlens",
    projectTitle: "LeetLens",
    category: "Case Study",
    title: "LeetLens: AI LeetCode Coding Assistant & Execution Trace Visualizer",
    keywords: ["leetlens", "leetcode", "chrome extension", "byok", "solution review", "trace visualizer", "socratic", "complexity"],
    content:
      "LeetLens is a high-utility Chrome Extension engineered by Arush Jain that integrates directly into LeetCode. Features include an automated Solution Review Engine for senior-level time/space complexity analysis, an interactive Execution Trace Visualizer for step-by-step recursion trees, intelligent brute-force vs. optimal code comparison (e.g. O(N²) vs O(N)), and 100% local Bring-Your-Own-Key (BYOK) encrypted storage.",
  },
  {
    id: "kb-duffy-1",
    projectId: "duffy",
    projectTitle: "Duffy",
    category: "Case Study",
    title: "Duffy: AI Language Learning Ecosystem with In-Browser Voice AI",
    keywords: ["duffy", "language", "spaced repetition", "srs", "web speech", "voice", "gemini", "render", "duffy.onrender.com"],
    content:
      "Duffy is an AI-powered full-stack language immersion platform built by Arush Jain, live at duffy.onrender.com. It combines an intelligent Spaced Repetition System (SRS) for custom flashcard decks, free in-browser neural voice recognition via the Web Speech API (<150ms latency) with dynamic pronunciation grading, Gemini-powered adaptive scenario roleplay (cafes, immigration), and B2B classroom roster tools for teachers.",
  },
  {
    id: "kb-velora-1",
    projectId: "velora",
    projectTitle: "Velora",
    category: "Case Study",
    title: "Velora: Modern Full-Stack Cloud Application & Low-Latency APIs",
    keywords: ["velora", "full-stack", "nextjs", "typescript", "postgres", "prisma", "zod", "server actions", "reactive", "latency"],
    content:
      "Velora is a high-concurrency full-stack cloud web application engineered by Arush Jain using Next.js App Router, TypeScript, and PostgreSQL with Prisma (live at https://velora-3jpcjj3y1-slashs-projects-1d391125.vercel.app/, GitHub: https://github.com/Slash-495/Velora). It delivers sub-45ms API response latencies, 100% end-to-end type safety via shared Zod schemas and Server Actions, and instant 0ms optimistic UI rendering with zero layout shift.",
  },
  {
    id: "kb-patent-1",
    category: "Patent",
    title: "Patented Centrifugal Speed Interlock Footrest & Amazon ML Summer School 2026",
    keywords: ["patent", "footrest", "two-wheeler", "embedded", "interlock", "amazon ml", "amazon", "achievement", "honors", "202421034177"],
    content:
      "Arush Jain holds a patent application (Application No. 202421034177) for a novel Centrifugal Speed Interlock Footrest Mechanism for Two-Wheelers that locks footrest actuation when speed exceeds 5 km/h, preventing pillion foot entrapment and road contact injuries. Furthermore, Arush was selected for the prestigious Amazon ML Summer School 2026, receiving specialized mentorship from Amazon scientists in deep learning, LLMs, and large-scale AI architectures.",
  },
  {
    id: "kb-achievements-1",
    category: "Philosophy",
    title: "Major Achievements, Honors & Distinctions",
    keywords: ["achievements", "honors", "distinctions", "awards", "amazon ml", "patent", "iiitdm", "leetcode", "open source"],
    content:
      "Arush Jain's major achievements and honors include: 1) Amazon ML Summer School 2026 selection (mentored by Amazon ML Scientists on LLMs and scalable systems), 2) Indian Patent Application No. 202421034177 for a novel Centrifugal Speed Interlock Footrest Mechanism, 3) 400+ problems solved across LeetCode & Codeforces, 4) Author of LeetLens open-source Chrome extension with AST recursion visualizers, and 5) 4 shipped production web deployments (Duffy, GST-RAG, RailRoute Finder, Velora).",
  },
  {
    id: "kb-education-1",
    category: "Education",
    title: "Education & Academic Standing at IIITDM Jabalpur",
    keywords: ["education", "college", "iiitdm", "jabalpur", "btech", "smart manufacturing", "university", "arush jain", "final year", "2023"],
    content:
      "Arush Jain is a Final Year B.Tech student in Smart Manufacturing at IIITDM Jabalpur (2023 - Present). His academic specialization spans AI automation, multi-agent workflows, scalable distributed computing, and advanced algorithmic data structures.",
  },
  {
    id: "kb-focus-1",
    category: "Technical Specs",
    title: "Core Engineering Focus Areas",
    keywords: ["focus", "core", "ai", "multi-agent", "workflows", "full-stack", "data structures", "dsa", "algorithms"],
    content:
      "Arush Jain's primary engineering focus is: 1) Scalable AI Systems (fine-tuning, hybrid retrieval, dual-stream architectures), 2) Multi-Agent Workflows (triad DAGs, deterministic verification, Pareto ranking), 3) Full-Stack Applications (Next.js App Router, FastAPI, WebRTC, Docker), and 4) Algorithmic Data Structures (FAISS vector indices, lock-free buffers, complexity optimization).",
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
      "Arush Jain is a final-year engineering student at IIITDM Jabalpur majoring in Smart Manufacturing, spending all his time architecting scalable AI systems and full-stack applications. His path spans designing a patented automated footrest for two-wheelers, engineering multi-agent LLM pipelines, probabilistic demand forecasting, and attending the Amazon ML Summer School. Offline, he stresses over McLaren's tire strategy in Formula 1, aggressively supports Liverpool FC, logs miles on Strava, geeks out over classic rock (AC/DC), and is learning Japanese (Rōmaji). His core belief: 'The best software comes from genuine curiosity and good taste, not just typing fast.'",
  },
  {
    id: "kb-contact-1",
    category: "Contact",
    title: "Contact Information & Developer Profiles",
    keywords: ["contact", "email", "phone", "github", "linkedin", "leetcode", "hire", "arush"],
    content:
      "Arush Jain can be reached via email at jainarush423@gmail.com or phone at +91 91713 56822. Check out his code repositories on GitHub at https://github.com/Slash-495, along with his LinkedIn and LeetCode profiles.",
  },
];

export const SUGGESTED_PROMPTS = [
  "How does LeetLens provide code reviews without leaking API keys?",
  "Tell me about Duffy's in-browser voice recognition and SRS ecosystem.",
  "What is Velora's full-stack architecture and sub-45ms latency?",
  "How does RailRoute Agent achieve a 100% operational pass rate?",
  "Explain the dual-stream retrieval in Chambers & Infrastructure (GST-RAG).",
  "What are Arush's major achievements, patent, and Amazon ML Summer School selection?",
  "Who is Arush Jain and what are his interests outside of coding?",
];
