export interface KnowledgeChunk {
  id: string;
  projectId?: string;
  projectTitle?: string;
  category: "Architecture" | "Case Study" | "Philosophy" | "Technical Specs" | "Contact";
  title: string;
  keywords: string[];
  content: string;
}

export const KNOWLEDGE_BASE: KnowledgeChunk[] = [
  {
    id: "kb-chronos-1",
    projectId: "chronos-engine",
    projectTitle: "Chronos Engine",
    category: "Case Study",
    title: "Chronos Engine Architecture & Throughput Optimization",
    keywords: ["chronos", "rust", "wasm", "webgl", "throughput", "latency", "ring buffer", "sharedarraybuffer", "1.2m"],
    content:
      "Chronos Engine is a sub-millisecond distributed state machine visualizer and event streaming runtime. It achieves 1.2M events/sec in browser tabs by combining Rust compiled to WebAssembly with SharedArrayBuffer ring buffers and an offscreen WebGL canvas. It eliminates main-thread UI stutter by bypassing JavaScript garbage collection entirely, maintaining rock-solid 60 FPS and sub-0.8ms p99 dispatch latency.",
  },
  {
    id: "kb-chronos-2",
    projectId: "chronos-engine",
    projectTitle: "Chronos Engine",
    category: "Architecture",
    title: "Lock-Free Ring Buffer Ingestion in Rust/WASM",
    keywords: ["chronos", "lock-free", "ring buffer", "atomics", "memory", "zero-copy", "garbage collection"],
    content:
      "To eliminate garbage collection pauses, Chronos pre-allocates a circular ring buffer inside a SharedArrayBuffer. Incoming binary Protobuf WebSocket packets are unpacked into fixed memory slices in 0.04ms using atomic pointer operations (acquire/release memory ordering). WebGL shaders sample the memory offsets directly with zero CPU copy overhead.",
  },
  {
    id: "kb-nexus-1",
    projectId: "nexus-graph",
    projectTitle: "Nexus Graph",
    category: "Case Study",
    title: "Nexus Graph Multi-Agent Cognitive Orchestrator",
    keywords: ["nexus", "rag", "agents", "dag", "tokens", "hnsw", "pgvector", "orchestrator", "ai"],
    content:
      "Nexus Graph is an enterprise cognitive graph orchestrator executing multi-agent LLM workflows as deterministic directed acyclic graphs (DAGs). It solves the common problems of stochastic loops and runaway token costs by introducing local HNSW vector cosine similarity routing (135ms lookup) and context window compression, slashing overall token consumption by 68% while achieving a 99.4% task completion rate.",
  },
  {
    id: "kb-nexus-2",
    projectId: "nexus-graph",
    projectTitle: "Nexus Graph",
    category: "Architecture",
    title: "Deterministic DAG Execution vs Autonomous Loops",
    keywords: ["nexus", "dag", "react loop", "deterministic", "topological sort", "checkpoint", "rollback"],
    content:
      "Rather than letting LLMs decide unconstrained execution loops (which cause infinite loops and hallucination cascades), Nexus Graph compiles workflows into topologically sorted DAGs with isolated memory namespaces. If an agent validation fails, automated fallback branches self-heal the workflow with full transactional state checkpoints and replayability.",
  },
  {
    id: "kb-hyperfluid-1",
    projectId: "hyperfluid",
    projectTitle: "HyperFluid",
    category: "Case Study",
    title: "HyperFluid GPU-Accelerated Micro-Interaction Runtime",
    keywords: ["hyperfluid", "webgl", "spring", "physics", "120 fps", "css", "layout thrashing", "shaders"],
    content:
      "HyperFluid is a zero-runtime CSS and physics micro-interaction engine combining custom WebGL fragment shaders and analytical spring math. It locks animations to 120 FPS on high-refresh ProMotion screens with a tiny 1.4kB gzip bundle footprint, eliminating 100% of DOM layout thrashing by calculating second-order spring dynamics analytically in O(1) time.",
  },
  {
    id: "kb-hyperfluid-2",
    projectId: "hyperfluid",
    projectTitle: "HyperFluid",
    category: "Architecture",
    title: "Analytical Closed-Form Spring Math",
    keywords: ["hyperfluid", "analytical", "spring", "differential equation", "frame-rate independent", "euler"],
    content:
      "Unlike conventional physics libraries that rely on iterative Euler integration (which drifts across varied frame rates), HyperFluid solves the damped harmonic oscillator analytically in closed form. This allows instantaneous evaluation at any arbitrary timestamp t, ensuring identical spring tactile responsiveness whether the user display runs at 60Hz, 90Hz, or 120Hz.",
  },
  {
    id: "kb-sentient-1",
    projectId: "sentient-core",
    projectTitle: "Sentient Core",
    category: "Case Study",
    title: "Sentient Core Edge Caching Proxy & Origin Shield",
    keywords: ["sentient", "edge", "caching", "rust", "ebpf", "single-flight", "stampede", "p99", "redis"],
    content:
      "Sentient Core is a distributed Rust edge proxy serving 250k req/sec with <3.2ms p99 latency. It protects origin databases during extreme traffic surges and flash sales by implementing single-flight request coalescing, counting Bloom filters for zero-IO key verification, and adaptive rate limiting governed by kernel-level eBPF packet inspection.",
  },
  {
    id: "kb-sentient-2",
    projectId: "sentient-core",
    projectTitle: "Sentient Core",
    category: "Architecture",
    title: "Single-Flight Request Coalescing Mechanism",
    keywords: ["sentient", "single-flight", "stampede", "dog-piling", "mutex", "tokio", "async", "channels"],
    content:
      "When 5,000 concurrent requests arrive for an expired cache key, Sentient Core collapses them into a single flight. The first request locks an async NotifyBarrier and performs the origin fetch, while the other 4,999 requests subscribe to the broadcast result in memory. This eliminates 99.4% of backend origin spikes without dropping connections.",
  },
  {
    id: "kb-philosophy-1",
    category: "Philosophy",
    title: "Engineering Philosophy & Focus on High-Impact Deliverables",
    keywords: ["philosophy", "past clients", "years of experience", "approach", "craft", "systems", "arush"],
    content:
      "Arush Jain's portfolio intentionally omits generic 'past clients' logo walls and 'years of experience' counters. True engineering mastery is demonstrated through tangible deliverables, architectural rigor, verified performance benchmarks, and production-grade code. The focus is strictly on scalable AI systems, multi-agent architectures, and algorithmic excellence.",
  },
  {
    id: "kb-education-1",
    category: "Education",
    title: "Academic Background at IIITDM Jabalpur",
    keywords: ["education", "college", "iiitdm", "jabalpur", "btech", "smart manufacturing", "university", "arush", "degree"],
    content:
      "Arush Jain is pursuing his B.Tech in Smart Manufacturing at IIITDM Jabalpur (2023 - Present). His studies combine intelligent computational systems, automation technologies, advanced mathematical modeling, and distributed software engineering.",
  },
  {
    id: "kb-focus-1",
    category: "Technical Specs",
    title: "Core Engineering Focus Areas",
    keywords: ["focus", "core", "ai", "multi-agent", "workflows", "full-stack", "data structures", "dsa", "algorithms"],
    content:
      "Arush Jain's primary engineering pillars are: 1) Scalable AI Systems (fine-tuning, vector embeddings, high-throughput model serving), 2) Multi-Agent Workflows (deterministic DAG orchestration, autonomous agent communication, fallback recovery), 3) Modern Full-Stack Applications (Next.js App Router, TypeScript, Tailwind CSS, reactive state), and 4) Data Structures & Algorithms (optimal time/space complexity, graph traversal, memory-efficient data buffers).",
  },
  {
    id: "kb-specs-1",
    category: "Technical Specs",
    title: "Core Technology Stack & System Capabilities",
    keywords: ["stack", "tech", "nextjs", "react", "typescript", "rust", "tailwind", "redis", "pgvector", "python"],
    content:
      "Arush's primary engineering stack includes Next.js 14 (App Router), React 18/19, TypeScript, Python, Rust, WebAssembly, PGVector, Redis, Docker, and Tailwind CSS. System design emphasizes deterministic multi-agent graphs, sub-millisecond edge pipelines, and data-structure efficiency.",
  },
  {
    id: "kb-contact-1",
    category: "Contact",
    title: "Contact Information & Developer Profiles",
    keywords: ["hire", "availability", "contact", "email", "phone", "github", "linkedin", "leetcode", "arush jain"],
    content:
      "Arush Jain is open to high-impact software engineering, AI systems, and full-stack development roles. Reach him via email at jainarush423@gmail.com or phone at +91 91713 56822. Explore his GitHub repositories at https://github.com/Slash-495, along with his LinkedIn and LeetCode profiles.",
  },
];

export const SUGGESTED_PROMPTS = [
  "Tell me about Arush Jain's education and background at IIITDM Jabalpur.",
  "What is Arush's core focus across AI systems and data structures?",
  "How did Arush optimize Chronos Engine to handle 1.2M events/sec?",
  "Explain the deterministic multi-agent DAG architecture in Nexus Graph.",
  "How can I get in touch with Arush Jain?",
  "What technologies are in Arush's primary engineering stack?",
];

