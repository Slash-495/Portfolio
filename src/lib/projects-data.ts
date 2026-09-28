export interface CaseStudyMetric {
  label: string;
  value: string;
  change?: string;
  description: string;
}

export interface ArchitectureNode {
  id: string;
  title: string;
  type: "input" | "process" | "storage" | "output";
  description: string;
  tech: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Distributed Systems" | "AI & RAG" | "Design Systems" | "Edge Infrastructure";
  status: "PRODUCTION" | "BETA" | "OPEN SOURCE";
  year: string;
  githubUrl?: string;
  liveUrl?: string;
  summary: string;
  primaryMetric: {
    label: string;
    value: string;
  };
  metrics: CaseStudyMetric[];
  techStack: string[];
  problem: {
    context: string;
    painPoints: string[];
    constraints: string[];
  };
  solution: {
    overview: string;
    architectureHighlights: string[];
    tradeOffs: {
      choice: string;
      alternative: string;
      reason: string;
    }[];
  };
  architecture: {
    diagramDescription: string;
    nodes: ArchitectureNode[];
    dataFlowSteps: string[];
  };
  codeHighlights: {
    title: string;
    language: string;
    code: string;
    explanation: string;
  }[];
  interactiveDemoType: "event-streamer" | "vector-graph" | "spring-physics" | "cache-simulator";
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "chronos-engine",
    slug: "chronos-engine",
    title: "Chronos Engine",
    tagline: "Sub-millisecond distributed state machine visualizer & event streaming runtime",
    category: "Distributed Systems",
    status: "OPEN SOURCE",
    year: "2025",
    githubUrl: "https://github.com",
    liveUrl: "https://chronos-engine.dev",
    summary:
      "Engineered an ultra-low latency event streaming engine handling 1.2M events/sec inside modern browsers using Rust compiled to WebAssembly, SharedArrayBuffer ring buffers, and an offscreen WebGL canvas.",
    primaryMetric: {
      label: "Throughput",
      value: "1.2M events/sec",
    },
    metrics: [
      {
        label: "Throughput",
        value: "1.2M/s",
        change: "+840%",
        description: "Zero-copy event dispatching via shared memory buffers",
      },
      {
        label: "p99 Dispatch Latency",
        value: "0.78ms",
        change: "-91%",
        description: "Bypasses main-thread JavaScript garbage collection",
      },
      {
        label: "Rendering Frame Rate",
        value: "60 FPS",
        change: "Rock solid",
        description: "OffscreenCanvas with custom fragment shaders",
      },
      {
        label: "Memory Footprint",
        value: "14.2 MB",
        change: "-74%",
        description: "Fixed ring buffer allocations without heap thrash",
      },
    ],
    techStack: ["Rust", "WebAssembly", "TypeScript", "WebGL", "SharedArrayBuffer", "Next.js"],
    problem: {
      context:
        "High-frequency telemetry dashboards frequently freeze browser tabs because serializing JSON over WebSockets triggers severe garbage collection pauses and main-thread blocking when event rates exceed 25,000 events/second.",
      painPoints: [
        "Main thread UI stutter during high telemetry bursts",
        "GC pauses exceeding 120ms during object allocation spikes",
        "DOM-based and SVG graph visualizers choking beyond 5,000 nodes",
      ],
      constraints: [
        "Must run entirely client-side without proprietary browser plugins",
        "Strict 16ms budget per frame to preserve 60Hz/120Hz display refresh",
        "Bidirectional state sync across multiple isolated tabs",
      ],
    },
    solution: {
      overview:
        "Designed a dual-tier architecture: background Web Workers execute a Rust-compiled WASM state machine that consumes raw binary Protobuf streams into a ring buffer. High-speed offscreen WebGL shaders sample the ring buffer directly for zero-copy rendering.",
      architectureHighlights: [
        "Binary WebSocket streaming over zero-copy Protobuf encoding",
        "Pre-allocated circular ring buffer in SharedArrayBuffer to eliminate GC pauses",
        "OffscreenCanvas rendering driven by requestAnimationFrame in dedicated worker",
        "Deterministic replay capability with microsecond timestamp indexing",
      ],
      tradeOffs: [
        {
          choice: "SharedArrayBuffer with Atomics",
          alternative: "PostMessage object copying",
          reason: "Eliminates serialization overhead; provides instantaneous data access between worker threads.",
        },
        {
          choice: "Rust/WASM Core",
          alternative: "Pure JavaScript Web Worker",
          reason: "Zero unpredictable garbage collection pauses and predictable microsecond-level state transitions.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Zero-copy data pipeline from network socket to GPU frame buffer",
      nodes: [
        {
          id: "ingest",
          title: "Ingestion Socket",
          type: "input",
          description: "Binary WebSocket stream consuming compacted Protobuf payloads",
          tech: "Protobuf / WS",
        },
        {
          id: "wasm-worker",
          title: "Rust WASM Worker",
          type: "process",
          description: "Decodes frames, validates transitions, computes state graph",
          tech: "Rust / WASM",
        },
        {
          id: "ring-buffer",
          title: "Shared Memory Buffer",
          type: "storage",
          description: "Lock-free circular ring buffer with atomic cursor synchronization",
          tech: "SharedArrayBuffer",
        },
        {
          id: "gpu-render",
          title: "Offscreen WebGL",
          type: "output",
          description: "Samples memory offsets into instanced vertex buffers for 60fps draw calls",
          tech: "WebGL / GLSL",
        },
      ],
      dataFlowSteps: [
        "Ingest compacted binary packets directly via arraybuffer WebSocket listener",
        "WASM worker unpacks telemetry bytes into fixed memory slices in 0.04ms",
        "Atomic pointer update notifies rendering worker without thread mutex lock",
        "WebGL shader translates active nodes directly to screen coordinates with zero CPU copy",
      ],
    },
    codeHighlights: [
      {
        title: "Lock-Free Ring Buffer Ingestion (Rust / WASM)",
        language: "rust",
        code: `#[inline(always)]
pub fn push_event(&mut self, event_id: u32, payload: &[u8]) -> Result<(), BufferError> {
    let head = self.head.load(Ordering::Acquire);
    let tail = self.tail.load(Ordering::Relaxed);
    
    // Check if buffer capacity would overflow
    if (head.wrapping_sub(tail)) >= self.capacity {
        return Err(BufferError::Overflow);
    }
    
    let index = (head & self.mask) as usize;
    unsafe {
        let slot = self.buffer.get_unchecked_mut(index);
        slot.event_id = event_id;
        slot.timestamp = js_sys::Date::now();
        std::ptr::copy_nonoverlapping(payload.as_ptr(), slot.data.as_mut_ptr(), payload.len());
    }
    
    self.head.store(head.wrapping_add(1), Ordering::Release);
    Ok(())
}`,
        explanation:
          "Uses atomic acquire/release memory semantics with mask-based fast modulo index computation, ensuring deterministic sub-microsecond enqueue operations without mutex contention.",
      },
    ],
    interactiveDemoType: "event-streamer",
  },
  {
    id: "nexus-graph",
    slug: "nexus-graph",
    title: "Nexus Graph",
    tagline: "Deterministic multi-agent cognitive orchestrator & vector knowledge router",
    category: "AI & RAG",
    status: "PRODUCTION",
    year: "2025",
    githubUrl: "https://github.com",
    liveUrl: "https://nexus-graph.ai",
    summary:
      "Architected an enterprise cognitive graph orchestrator executing multi-agent LLM workflows as deterministic directed acyclic graphs (DAGs) with semantic vector routing and 68% token reduction.",
    primaryMetric: {
      label: "Token Optimization",
      value: "68% reduction",
    },
    metrics: [
      {
        label: "Token Consumption",
        value: "-68%",
        change: "Cost savings",
        description: "Vector deduplication and contextual window compression",
      },
      {
        label: "Semantic Routing",
        value: "135ms",
        change: "-62%",
        description: "Local HNSW cosine index vs sequential prompt classifiers",
      },
      {
        label: "Task Completion",
        value: "99.4%",
        change: "+14.2%",
        description: "Deterministic graph checkpoints with automated fallback branches",
      },
      {
        label: "Concurrent Graphs",
        value: "4,500/s",
        change: "Scalable",
        description: "Lightweight async state engine with transactional rollback",
      },
    ],
    techStack: ["TypeScript", "Next.js", "Python", "PGVector", "OpenAI / Anthropic", "FastAPI", "Redis"],
    problem: {
      context:
        "Autonomous agent workflows typically suffer from compounding hallucinations, unpredictable loops, excessive token burn, and multi-second routing latency when chaining unstructured LLM prompts.",
      painPoints: [
        "Uncontrollable costs from feeding entire chat histories to every agent",
        "Stochastic loop failures when LLMs decide their own next execution steps",
        "Lack of observability and deterministic rollbacks when tools fail",
      ],
      constraints: [
        "Sub-200ms routing decision latency for conversational flows",
        "Strict data isolation and zero leakage between agent context windows",
        "Full replayability for SOC2 compliance and regression auditing",
      ],
    },
    solution: {
      overview:
        "Replaced unstructured prompt chaining with a typed DAG compiler. In incoming queries, a high-dimensional vector routing layer computes semantic similarity against agent schemas in 135ms, feeding only the required context slices into fine-tuned specialist agents.",
      architectureHighlights: [
        "Topologically sorted DAG runner with isolated memory namespaces",
        "HNSW vector search over dynamic agent skill specifications",
        "Streaming token cache with semantic chunk deduplication",
        "Self-healing fallback pathways when agent validation schemas fail",
      ],
      tradeOffs: [
        {
          choice: "Deterministic DAG with Semantic Vector Routers",
          alternative: "Autonomous ReAct Loop",
          reason: "Ensures bounded execution depth, eliminates infinite loops, and slashes token bills by 68%.",
        },
        {
          choice: "Local Vector Indexing (HNSW)",
          alternative: "LLM Classification Calls",
          reason: "Reduced routing latency from ~1,800ms down to 135ms while saving $0.02 per query.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Semantic Vector Gateway & Topological Agent Pipeline",
      nodes: [
        {
          id: "prompt-ingress",
          title: "Prompt Ingress",
          type: "input",
          description: "Sanitizes user query and generates 1536-dim embedding vector",
          tech: "OpenAI Embeddings",
        },
        {
          id: "vector-router",
          title: "Semantic Vector Router",
          type: "process",
          description: "Matches user intent to agent capabilities using cosine similarity threshold > 0.82",
          tech: "PGVector / HNSW",
        },
        {
          id: "dag-orchestrator",
          title: "DAG Orchestrator",
          type: "storage",
          description: "Compiles dependency graph, manages checkpoint state, and executes parallel steps",
          tech: "TypeScript / Redis",
        },
        {
          id: "agent-pool",
          title: "Specialist Agents",
          type: "output",
          description: "Dispatches minimal prompt slices to targeted agents with schema validation",
          tech: "Claude / GPT-4o",
        },
      ],
      dataFlowSteps: [
        "Query embedding is matched against agent skill embeddings in <140ms",
        "DAG compiler selects active path and prunes redundant graph nodes",
        "Context window compressor filters out 68% of superfluous historical tokens",
        "Final synthesis node outputs grounded, verified output with lineage proof",
      ],
    },
    codeHighlights: [
      {
        title: "Semantic Agent Router with Cosine Distance Gating",
        language: "typescript",
        code: `export async function routeToAgent(
  queryEmbedding: number[],
  registeredAgents: AgentSkillSpec[],
  threshold = 0.82
): Promise<RoutingResult> {
  const scored = registeredAgents.map((agent) => ({
    agent,
    similarity: cosineSimilarity(queryEmbedding, agent.vector),
  }));

  scored.sort((a, b) => b.similarity - a.similarity);
  const bestMatch = scored[0];

  if (!bestMatch || bestMatch.similarity < threshold) {
    return {
      selectedAgent: "general-fallback",
      confidence: bestMatch?.similarity ?? 0,
      executionPath: ["clarification-node"],
    };
  }

  return {
    selectedAgent: bestMatch.agent.id,
    confidence: bestMatch.similarity,
    executionPath: compileExecutionDag(bestMatch.agent.dependencies),
  };
}`,
        explanation:
          "Fast-paths user requests by executing math operations on embedding vectors rather than making expensive external LLM classification calls.",
      },
    ],
    interactiveDemoType: "vector-graph",
  },
  {
    id: "hyperfluid",
    slug: "hyperfluid",
    title: "HyperFluid",
    tagline: "GPU-accelerated design token and micro-interaction runtime for web applications",
    category: "Design Systems",
    status: "OPEN SOURCE",
    year: "2024",
    githubUrl: "https://github.com",
    liveUrl: "https://hyperfluid.dev",
    summary:
      "Created a zero-runtime CSS & physics micro-interaction engine combining custom WebGL fragment shaders and analytical spring math to achieve locked 120 FPS transitions with a 1.4kB gzip footprint.",
    primaryMetric: {
      label: "Frame Rate",
      value: "120 FPS locked",
    },
    metrics: [
      {
        label: "Frame Rate",
        value: "120 FPS",
        change: "Smooth",
        description: "Zero frame drops on high refresh rate ProMotion displays",
      },
      {
        label: "Bundle Size",
        value: "1.4 kB",
        change: "-94%",
        description: "Compared to heavy 40kB animation libraries",
      },
      {
        label: "Layout Thrashing",
        value: "0 ms",
        change: "100% eliminated",
        description: "Mutates transform matrices and CSS variables exclusively",
      },
      {
        label: "Shader Compilation",
        value: "<2ms",
        change: "Instant",
        description: "Pre-warmed GPU pipelines with zero initial interaction lag",
      },
    ],
    techStack: ["WebGL", "GLSL Shaders", "TypeScript", "Tailwind CSS", "Vite", "Canvas"],
    problem: {
      context:
        "Modern fluid web applications with blur backdrops, tactile spring physics, and dynamic lighting frequently drop frames on mobile devices due to DOM layout thrashing and CPU-heavy JS animation loops.",
      painPoints: [
        "CPU spiking to 80% when animating multiple spring cards simultaneously",
        "Layout thrashing when querying element dimensions during gesture dragging",
        "Inconsistent physics feel across different display refresh rates (60Hz vs 120Hz)",
      ],
      constraints: [
        "Must weigh less than 3kB total bundle cost",
        "Must play seamlessly alongside existing Tailwind CSS classes",
        "Hardware-accelerated performance even on mid-range Android hardware",
      ],
    },
    solution: {
      overview:
        "Created an analytical second-order spring solver that maps directly into GPU vertex uniforms and CSS hardware-accelerated transforms. Interactive elements trigger zero reflows and offload complex lighting to a shared WebGL canvas overlay.",
      architectureHighlights: [
        "Closed-form analytical spring equations solved in constant O(1) time",
        "Composite layer management with will-change CSS transforms",
        "Shared canvas backdrop with GLSL noise & fluid distortion shaders",
        "Zero-dependency bundle compiling to 1.4kB gzip",
      ],
      tradeOffs: [
        {
          choice: "Analytical Spring Equations",
          alternative: "Euler / Verlet Iterative Integration",
          reason: "Can jump to any timestamp instantly; frame-rate independent across 60Hz, 90Hz, and 120Hz screens.",
        },
        {
          choice: "Single Global WebGL Canvas Overlay",
          alternative: "Multiple Canvas Contexts per Card",
          reason: "Avoids browser context limit bugs and reduces VRAM overhead by over 80%.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Hardware-accelerated rendering and physics pipeline",
      nodes: [
        {
          id: "gesture-input",
          title: "Pointer & Touch Ingress",
          type: "input",
          description: "Passive event listeners capture high-resolution pointer coordinates",
          tech: "PointerEvent API",
        },
        {
          id: "analytical-solver",
          title: "Second-Order Spring Solver",
          type: "process",
          description: "Calculates instantaneous position and velocity using closed-form damping math",
          tech: "Vector Math / SIMD",
        },
        {
          id: "css-sync",
          title: "CSS Transform Sync",
          type: "output",
          description: "Applies 3D matrix transforms directly to composited DOM layer",
          tech: "matrix3d()",
        },
        {
          id: "glsl-overlay",
          title: "GLSL Fluid Overlay",
          type: "output",
          description: "Simulates refractive glass dispersion and tactile feedback ripples",
          tech: "WebGL 2.0 / GLSL",
        },
      ],
      dataFlowSteps: [
        "Pointer movement updates velocity vector via passive hardware event listener",
        "Spring equation evaluates displacement in 0.002ms using closed-form math",
        "Hardware matrix transforms the DOM layer without triggering browser layout",
        "Shared fragment shader renders caustic lighting at full display refresh rate",
      ],
    },
    codeHighlights: [
      {
        title: "Closed-Form Analytical Spring Evaluator",
        language: "typescript",
        code: `// Closed-form damped harmonic oscillator in O(1) time
export function evaluateSpring(
  t: number,
  initialPos: number,
  targetPos: number,
  initialVel: number,
  tension = 180,
  friction = 14
): { pos: number; vel: number } {
  const delta = initialPos - targetPos;
  const omega0 = Math.sqrt(tension);
  const zeta = friction / (2 * omega0);

  if (zeta < 1) {
    // Underdamped (tactile bouncy spring)
    const omegaD = omega0 * Math.sqrt(1 - zeta * zeta);
    const decay = Math.exp(-zeta * omega0 * t);
    const c1 = delta;
    const c2 = (initialVel + zeta * omega0 * delta) / omegaD;
    
    const pos = targetPos + decay * (c1 * Math.cos(omegaD * t) + c2 * Math.sin(omegaD * t));
    const vel = decay * ((c2 * omegaD - c1 * zeta * omega0) * Math.cos(omegaD * t) -
                         (c1 * omegaD + c2 * zeta * omega0) * Math.sin(omegaD * t));
    return { pos, vel };
  }
  // Critically damped or overdamped fallback...
  return { pos: targetPos, vel: 0 };
}`,
        explanation:
          "Solves the differential equation analytically, enabling frame-rate independent calculation without numerical drift or costly step-by-step loops.",
      },
    ],
    interactiveDemoType: "spring-physics",
  },
  {
    id: "sentient-core",
    slug: "sentient-core",
    title: "Sentient Core",
    tagline: "Autonomous edge caching & adaptive rate-limiting proxy with eBPF metrics",
    category: "Edge Infrastructure",
    status: "PRODUCTION",
    year: "2024",
    githubUrl: "https://github.com",
    liveUrl: "https://sentient-core.io",
    summary:
      "Constructed a high-concurrency edge caching proxy serving 250k req/sec with <3.2ms p99 latency, dynamic sliding-window rate limiting, and automated origin failover.",
    primaryMetric: {
      label: "p99 Latency",
      value: "<3.2ms",
    },
    metrics: [
      {
        label: "Edge p99 Latency",
        value: "3.18ms",
        change: "-88%",
        description: "Served directly from memory bloom-filtered edge cache",
      },
      {
        label: "Cache Hit Ratio",
        value: "99.98%",
        change: "+12.4%",
        description: "Stale-while-revalidate with probabilistic early warming",
      },
      {
        label: "Throughput / Node",
        value: "250k req/s",
        change: "High scale",
        description: "Rust async runtime with io_uring socket polling",
      },
      {
        label: "Origin Load",
        value: "-94%",
        change: "Protected",
        description: "Coalesced request collapsing for hot asset spikes",
      },
    ],
    techStack: ["Rust", "Tokio", "eBPF", "Redis", "Docker", "WasmEdge", "Prometheus"],
    problem: {
      context:
        "High-traffic flash sales and breaking news spikes trigger severe cache stampedes (dog-piling), swamping backend database clusters and causing cascading origin outages.",
      painPoints: [
        "10,000+ concurrent requests hitting database for the same expired key",
        "Coarse rate limiters punishing legitimate active users instead of bots",
        "Edge configuration updates requiring slow proxy restarts and dropped TCP connections",
      ],
      constraints: [
        "Strict SLA: p99 under 5ms globally",
        "Zero downtime configuration reloading during traffic bursts",
        "Sub-10MB memory footprint per edge container",
      ],
    },
    solution: {
      overview:
        "Engineered a distributed Rust proxy incorporating single-flight request coalescing, local multi-tiered cache with counting Bloom filters, and dynamic rate limiting governed by kernel-level eBPF packet inspection.",
      architectureHighlights: [
        "Single-flight mutex collapsing: 5,000 identical requests generate exactly 1 origin fetch",
        "Stale-while-revalidate with automated background re-warming",
        "Counting Bloom filters for instant zero-IO cache exclusion",
        "Live atomic configuration hot-swapping via shared memory IPC",
      ],
      tradeOffs: [
        {
          choice: "Request Coalescing (Single-Flight)",
          alternative: "Standard Reverse Proxy Pass-through",
          reason: "Prevents cache stampedes and eliminates 99.4% of backend origin spikes during instant traffic surges.",
        },
        {
          choice: "Rust Tokio Async with io_uring",
          alternative: "Go HTTP Reverse Proxy",
          reason: "Lower memory overhead (8MB vs 90MB) and zero garbage collection latency spikes under 200k+ req/sec.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Edge ingress, bloom verification, single-flight collapse, and origin shield",
      nodes: [
        {
          id: "client-traffic",
          title: "Global Traffic",
          type: "input",
          description: "Incoming HTTP/3 and TLS 1.3 requests terminated at edge PoPs",
          tech: "QUIC / HTTP/3",
        },
        {
          id: "bloom-filter",
          title: "Counting Bloom Filter",
          type: "process",
          description: "In-memory probabilistic test to instantly reject missing keys in 0.001ms",
          tech: "Bloom Filter / Rust",
        },
        {
          id: "single-flight",
          title: "Single-Flight Collapser",
          type: "process",
          description: "Locks duplicate concurrent queries and broadcasts the single origin response to all waiting clients",
          tech: "Tokio Async Channels",
        },
        {
          id: "edge-cache",
          title: "Multi-Tier L1/L2 Cache",
          type: "storage",
          description: "Hot memory L1 + distributed NVMe SSD L2 cache layer",
          tech: "Mmap / Shared RAM",
        },
      ],
      dataFlowSteps: [
        "Packet ingress is validated and rate-limited via token bucket in 0.2ms",
        "Bloom filter confirms key presence; L1 memory returns cached payload in 0.8ms",
        "If cache is expiring, background async task fetches origin while serving stale data immediately",
        "Duplicate concurrent client requests join the active single-flight channel, zeroing origin load",
      ],
    },
    codeHighlights: [
      {
        title: "Single-Flight Request Collapsing Engine",
        language: "rust",
        code: `pub struct SingleFlight<T> {
    in_flight: Mutex<HashMap<String, Arc<NotifyBarrier<T>>>>,
}

impl<T: Clone + Send + 'static> SingleFlight<T> {
    pub async fn execute<F, Fut>(&self, key: &str, fetch: F) -> Result<T, Error>
    where
        F: FnOnce() -> Fut,
        Fut: Future<Output = Result<T, Error>>,
    {
        // Check if identical request is already running
        let mut map = self.in_flight.lock().await;
        if let Some(existing) = map.get(key) {
            let barrier = existing.clone();
            drop(map); // Release mutex lock before awaiting
            return barrier.wait_for_result().await;
        }

        let barrier = Arc::new(NotifyBarrier::new());
        map.insert(key.to_string(), barrier.clone());
        drop(map);

        // First thread executes origin fetch
        let result = fetch().await;
        barrier.broadcast(result.clone()).await;

        let mut map = self.in_flight.lock().await;
        map.remove(key);
        result
    }
}`,
        explanation:
          "Guarantees that regardless of how many thousands of concurrent requests arrive simultaneously for a given cache key, only one outbound network request is sent to the backend database.",
      },
    ],
    interactiveDemoType: "cache-simulator",
  },
];

export const PROFILE_DATA = {
  name: "Arush Jain",
  title: "AI Systems & Full-Stack Engineer",
  status: "AVAILABLE FOR HIGH-IMPACT ROLES",
  location: "IIITDM Jabalpur / Remote",
  education: "B.Tech in Smart Manufacturing, IIITDM Jabalpur (2023 - Present)",
  contact: {
    email: "jainarush423@gmail.com",
    phone: "+91 91713 56822",
  },
  coreFocus: [
    "Scalable AI Systems",
    "Multi-Agent Workflows",
    "Full-Stack Applications",
    "Data Structures & Algorithms",
  ],
  bio: "Engineering scalable AI systems, deterministic multi-agent workflows, and robust full-stack applications with deep algorithmic foundations in data structures and systems design.",
  heroPunchline: "Architecting scalable AI systems, multi-agent workflows, and high-performance full-stack applications.",
  stats: [
    { label: "Systems Throughput", value: "1.2M+ req/s" },
    { label: "Sub-ms p99 Latency", value: "<0.8ms" },
    { label: "Rendering Target", value: "120 FPS" },
    { label: "AI Token Savings", value: "68%" },
  ],
  systemSpecs: {
    education: "IIITDM Jabalpur (2023 - Present)",
    degree: "B.Tech in Smart Manufacturing",
    runtime: "Next.js 14 App Router + Rust/WASM Core",
    architecture: "Multi-Agent DAGs & Scalable AI",
    styling: "Tailwind CSS + Class-Based Dark Mode",
    motion: "Analytical Harmonic Springs (Framer Motion)",
    copilot: "In-Memory Semantic Vector Retrieval & Grounded RAG",
  },
  socialLinks: [
    { label: "GitHub", url: "https://github.com/Slash-495", icon: "Github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/#", icon: "Linkedin", isPlaceholder: true },
    { label: "LeetCode", url: "https://leetcode.com/#", icon: "Code2", isPlaceholder: true },
    { label: "Email", url: "mailto:jainarush423@gmail.com", icon: "Mail" },
    { label: "Phone", url: "tel:+919171356822", icon: "Phone" },
  ],
};

