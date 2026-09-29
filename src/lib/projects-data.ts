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
  category: "Full Stack Project" | "AI & Multi-Agent" | "RAG & Search" | "Machine Learning";
  status: "PRODUCTION" | "DEPLOYED" | "PATENT GRANTED" | "SELECTED";
  year: string;
  githubUrl: string;
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
  interactiveDemoType:
    | "railroute"
    | "legal-rag"
    | "conformal"
    | "two-tower"
    | "leetlens"
    | "duffy"
    | "velora"
    | "patent-footrest";
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "leetlens",
    slug: "leetlens",
    title: "LeetLens",
    tagline: "AI-Powered LeetCode coding assistant & Chrome extension with execution visualizer",
    category: "Full Stack Project",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/LeetLens",
    liveUrl: "https://github.com/Slash-495/LeetLens",
    summary:
      "Engineered an AI-powered Chrome Extension directly integrating into LeetCode. Features an automated Solution Review Engine for senior-level time/space complexity analysis, an interactive Execution Trace Visualizer for step-by-step recursion tree inspection, intelligent brute-force vs. optimal code comparison, and BYOK (Bring Your Own Key) encrypted storage.",
    primaryMetric: {
      label: "Code Review & Privacy",
      value: "Real-Time / 100% BYOK",
    },
    metrics: [
      {
        label: "Review Latency",
        value: "<250ms",
        change: "Streaming",
        description: "Evaluates time/space complexity, edge cases, and optimizations",
      },
      {
        label: "Execution Visualizer",
        value: "Step-by-Step",
        change: "Interactive",
        description: "Recursion trees, variable states, and loop iterations",
      },
      {
        label: "Key Security",
        value: "100% Local",
        change: "Zero-server relay",
        description: "API keys stored exclusively in chrome.storage.local",
      },
      {
        label: "Architecture",
        value: "Manifest V3",
        change: "Production",
        description: "Content script with DOM MutationObserver sync",
      },
    ],
    techStack: ["TypeScript", "React", "Chrome Extension API", "Tailwind CSS", "Gemini API", "AST Parsing"],
    problem: {
      context:
        "Software engineers practicing LeetCode problems often get stuck and either peek at full solutions—spoiling the learning curve—or rely on centralized third-party tools that store user API keys on third-party servers.",
      painPoints: [
        "Premature solution peeking spoils algorithmic problem-solving skills",
        "Third-party AI extensions leaking private API keys to proxy backends",
        "Lack of interactive visualization for complex recursive trees and pointer movement",
      ],
      constraints: [
        "Zero server-side persistence of user OpenAI / Gemini API keys (strict BYOK)",
        "Instant DOM extraction of LeetCode problem descriptions and code editors",
        "Seamless overlay with zero layout shifts on LeetCode's dynamic Monaco editor",
      ],
    },
    solution: {
      overview:
        "Built LeetLens using Chrome Extension Manifest V3. It hooks into the LeetCode DOM, extracts active problem context, and runs Socratic, tiered hints, code reviews, and recursive state visualization using user-supplied local API keys.",
      architectureHighlights: [
        "Solution Review Engine: Senior-engineer-level analysis on time/space complexity",
        "Execution Trace Visualizer: Recursion trees, variable states, step-by-step inspector",
        "Intelligent Comparison: Compares brute-force code against optimal approaches (e.g. O(N²) vs O(N))",
        "BYOK Vault: Cryptographically isolated storage using chrome.storage.local",
      ],
      tradeOffs: [
        {
          choice: "BYOK (Bring Your Own Key) Local Execution",
          alternative: "Centralized SaaS Proxy Backend",
          reason: "Ensures complete user privacy, eliminates recurring server hosting bills, and prevents credential theft.",
        },
        {
          choice: "Socratic Tiered Hint System",
          alternative: "Direct Complete Solution Generation",
          reason: "Promotes real algorithmic retention and true problem-solving mastery during technical interview prep.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Manifest V3 Pipeline: LeetCode DOM -> Content Script -> BYOK Local Storage -> Gemini AI -> Interactive Trace Overlay",
      nodes: [
        {
          id: "leetcode-dom",
          title: "LeetCode DOM Ingress",
          type: "input",
          description: "Captures problem statement, sample tests, and user editor code",
          tech: "DOM MutationObserver",
        },
        {
          id: "byok-vault",
          title: "BYOK Local Vault",
          type: "storage",
          description: "Retrieves user's encrypted local API key with zero network relay",
          tech: "chrome.storage.local",
        },
        {
          id: "review-engine",
          title: "Solution Review Engine",
          type: "process",
          description: "Generates time/space complexity analysis and edge-case warnings",
          tech: "Gemini AI / AST Parsing",
        },
        {
          id: "visualizer-overlay",
          title: "Trace Visualizer Overlay",
          type: "output",
          description: "Renders step-by-step recursion trees and variable states right in page",
          tech: "React / Tailwind / Canvas",
        },
      ],
      dataFlowSteps: [
        "User opens LeetCode problem; content script detects active slug and language context",
        "User clicks 'Review Code'; extension queries Gemini using user's encrypted local API key",
        "Analyzes big-O complexity and points out potential time limit exceeded (TLE) traps",
        "Trace visualizer renders recursion tree diagram step-by-step directly alongside code editor",
      ],
    },
    codeHighlights: [
      {
        title: "Client-Side BYOK Socratic Hint Execution (TypeScript)",
        language: "typescript",
        code: `export async function requestSocraticReview(
  code: string,
  problemContext: ProblemContext
): Promise<ReviewResult> {
  const { apiKey } = await chrome.storage.local.get(["apiKey"]);
  if (!apiKey) throw new Error("BYOK: Please configure your API key in extension settings");

  const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: \`Review this LeetCode solution for \${problemContext.title}:\\n\${code}\\nAnalyze Big-O, edge cases, and comparison without spoiling optimal solution.\` }]
      }]
    })
  });
  const data = await response.json();
  return parseReviewPayload(data);
}`,
        explanation:
          "Zero backend relay architecture: all AI completions are initiated directly from the client's browser using local API keys.",
      },
    ],
    interactiveDemoType: "leetlens",
  },
  {
    id: "duffy",
    slug: "duffy",
    title: "Duffy",
    tagline: "AI-powered language learning ecosystem with Spaced Repetition, Voice AI & classroom tools",
    category: "Full Stack Project",
    status: "DEPLOYED",
    year: "2024",
    githubUrl: "https://github.com/Slash-495/Duffy",
    liveUrl: "https://duffy.onrender.com/",
    summary:
      "Architected a comprehensive language immersion web platform combining an intelligent Spaced Repetition System (SRS) for custom flashcards, real-time in-browser neural voice recognition via the Web Speech API with dynamic pronunciation scoring, Gemini-powered conversational scenario roleplay personas, and B2B classroom roster management. Live on Render at duffy.onrender.com.",
    primaryMetric: {
      label: "In-Browser Voice AI",
      value: "<150ms / Live on Render",
    },
    metrics: [
      {
        label: "Voice AI Latency",
        value: "<150ms",
        change: "In-browser",
        description: "Zero external speech server latency via Web Speech API",
      },
      {
        label: "SRS Algorithm",
        value: "SuperMemo-2",
        change: "Adaptive",
        description: "Decays and schedules flashcard review intervals dynamically",
      },
      {
        label: "AI Immersion",
        value: "Gemini Personas",
        change: "Adaptive CEFR",
        description: "Dynamic roleplay adapting to user conversational proficiency",
      },
      {
        label: "Production Deployment",
        value: "duffy.onrender.com",
        change: "Live",
        description: "Full-stack web application running in production",
      },
    ],
    techStack: ["Next.js / React", "Node.js", "Express", "MongoDB", "Web Speech API", "Gemini AI", "Tailwind CSS"],
    problem: {
      context:
        "Language learners face a disconnect between passive rote memorization (flashcards) and terrifying real-world spoken interactions. Most language apps lock speaking practice behind expensive subscriptions and fail to provide classrooms with student roster tracking tools.",
      painPoints: [
        "Passive vocabulary apps failing to build spoken conversation confidence",
        "Expensive server-side voice recognition APIs creating latency bottlenecks",
        "Teachers lacking unified dashboards to manage student flashcard decks and review progress",
      ],
      constraints: [
        "Free, in-browser neural voice recognition without paid third-party voice APIs",
        "Dynamic spaced repetition scheduling adapting to individual memory retention",
        "Roleplay scenarios that adjust grammar complexity to the learner's fluency level",
      ],
    },
    solution: {
      overview:
        "Constructed Duffy: a unified platform bringing together SRS flashcards, interactive AI roleplay scenarios (cafes, airports, hotels), real-time pronunciation scoring via the Web Speech API, and teacher classroom tools.",
      architectureHighlights: [
        "Core Learning Engine: Intelligent Spaced Repetition System (SRS) custom flashcard decks",
        "Web Speech API: Free, low-latency in-browser speech recognition and TTS correction",
        "AI Immersion Engine: Gemini-powered scenario roleplay adapting to CEFR levels (A1 to C2)",
        "Educational Tools: B2B classroom creation, roster management, and assigned homework decks",
      ],
      tradeOffs: [
        {
          choice: "In-Browser Web Speech API Integration",
          alternative: "Centralized Whisper Server Hosting",
          reason: "Zero server hosting bandwidth costs and instantaneous (<150ms) microphone response.",
        },
        {
          choice: "Custom SuperMemo SRS Algorithm",
          alternative: "Linear Interval Scheduling",
          reason: "Adapts flashcard recurrence intervals based on user recall difficulty, maximizing memory retention.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Duffy Architecture: Web Speech Voice Ingress -> Gemini Immersion Engine -> SRS Decay Scheduler -> MongoDB Store",
      nodes: [
        {
          id: "voice-ingress",
          title: "Web Speech Voice Ingress",
          type: "input",
          description: "Microphone speech converted to text tokens in browser in <150ms",
          tech: "Web Speech API / SpeechRecognition",
        },
        {
          id: "gemini-roleplay",
          title: "Gemini Immersion Engine",
          type: "process",
          description: "Generates context-aware situational dialogue and pronunciation critique",
          tech: "Gemini AI / Express",
        },
        {
          id: "srs-engine",
          title: "Spaced Repetition Scheduler",
          type: "process",
          description: "Calculates memory retention decay and queues due cards",
          tech: "SuperMemo-2 / TypeScript",
        },
        {
          id: "mongo-store",
          title: "User & Classroom Database",
          type: "storage",
          description: "Stores learner streaks, XP, decks, and teacher classroom rosters",
          tech: "MongoDB / Mongoose",
        },
      ],
      dataFlowSteps: [
        "Learner selects scenario (e.g., Tokyo Cafe Order); AI presents situational prompt",
        "Learner speaks into microphone; Web Speech API transcribes spoken response in <150ms",
        "Pronunciation dashboard grades accuracy and provides Text-To-Speech phonetic correction",
        "SRS engine logs user mastery score and reschedules vocabulary cards for optimal recall",
      ],
    },
    codeHighlights: [
      {
        title: "Spaced Repetition Interval Scheduler (TypeScript)",
        language: "typescript",
        code: `export function calculateNextReview(
  repetition: number,
  easeFactor: number,
  grade: number // 0 to 5 recall quality
): { repetition: number; intervalDays: number; easeFactor: number } {
  // Update ease factor according to SuperMemo-2 formula
  let nextEase = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  nextEase = Math.max(1.3, nextEase);

  let nextInterval: number;
  if (grade < 3) {
    // Incorrect recall: restart repetition cycle
    return { repetition: 0, intervalDays: 1, easeFactor: nextEase };
  }

  if (repetition === 0) nextInterval = 1;
  else if (repetition === 1) nextInterval = 6;
  else nextInterval = Math.round((repetition - 1) * nextEase);

  return { repetition: repetition + 1, intervalDays: nextInterval, easeFactor: nextEase };
}`,
        explanation:
          "Dynamically computes optimal memory recall intervals, ensuring students review weak cards right before forgetting occurs.",
      },
    ],
    interactiveDemoType: "duffy",
  },
  {
    id: "velora",
    slug: "velora",
    title: "Velora",
    tagline: "Modern full-stack cloud application with reactive state, low-latency APIs & modular architecture",
    category: "Full Stack Project",
    status: "PRODUCTION",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/Velora",
    liveUrl: "https://velora-3jpcjj3y1-slashs-projects-1d391125.vercel.app/",
    summary:
      "Constructed a high-concurrency full-stack cloud application architected with Next.js App Router, TypeScript, and high-performance serverless endpoints. Designed with modular UI patterns, instant optimistic UI updates, resilient database indexing, and strict end-to-end type safety across the entire client-server boundary.",
    primaryMetric: {
      label: "API Response Latency",
      value: "<45ms / 100% Type-Safe",
    },
    metrics: [
      {
        label: "API Latency",
        value: "<45ms",
        change: "Low-latency",
        description: "Optimized server actions and edge-cached queries",
      },
      {
        label: "Type Safety",
        value: "End-to-End",
        change: "Zero runtime type bugs",
        description: "Shared Zod schemas across client forms and server endpoints",
      },
      {
        label: "Optimistic UI",
        value: "0ms shift",
        change: "Instant",
        description: "Client state updates ahead of network round-trips",
      },
      {
        label: "Architecture",
        value: "Next.js App Router",
        change: "RSC",
        description: "React Server Components with streaming SSR",
      },
    ],
    techStack: ["Next.js", "TypeScript", "React", "PostgreSQL", "Prisma", "Tailwind CSS", "Zod", "Server Actions"],
    problem: {
      context:
        "Modern cloud SaaS applications suffer from sluggish client updates when network requests block UI interactions, leading to noticeable layout shifts and poor user experience under patchy network conditions.",
      painPoints: [
        "Network latency stalling user actions during interactive workflows",
        "Discrepancies between frontend TypeScript models and backend database schemas",
        "Cumbersome boilerplate required for data mutations and validation",
      ],
      constraints: [
        "Sub-50ms API response time across all core endpoints",
        "Strict end-to-end type safety eliminating manual type casting",
        "Instant optimistic UI rendering with automated rollback on error",
      ],
    },
    solution: {
      overview:
        "Engineered Velora: a reactive full-stack web application leveraging Next.js App Router Server Actions, Zod schema validation, and an optimistic UI state machine that immediately renders client updates while settling with the PostgreSQL database in the background.",
      architectureHighlights: [
        "Server Actions: Eliminates REST boilerplate with direct RPC-like server mutations",
        "Zod Schema Contracts: Single source of truth for input validation on client and server",
        "Optimistic State Manager: Renders actions instantly with zero perceived latency",
        "Prisma Database Layer: Indexed PostgreSQL queries with prepared statements",
      ],
      tradeOffs: [
        {
          choice: "Next.js Server Actions with Optimistic Updates",
          alternative: "Separate Express REST API",
          reason: "Unifies frontend and backend codebases, sharing types and eliminating API route boilerplate.",
        },
        {
          choice: "Zod Schema Invalidation",
          alternative: "Manual Type Guards",
          reason: "Enforces strict runtime validation at API boundary while generating compile-time TypeScript types.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Velora Architecture: Client Action -> Optimistic UI -> Next.js Server Action -> Zod Validation -> PostgreSQL",
      nodes: [
        {
          id: "client-action",
          title: "User Action Ingress",
          type: "input",
          description: "Form submit or state mutation event triggered in client component",
          tech: "React 18 / useOptimistic",
        },
        {
          id: "optimistic-ui",
          title: "Optimistic State Engine",
          type: "process",
          description: "Instantly updates local client state in 0ms ahead of network round-trip",
          tech: "Client State Cache",
        },
        {
          id: "server-action",
          title: "Next.js Server Action",
          type: "process",
          description: "Validates payload with Zod and executes database transaction",
          tech: "Server Action / Zod",
        },
        {
          id: "postgres-db",
          title: "PostgreSQL Database",
          type: "storage",
          description: "Persists records via Prisma ORM with connection pooling",
          tech: "PostgreSQL / Prisma",
        },
      ],
      dataFlowSteps: [
        "User triggers data update; client immediately reflects change in 0ms",
        "Server Action securely executes on edge runtime with authenticated session",
        "Zod validates payload structure; Prisma executes ACID transaction in <45ms",
        "Client seamlessly reconciles server-confirmed record with zero layout shift",
      ],
    },
    codeHighlights: [
      {
        title: "Type-Safe Server Action with Zod Validation (TypeScript)",
        language: "typescript",
        code: `export async function updateResourceAction(input: unknown) {
  // Validate input strictly with Zod schema
  const parsed = ResourceSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  const { id, title, metadata } = parsed.data;
  
  // Execute database transaction with Prisma
  const updated = await prisma.resource.update({
    where: { id },
    data: { title, metadata, updatedAt: new Date() },
  });

  revalidatePath("/dashboard");
  return { success: true, data: updated };
}`,
        explanation:
          "Eliminates runtime type bugs by pairing Zod validation with Next.js Server Actions and automated cache revalidation.",
      },
    ],
    interactiveDemoType: "velora",
  },
  {
    id: "railroute-agent",
    slug: "railroute-agent",
    title: "RailRoute Agent",
    tagline: "3-agent (Planner / Verifier / Ranker) system for operationally-safe split-journey train routing",
    category: "AI & Multi-Agent",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/Rail-Route-Finder",
    liveUrl: "https://rail-route-finder.streamlit.app/",
    summary:
      "Architected a specialized 3-agent autonomous routing system using Python, Gemini LLM, and Streamlit to discover safe, multi-leg split train journeys when direct tickets are waitlisted or unavailable. Reduced latency from 3.2s to 1.45s and raised the operational pass rate to 100%.",
    primaryMetric: {
      label: "Operational Pass Rate",
      value: "100% verified",
    },
    metrics: [
      {
        label: "Operational Pass Rate",
        value: "100%",
        change: "+38%",
        description: "Zero unsafe layovers or missed connection risks",
      },
      {
        label: "End-to-End Latency",
        value: "1.45s",
        change: "-54.7%",
        description: "Cut down from 3.2s via parallel agent verification",
      },
      {
        label: "Architecture",
        value: "3-Agent DAG",
        change: "Planner / Verifier / Ranker",
        description: "Deterministic handoff loop with strict temporal gating",
      },
      {
        label: "Journey Feasibility",
        value: "94.8%",
        change: "Reliable",
        description: "Discovers valid multi-station transfers during peak holidays",
      },
    ],
    techStack: ["Python", "Google Gemini API", "Streamlit", "Pydantic", "FastAPI", "Pandas"],
    problem: {
      context:
        "During peak holiday travel seasons on Indian Railways, direct train tickets sell out weeks in advance. Travelers must piece together multi-leg split journeys across intermediate junctions, which frequently leads to missed connections, platform transit delays, or physically impossible transfer windows.",
      painPoints: [
        "Unreliable direct ticket availability on high-demand trunk routes",
        "LLMs hallucinating non-existent stations or negative layover durations",
        "Existing booking apps not calculating walking/platform transfer buffer times",
      ],
      constraints: [
        "Strict 45-minute to 180-minute minimum transfer buffer at intermediate junction stations",
        "Must support dynamic timetable updates and delayed train heuristics",
        "Sub-2s response time for interactive passenger queries",
      ],
    },
    solution: {
      overview:
        "Decoupled path generation into three specialized agents: 1) Route Planner identifies intermediate junction nodes and candidate train pairs, 2) Schedule Verifier checks real-time station buffers and platform transit constraints, and 3) Journey Ranker evaluates comfort, cost, total duration, and transfer stress.",
      architectureHighlights: [
        "Planner Agent: Traverses route network graphs to find high-probability junction hops",
        "Verifier Agent: Applies deterministic temporal rules (45m <= layover <= 180m)",
        "Ranker Agent: Multi-criteria Pareto ranking balancing price, duration, and convenience",
        "Parallel verification worker pool cutting end-to-end latency from 3.2s to 1.45s",
      ],
      tradeOffs: [
        {
          choice: "3-Agent Triad (Planner/Verifier/Ranker)",
          alternative: "Single Monolithic LLM Prompt",
          reason: "Monolithic prompts had a 38% failure rate with hallucinated layovers; multi-agent pipeline achieved 100% pass rate.",
        },
        {
          choice: "Deterministic Python Rule Engine for Verifier",
          alternative: "LLM-based Schedule Evaluation",
          reason: "Mathematical buffer checks cannot rely on LLM arithmetic; deterministic verification guarantees safety.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Triad Agent Workflow: Ingress -> Planner -> Parallel Verifier -> Multi-Criteria Ranker",
      nodes: [
        {
          id: "passenger-query",
          title: "Passenger Ingress",
          type: "input",
          description: "Origin, destination, target dates, travel class preferences",
          tech: "Streamlit / Pydantic",
        },
        {
          id: "planner-agent",
          title: "Planner Agent",
          type: "process",
          description: "Finds intermediate junctions and generates candidate 2-leg split combinations",
          tech: "Gemini / Graph Search",
        },
        {
          id: "verifier-agent",
          title: "Verifier Agent",
          type: "process",
          description: "Deterministic validation of platform layover buffers (45-180 min)",
          tech: "Python Temporal Rules",
        },
        {
          id: "ranker-agent",
          title: "Ranker Agent",
          type: "output",
          description: "Sorts validated journeys by Pareto optimality and travel convenience",
          tech: "Weighted Scoring Engine",
        },
      ],
      dataFlowSteps: [
        "Passenger submits origin/destination pair with flexible junction parameters",
        "Planner agent queries station graph and generates top-8 split candidates in 380ms",
        "Verifier agent validates connection timings against railway timetables in parallel",
        "Ranker agent scores journeys based on comfort, layover convenience, and price in 1.45s total",
      ],
    },
    codeHighlights: [
      {
        title: "Verifier Agent Temporal Buffer Validation (Python)",
        language: "python",
        code: `def verify_transfer_feasibility(leg_a: TrainLeg, leg_b: TrainLeg) -> VerificationResult:
    """Enforces strict platform transfer buffers between split journeys."""
    arrival_time = leg_a.scheduled_arrival
    departure_time = leg_b.scheduled_departure
    
    layover_minutes = (departure_time - arrival_time).total_seconds() / 60.0
    if layover_minutes < 0:
        layover_minutes += 24 * 60
        
    MIN_SAFE_BUFFER = 45.0  # Station transit + platform shift buffer
    MAX_REASONABLE_BUFFER = 240.0  # Passenger comfort cap
    
    if layover_minutes < MIN_SAFE_BUFFER:
        return VerificationResult(is_valid=False, reason="CRITICAL: Layover below 45m safe threshold")
    if layover_minutes > MAX_REASONABLE_BUFFER:
        return VerificationResult(is_valid=False, reason="REJECTED: Excessive station wait time")
        
    return VerificationResult(is_valid=True, layover_minutes=layover_minutes, safety_score=1.0)`,
        explanation:
          "Enforces non-negotiable operational safety rules in code, ensuring zero passenger misses due to model arithmetic errors.",
      },
    ],
    interactiveDemoType: "railroute",
  },
  {
    id: "chambers-legal-rag",
    slug: "chambers-legal-rag",
    title: "Chambers & Infrastructure",
    tagline: "Dual-stream hybrid retrieval pipeline (FAISS + BM25, Cohere Rerank) for the Indian GST Act",
    category: "RAG & Search",
    status: "PRODUCTION",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/GST-RAG",
    liveUrl: "https://chambersandinfastructures.streamlit.app/",
    summary:
      "Engineered an enterprise-grade legal RAG system over the Indian Goods & Services Tax (GST) Act using a dual-stream hybrid retrieval architecture (FAISS dense vectors + BM25 sparse lexical search) fused via Reciprocal Rank Fusion and re-ranked with Cohere Rerank. Slashed legal hallucination rates from 36.8% to 2.1% and achieved 94.2% Precision@4.",
    primaryMetric: {
      label: "Hallucination Rate",
      value: "2.1% (from 36.8%)",
    },
    metrics: [
      {
        label: "Hallucination Rate",
        value: "2.1%",
        change: "-94.3%",
        description: "Down from 36.8% in baseline naive vector RAG",
      },
      {
        label: "Precision@4",
        value: "94.2%",
        change: "+28.4%",
        description: "Exact legal statutory clause retrieval",
      },
      {
        label: "Hybrid Retrieval",
        value: "FAISS + BM25",
        change: "Dual-stream",
        description: "Fused via Reciprocal Rank Fusion (RRF k=60)",
      },
      {
        label: "Cross-Encoder",
        value: "Cohere Rerank",
        change: "Top-4 rerank",
        description: "High-precision legal relevance score gating",
      },
    ],
    techStack: ["FastAPI", "AWS", "FAISS", "BM25", "Cohere API", "LangChain", "Python", "Docker"],
    problem: {
      context:
        "The Indian GST Act contains hundreds of dense sections, rules, notifications, and cross-referenced circulars. Naive semantic vector search misses exact statutory citations (e.g., 'Section 16(2)(aa) vs Section 16(4)') because embeddings blur numerical clause references, causing lawyers to receive hallucinated legal interpretations.",
      painPoints: [
        "Semantic embeddings failing on specific sub-clause numbers and legal terminology",
        "Hallucinated citations causing dangerous compliance risks in corporate filings",
        "Dense vector retrieval alone failing to rank exact notification amendments",
      ],
      constraints: [
        "Zero tolerance for invented section numbers or fabricated case laws",
        "Must return verified statutory source links with clause-level grounding",
        "Deployable on scalable AWS cloud infrastructure",
      ],
    },
    solution: {
      overview:
        "Architected a dual-stream retrieval engine combining dense semantic search (FAISS with text-embedding-3) for conceptual understanding and sparse lexical search (BM25) for exact keyword and clause number matching. Results are merged via Reciprocal Rank Fusion (RRF) and scored through Cohere Cross-Encoder Rerank before context injection.",
      architectureHighlights: [
        "Dense Stream: FAISS index over hierarchical legal chunk trees",
        "Sparse Stream: BM25 index targeting statutory section titles and exact notifications",
        "RRF Fusion: Normalizes and blends dense and sparse candidate pools",
        "Cohere Rerank: Cross-encoder evaluates query-document pairs to produce Top-4 precision",
      ],
      tradeOffs: [
        {
          choice: "Hybrid FAISS + BM25 with Cohere Rerank",
          alternative: "Single Vector Store (Pinecone / FAISS alone)",
          reason: "Pure vector search had 36.8% hallucination on statutory citations; hybrid search with reranking lowered it to 2.1%.",
        },
        {
          choice: "Clause-Level Hierarchical Chunking",
          alternative: "Fixed 500-token Sliding Window",
          reason: "Preserves section-subclause boundaries, ensuring each chunk contains its parent section context.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Dual-Stream Pipeline: Query -> Dense (FAISS) + Sparse (BM25) -> RRF Fusion -> Cohere Rerank -> LLM Generation",
      nodes: [
        {
          id: "legal-query",
          title: "Legal Query Ingress",
          type: "input",
          description: "Tax attorney query regarding GST input tax credit eligibility",
          tech: "FastAPI / AWS",
        },
        {
          id: "dense-sparse",
          title: "Dual-Stream Search",
          type: "process",
          description: "Parallel FAISS dense similarity & BM25 exact clause keyword matching",
          tech: "FAISS + BM25",
        },
        {
          id: "rrf-fusion",
          title: "RRF Fusion & Cohere Rerank",
          type: "process",
          description: "Merges candidate pools via RRF (k=60) and executes cross-encoder reranking",
          tech: "Cohere Rerank API",
        },
        {
          id: "grounded-output",
          title: "Grounded Legal Synthesis",
          type: "output",
          description: "Synthesized statutory answer with 94.2% Precision@4 and exact clause citation",
          tech: "AWS Bedrock / Gemini",
        },
      ],
      dataFlowSteps: [
        "User submits legal question to FastAPI gateway on AWS",
        "Query is dispatched concurrently to FAISS dense retriever and BM25 sparse index",
        "Top-25 candidates from each stream are fused via Reciprocal Rank Fusion",
        "Cohere Cross-Encoder reranks top 50 into final top 4 high-precision legal clauses",
      ],
    },
    codeHighlights: [
      {
        title: "Dual-Stream Reciprocal Rank Fusion (Python)",
        language: "python",
        code: `def reciprocal_rank_fusion(dense_docs: list[str], sparse_docs: list[str], k: int = 60) -> list[tuple[str, float]]:
    scores: dict[str, float] = {}
    for rank, doc_id in enumerate(dense_docs):
        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    for rank, doc_id in enumerate(sparse_docs):
        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    return sorted(scores.items(), key=lambda item: item[1], reverse=True)`,
        explanation:
          "Balances semantic intent with exact keyword statutory clause matching, eliminating the bias of single-modality retrievers.",
      },
    ],
    interactiveDemoType: "legal-rag",
  },
  {
    id: "conformal-demand-forecasting",
    slug: "conformal-demand-forecasting",
    title: "Conformal Demand Forecasting",
    tagline: "Probabilistic inventory forecasting engine via LightGBM & Newsvendor optimization",
    category: "Machine Learning",
    status: "DEPLOYED",
    year: "2024",
    githubUrl: "https://github.com/Slash-495/Conformal-Demand-Forecasting",
    liveUrl: "https://github.com/Slash-495/Conformal-Demand-Forecasting",
    summary:
      "Developed an end-to-end probabilistic supply chain forecasting engine combining LightGBM gradient boosting, split conformal prediction intervals, and Newsvendor profit-maximization optimization. Containerized with Docker and served via FastAPI, cutting retail stockout rates from 48% to 11% and reducing total inventory holding costs by 31%.",
    primaryMetric: {
      label: "Stockout Rate",
      value: "11% (from 48%)",
    },
    metrics: [
      {
        label: "Stockout Rate",
        value: "11%",
        change: "-77.1%",
        description: "Drastic drop from baseline 48% under-forecasting",
      },
      {
        label: "Inventory Holding Cost",
        value: "-31%",
        change: "Cost savings",
        description: "Optimized safety stock allocation via Newsvendor fractile",
      },
      {
        label: "Prediction Coverage",
        value: "90% guaranteed",
        change: "Conformalized",
        description: "Finite-sample statistical validity without distributional assumptions",
      },
      {
        label: "API Throughput",
        value: "450 req/s",
        change: "Low-latency",
        description: "FastAPI + Docker microservice container",
      },
    ],
    techStack: ["LightGBM", "Python", "FastAPI", "Docker", "Scikit-Learn", "NumPy", "Pandas"],
    problem: {
      context:
        "Point forecasting methods predict average demand, failing to account for asymmetric margin risk. Under-stocking causes lost sales, while over-stocking causes inventory holding depreciation.",
      painPoints: [
        "Deterministic point forecasts missing tail-risk demand spikes",
        "48% stockout rate during promotions and seasonal demand swings",
        "Excessive capital tied up in slow-moving safety stock",
      ],
      constraints: [
        "Statistically guaranteed prediction intervals (90% coverage)",
        "Must map uncertainty into financial order quantities in real time",
        "Containerized for seamless deployment into supply chain ERPs",
      ],
    },
    solution: {
      overview:
        "Built a multi-stage probabilistic forecasting pipeline: 1) LightGBM models non-linear demand trends, 2) Split Conformal Prediction calibrates distribution-free prediction intervals, and 3) Newsvendor critical fractile math determines profit-maximizing order quantities.",
      architectureHighlights: [
        "LightGBM Quantile Regressors predicting 10th, 50th, and 90th percentiles",
        "Split Conformal Calibration ensuring finite-sample coverage validity",
        "Newsvendor Optimization mapping critical ratio (underage vs overage cost) to inventory stock",
        "Dockerized FastAPI endpoint returning predictions and recommended order quantities",
      ],
      tradeOffs: [
        {
          choice: "Conformalized Quantile Regression",
          alternative: "Gaussian Parametric Assumptions",
          reason: "Real retail demand is skewed and non-Gaussian; conformal prediction guarantees valid intervals regardless of distribution.",
        },
        {
          choice: "LightGBM Gradient Boosting",
          alternative: "LSTM / DeepAR",
          reason: "LightGBM trained in 1/10th the time on tabular sales data with superior tabular feature interpretability and lower inference latency.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Pipeline: Feature Store -> LightGBM Regressor -> Conformal Interval Calibration -> Newsvendor Solver",
      nodes: [
        {
          id: "sales-history",
          title: "Historical Sales & Promos",
          type: "input",
          description: "SKU sales history, calendar features, promotions, store geography",
          tech: "Pandas / Feature Store",
        },
        {
          id: "lgbm-model",
          title: "LightGBM Engine",
          type: "process",
          description: "Gradient boosted decision trees forecasting demand percentiles",
          tech: "LightGBM / Python",
        },
        {
          id: "conformal-calibrator",
          title: "Conformal Calibrator",
          type: "process",
          description: "Computes non-conformity residuals over validation set to guarantee 90% coverage",
          tech: "Non-Parametric Math",
        },
        {
          id: "newsvendor-solver",
          title: "Newsvendor Optimizer",
          type: "output",
          description: "Balances underage cost vs overage cost to compute optimal stock order",
          tech: "FastAPI / Docker",
        },
      ],
      dataFlowSteps: [
        "ERP system sends product SKU, lead time, and margin data via REST API",
        "LightGBM generates multi-quantile demand distribution in 12ms",
        "Conformal calibrator adjusts interval bounds for statistical coverage guarantee",
        "Newsvendor module calculates exact units to reorder, cutting stockouts to 11%",
      ],
    },
    codeHighlights: [
      {
        title: "Newsvendor Critical Fractile Calculation (Python)",
        language: "python",
        code: `def calculate_optimal_order_quantity(underage_cost: float, overage_cost: float, conformal_intervals: tuple[float, float]) -> int:
    critical_ratio = underage_cost / (underage_cost + overage_cost)
    lower_bound, upper_bound = conformal_intervals
    optimal_stock = lower_bound + critical_ratio * (upper_bound - lower_bound)
    return max(0, int(round(optimal_stock)))`,
        explanation:
          "Translates machine learning uncertainty directly into bottom-line financial savings by accounting for asymmetrical margin risk.",
      },
    ],
    interactiveDemoType: "conformal",
  },
  {
    id: "two-tower-recommender",
    slug: "two-tower-recommender",
    title: "Multimodal Two-Tower Recommender",
    tagline: "Deep learning dual-encoder retrieval model with InfoNCE contrastive training",
    category: "Machine Learning",
    status: "PRODUCTION",
    year: "2024",
    githubUrl: "https://github.com/Slash-495/Two-Tower-Recommender",
    liveUrl: "https://github.com/Slash-495/Two-Tower-Recommender",
    summary:
      "Trained a high-throughput deep learning dual-encoder candidate generation model in PyTorch using InfoNCE contrastive loss and in-batch negative sampling. Sub-millisecond vector indexing with FAISS yielded a +4.2% gain in Recall@10 and a +3.6% gain in Recall@50 over baseline matrix factorization.",
    primaryMetric: {
      label: "Recall@10 Gain",
      value: "+4.2% lift",
    },
    metrics: [
      {
        label: "Recall@10 Lift",
        value: "+4.2%",
        change: "Significant",
        description: "Compared to matrix factorization baseline",
      },
      {
        label: "Recall@50 Lift",
        value: "+3.6%",
        change: "Better discovery",
        description: "Captures long-tail item affinity across user segments",
      },
      {
        label: "Embedding Dimension",
        value: "128-dim",
        change: "Compact",
        description: "High-density normalized latent representation",
      },
      {
        label: "Retrieval Latency",
        value: "<2.4ms",
        change: "Real-time",
        description: "FAISS IVF-PQ vector index on 1M+ catalog items",
      },
    ],
    techStack: ["PyTorch", "FAISS", "Python", "NumPy", "Scikit-Learn", "CUDA"],
    problem: {
      context:
        "Large-scale recommendation systems with millions of catalog items cannot score every user-item pair with heavy deep networks in real-time. Candidate retrieval must narrow down millions of candidates to the top-100 within a few milliseconds while preserving cross-modal semantic relevance.",
      painPoints: [
        "Matrix factorization failing to capture complex non-linear user preferences",
        "High inference latency making deep cross-attention networks unusable for candidate generation",
        "Cold-start item retrieval failing without content and metadata feature integration",
      ],
      constraints: [
        "Sub-5ms candidate retrieval for 1M+ candidate items",
        "Decoupled user and item towers allowing asynchronous offline item embedding indexing",
        "Loss function robust to positive interaction sparsity",
      ],
    },
    solution: {
      overview:
        "Architected a symmetric two-tower neural network: Query Tower encodes user history; Item Tower encodes item metadata. The towers project into a shared 128-dimensional metric space optimized via InfoNCE contrastive loss, enabling FAISS to retrieve top candidates with simple dot-product similarity.",
      architectureHighlights: [
        "User Tower: Deep MLP with residual connections encoding user engagement history",
        "Item Tower: Entity embedding network projecting catalog features into shared latent space",
        "InfoNCE Contrastive Loss: In-batch negatives for efficient representation learning",
        "FAISS IVF-PQ Index: Sub-2.4ms approximate nearest neighbor (ANN) retrieval",
      ],
      tradeOffs: [
        {
          choice: "Two-Tower Dual Encoder with FAISS",
          alternative: "Heavy Cross-Attention Network",
          reason: "Decoupled item embeddings can be precomputed and indexed in FAISS, enabling 2.4ms candidate generation vs 150ms for cross-attention.",
        },
        {
          choice: "InfoNCE Loss with In-Batch Negatives",
          alternative: "Binary Cross-Entropy (BCE)",
          reason: "InfoNCE prevents gradient saturation and learns more discriminative embeddings across large catalogs without sampling overhead.",
        },
      ],
    },
    architecture: {
      diagramDescription: "Two-Tower Architecture: User Features -> User Tower | Item Features -> Item Tower -> Dot Product & InfoNCE Loss",
      nodes: [
        {
          id: "user-features",
          title: "User Context & History",
          type: "input",
          description: "User engagement history, demographic features, session context",
          tech: "PyTorch Tensors",
        },
        {
          id: "user-tower",
          title: "User Encoder Tower",
          type: "process",
          description: "Multi-layer perceptron mapping user context into 128-dim normalized embedding",
          tech: "PyTorch / ReLU / Dropout",
        },
        {
          id: "item-tower",
          title: "Item Encoder Tower",
          type: "process",
          description: "Projects catalog metadata into identical 128-dim metric space",
          tech: "PyTorch / EmbeddingBag",
        },
        {
          id: "faiss-index",
          title: "FAISS Vector Retrieval",
          type: "output",
          description: "Sub-2.4ms inner product maximum search returning Top-100 candidates",
          tech: "FAISS IVF-PQ Index",
        },
      ],
      dataFlowSteps: [
        "User opens feed; user context vector is fed into User Tower to generate 128-dim vector",
        "Precomputed 128-dim item embeddings reside inside memory-mapped FAISS index",
        "FAISS executes GPU-accelerated maximum inner product search across 1M items in <2.4ms",
        "Top-100 candidates dispatched to downstream ranking stage with +4.2% Recall@10 gain",
      ],
    },
    codeHighlights: [
      {
        title: "InfoNCE Contrastive Loss Implementation (PyTorch)",
        language: "python",
        code: `class InfoNCELoss(nn.Module):
    def __init__(self, temperature: float = 0.07):
        super().__init__()
        self.temperature = temperature
        
    def forward(self, user_embeddings: torch.Tensor, item_embeddings: torch.Tensor) -> torch.Tensor:
        u_norm = F.normalize(user_embeddings, p=2, dim=1)
        i_norm = F.normalize(item_embeddings, p=2, dim=1)
        logits = torch.matmul(u_norm, i_norm.T) / self.temperature
        labels = torch.arange(user_embeddings.size(0), device=user_embeddings.device)
        return (F.cross_entropy(logits, labels) + F.cross_entropy(logits.T, labels)) / 2.0`,
        explanation:
          "Leverages in-batch negatives to train discriminative representations without generating expensive negative sample pairs.",
      },
    ],
    interactiveDemoType: "two-tower",
  },
];



export const PROFILE_DATA = {
  name: "Arush Jain",
  title: "AI Systems & Full-Stack Engineer",
  status: "Scalable AI Systems • Multi-Agent Workflows • Full-Stack Engineering",
  location: "IIITDM Jabalpur / Remote",
  education: "B.Tech in Smart Manufacturing, IIITDM Jabalpur (2023 - Present)",
  contact: {
    email: "jainarush423@gmail.com",
    phone: "+91 91713 56822",
  },
  coreFocus: [
    "Full-Stack Applications",
    "Scalable AI Systems",
    "Multi-Agent Workflows",
    "Data Structures & Algorithms",
  ],
  bio: "Engineering scalable AI systems, multi-agent workflows, and robust full-stack applications with deep algorithmic foundations in data structures and systems design.",
  heroHeadline: "Building scalable AI systems, multi-agent workflows, and robust full-stack applications.",
  heroPunchline: "Building scalable AI systems, multi-agent workflows, and robust full-stack applications.",
  stats: [
    { label: "RailRoute Latency", value: "1.45s (-55%)" },
    { label: "Legal RAG Precision", value: "94.2% P@4" },
    { label: "Stockout Reduction", value: "11% (from 48%)" },
    { label: "Recommender Lift", value: "+4.2% R@10" },
  ],
  systemSpecs: {
    education: "IIITDM Jabalpur (2023 - Present)",
    degree: "B.Tech in Smart Manufacturing",
    honors: "Amazon ML Summer School 2026 • Patent Holder",
    runtime: "Next.js 14 App Router + FastAPI & Python",
    architecture: "Multi-Agent DAGs & Full-Stack Ecosystems",
    styling: "Tailwind CSS + Class-Based Dark Mode",
    motion: "Framer Motion Interactive Bento Grid",
    copilot: "In-Memory Semantic Vector Retrieval & Grounded RAG",
  },
  socialLinks: [
    { label: "GitHub", url: "https://github.com/Slash-495", icon: "Github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/#", icon: "Linkedin", isPlaceholder: true },
    { label: "LeetCode", url: "https://leetcode.com/u/Slash495/", icon: "Code2", isPlaceholder: false },
    { label: "Email", url: "mailto:jainarush423@gmail.com", icon: "Mail" },
    { label: "Phone", url: "tel:+919171356822", icon: "Phone" },
  ],
};

export interface AchievementItem {
  id: string;
  title: string;
  badge: string;
  category: "Intellectual Property" | "Elite Selection" | "Education" | "Algorithms" | "Open Source";
  year: string;
  organization: string;
  description: string;
  highlights: string[];
  metrics?: { label: string; value: string }[];
  verificationLink?: { label: string; url: string };
  patentNumber?: string;
  iconName?: "Award" | "FileCheck2" | "GraduationCap" | "Code2" | "Terminal";
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "amazon-ml-summer-school",
    title: "Amazon ML Summer School 2026",
    badge: "SELECTIVE // TOP TIER",
    category: "Elite Selection",
    year: "2026",
    organization: "Amazon India",
    description:
      "Selected among thousands of applicants across premier Indian engineering institutions for intensive training and direct mentorship by Amazon Machine Learning Scientists. Immersed in foundational ML theory, large-scale deep learning, and frontier generative AI architectures.",
    highlights: [
      "Rigorous technical selection covering algorithms, probability, linear algebra, and machine learning fundamentals",
      "Mentorship curriculum: Deep Learning, Sequence Models, Generative AI & Large Language Models (LLMs)",
      "Industry-scale architectural patterns for distributed training, low-latency model inference, and AI safety",
    ],
    metrics: [
      { label: "Acceptance", value: "Top Tier Nationwide" },
      { label: "Curriculum", value: "GenAI & Scalable ML" },
    ],
    iconName: "Award",
  },
  {
    id: "two-wheeler-footrest-patent",
    title: "Centrifugal Speed Interlock Footrest Mechanism for Two-Wheelers",
    badge: "PATENT APPLICATION NO. 202421034177",
    category: "Intellectual Property",
    year: "2024",
    organization: "Indian Patent Office",
    patentNumber: "202421034177",
    description:
      "Invented and patented a novel safety footrest mechanism for two-wheelers. Employs a mechanical centrifugal flyweight interlock system that restricts footrest deployment when vehicle velocity exceeds 5 km/h, preventing severe pillion foot entrapment and road contact injuries.",
    highlights: [
      "Passive centrifugal governor: Locks footrest actuation above 5 km/h with 100% mechanical fail-safety",
      "Zero parasitic battery draw: Eliminates complex electrical actuators and vulnerability to electrical failure",
      "Complete CAD modeling, dynamic kinematic simulation, and physical prototype fabrication at IIITDMJ",
    ],
    metrics: [
      { label: "Interlock Speed", value: "≤ 5 km/h" },
      { label: "Safety Rating", value: "100% Fail-Safe" },
    ],
    iconName: "FileCheck2",
  },
  {
    id: "iiitdm-jabalpur-education",
    title: "B.Tech in Smart Manufacturing @ IIITDM Jabalpur",
    badge: "ACADEMIC STANDING",
    category: "Education",
    year: "2023 - Present",
    organization: "Indian Institute of Information Technology, Design & Manufacturing, Jabalpur",
    description:
      "Pursuing Bachelor of Technology with an interdisciplinary curriculum merging computational intelligence, autonomous robotic manufacturing, discrete optimization, and modern systems architecture.",
    highlights: [
      "Core Coursework: Data Structures & Algorithms, Systems Design, Robotics & Automation, Probability & Statistics",
      "Research & innovation focus on autonomous decision agents and mechanical-computational safety systems",
      "Active contributor in institute technical fests, hackathons, and software engineering initiatives",
    ],
    metrics: [
      { label: "Institute", value: "IIITDM Jabalpur" },
      { label: "Discipline", value: "Smart Manufacturing" },
    ],
    iconName: "GraduationCap",
  },
  {
    id: "algorithmic-problem-solving",
    title: "Competitive Programming & Problem Solving Mastery",
    badge: "400+ PROBLEMS SOLVED",
    category: "Algorithms",
    year: "2024 - Present",
    organization: "LeetCode & Codeforces",
    description:
      "Demonstrated strong mathematical and algorithmic intuition by solving 400+ problems spanning graph algorithms, topological sorts, dynamic programming, and systems design. Built and open-sourced LeetLens to empower other developers with runtime AST execution trace visualizers.",
    highlights: [
      "Extensive problem solving across advanced dynamic programming, Dijkstra/A* graphs, and binary search",
      "Creator of LeetLens: AI-powered LeetCode Chrome extension featuring automated Solution Review & recursion trees",
      "Strict zero-leakage BYOK architecture prioritizing user privacy and local-first execution",
    ],
    metrics: [
      { label: "Solved Count", value: "400+ Problems" },
      { label: "Created Tool", value: "LeetLens (Open Source)" },
    ],
    verificationLink: {
      label: "View LeetCode Profile",
      url: "https://leetcode.com/u/Slash495/",
    },
    iconName: "Code2",
  },
  {
    id: "open-source-production-shipments",
    title: "Shipped Real-World Multi-Agent & Full-Stack Systems",
    badge: "4+ PRODUCTION DEPLOYMENTS",
    category: "Open Source",
    year: "2024 - 2025",
    organization: "Global Open Source & Live Users",
    description:
      "Built and deployed end-to-end production applications with live user-facing deployments: Duffy voice-native language ecosystem, Chambers GST-RAG legal intelligence, RailRoute Finder multi-agent triaging, and Velora cloud platform.",
    highlights: [
      "Duffy (Live): Real-time Web Speech API voice AI with SuperMemo-2 spaced repetition (duffy.onrender.com)",
      "Chambers GST-RAG (Live): Dual-stream FAISS + BM25 hybrid retrieval cutting hallucinations to 2.1%",
      "RailRoute Finder (Live): 3-agent orchestration discovering split-journey train routes with 1.45s response",
      "Velora (Live): High-concurrency full-stack Next.js cloud app with sub-45ms APIs and optimistic UI",
    ],
    metrics: [
      { label: "Deployed Systems", value: "4 Live Web Apps" },
      { label: "Source Code", value: "100% Publicly Available" },
    ],
    verificationLink: {
      label: "Explore GitHub Profile",
      url: "https://github.com/Slash-495",
    },
    iconName: "Terminal",
  },
];
