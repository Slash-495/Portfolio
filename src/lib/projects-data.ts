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
  category: "AI Systems" | "Data & Analytics" | "Full Stack" | "Applied ML";
  status: "PRODUCTION" | "DEPLOYED" | "PATENT PENDING" | "SELECTED";
  year: string;
  githubUrl: string;
  liveUrl?: string;
  coldStartNote?: string;
  isExtensionOrRepoOnly?: boolean;
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
    | "patent-footrest"
    | "olist"
    | "optimetrics"
    | "roznamcha";
}

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: "railroute-agent",
    slug: "railroute-agent",
    title: "RailRoute Agent",
    tagline: "3-agent (Planner / Verifier / Ranker) system for operationally-safe split-journey train routing",
    category: "AI Systems",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/Rail-Route-Finder",
    liveUrl: "https://rail-route-finder.streamlit.app/",
    coldStartNote: "Hosted on Streamlit Cloud • May take ~30s to wake from sleep",
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
        change: "+52%",
        description: "Zero layover misses or impossible cross-station connections",
      },
      {
        label: "End-to-End Latency",
        value: "1.45s",
        change: "-54.7%",
        description: "Cut from 3.2s via parallelized async tool invocation",
      },
      {
        label: "Split-Journey Discovery",
        value: "94.8%",
        change: "High recall",
        description: "Finds viable alternatives for waitlisted routes across 500+ Indian Railway stations",
      },
      {
        label: "Verification Overhead",
        value: "85ms",
        change: "Deterministic",
        description: "Deterministic timetable rule validator runs prior to LLM presentation",
      },
    ],
    techStack: ["Python", "Gemini 1.5 Pro", "Streamlit", "AsyncIO", "Pydantic", "NetworkX"],
    problem: {
      context:
        "Direct Indian Railway journeys frequently face severe ticket waitlists. Split-journey ticketing (booking Leg A -> B then B -> C) often uncovers available seats, but manual search requires checking hundreds of station combinations while accounting for platform walking times and schedule delays.",
      painPoints: [
        "Millions of travelers stranded due to waitlisted end-to-end tickets",
        "Combinatorial explosion of split routing (O(N^2) station paths)",
        "Stochastic LLMs recommending impossible connections (<15 min layovers or wrong stations)",
      ],
      constraints: [
        "Mandatory minimum 45-minute buffer for cross-platform transfers",
        "Strict 120-minute maximum layover to preserve passenger comfort",
        "Response returned within 2.0s to ensure interactive web usability",
      ],
    },
    solution: {
      overview:
        "Engineered a deterministic 3-agent architecture that completely separates generative candidate discovery from operational validation and preference ranking.",
      architectureHighlights: [
        "Planner Agent: Generates candidate junction splits based on high-frequency transit hubs",
        "Verifier Agent: Non-LLM deterministic rules engine verifying timetable validity, buffer limits, and seat availability",
        "Ranker Agent: Multi-attribute utility function scoring itineraries on total travel duration, layover comfort, and seat certainty",
      ],
      tradeOffs: [
        {
          choice: "Deterministic Python verifier over LLM self-reflection",
          alternative: "Prompting LLM to verify its own itinerary",
          reason:
            "LLMs struggle with temporal arithmetic. A hardcoded Python validator guarantees 100% operational safety with 85ms overhead versus 1.5s additional LLM latency.",
        },
        {
          choice: "Parallel async route generation",
          alternative: "Sequential agent pipeline",
          reason: "Reduced end-to-end response time from 3.2s to 1.45s, well within interactive web thresholds.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Topologically sorted multi-agent graph: User Query -> Station Ingress -> Planner Agent -> Timetable Ingestion -> Deterministic Verifier -> Ranker -> Streamlit UI",
      nodes: [
        {
          id: "ingress",
          title: "Query Ingress",
          type: "input",
          description: "Source station, destination station, journey date",
          tech: "Pydantic / Streamlit",
        },
        {
          id: "planner",
          title: "Planner Agent",
          type: "process",
          description: "Evaluates junction topology and proposes top candidate split hubs",
          tech: "Gemini 1.5 Pro",
        },
        {
          id: "verifier",
          title: "Deterministic Verifier",
          type: "process",
          description: "Validates minimum 45m / max 120m transfer buffers against live schedules",
          tech: "Python Rule Engine",
        },
        {
          id: "ranker",
          title: "Ranker Agent",
          type: "output",
          description: "Optimizes Pareto frontier of duration, buffer comfort, and cost",
          tech: "Utility Function",
        },
      ],
      dataFlowSteps: [
        "User specifies Origin (e.g. NDLS) and Destination (e.g. BSB) with travel date",
        "Planner Agent identifies major viable intermediate junction stations (e.g. CNB, LKO)",
        "Schedule API queries live train timetables for both legs asynchronously",
        "Deterministic Verifier rejects candidates with <45m or >120m layover",
        "Valid itineraries scored and ranked based on traveler utility",
        "Streamlit UI streams results to the user with booking advice",
      ],
    },
    codeHighlights: [
      {
        title: "Deterministic Layover Safety Guardrail",
        language: "python",
        code: `def verify_layover_safety(leg1_arrival: datetime, leg2_departure: datetime) -> VerificationResult:
    layover_minutes = (leg2_departure - leg1_arrival).total_seconds() / 60.0
    
    # Non-negotiable operational safety rules
    if layover_minutes < 45:
        return VerificationResult(
            is_valid=False, 
            reason="Violation: Minimum 45-min buffer required for station transfer"
        )
    if layover_minutes > 180:
        return VerificationResult(
            is_valid=False, 
            reason="Violation: Layover exceeds 3 hours, unviable for split ticket"
        )
        
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
    category: "AI Systems",
    status: "PRODUCTION",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/GST-RAG",
    liveUrl: "https://chambersandinfastructures.streamlit.app/",
    coldStartNote: "Hosted on Streamlit Cloud • May take ~30s to wake from sleep",
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
        change: "+31.7%",
        description: "Exact statutory sub-clause retrieval on complex GST queries",
      },
      {
        label: "Retrieval Latency",
        value: "285ms",
        change: "p95",
        description: "Dense FAISS + BM25 fused with Reciprocal Rank Fusion (RRF)",
      },
      {
        label: "Corpus Scale",
        value: "1,200+ Pages",
        change: "Full Act",
        description: "Entire Indian GST Act, Circulars, Notifications & Case Law",
      },
    ],
    techStack: ["FastAPI", "FAISS", "BM25", "Cohere Rerank", "LangChain", "Streamlit", "AWS"],
    problem: {
      context:
        "The Indian GST framework contains thousands of interdependent circulars, cross-referencing statutory sections and compounding exemptions. Standard embedding-based RAG models hallucinate legal interpretations because vector similarity alone confuses section numbers (e.g. Section 16(2) vs Section 16(4)).",
      painPoints: [
        "Dense vectors fail on exact alphanumeric statutory citations (e.g. Rule 86B)",
        "Naive chunking cuts clauses in half, destroying conditional legal qualifications",
        "Hallucinated citations lead to legal penalties and incorrect tax filings",
      ],
      constraints: [
        "Zero hallucination tolerance on statutory citations and tax rate exemptions",
        "Exact clause-level citation attribution on every generated response",
        "Sub-second end-to-end response for interactive legal counsel use",
      ],
    },
    solution: {
      overview:
        "Built a dual-stream hybrid pipeline combining dense semantic vector search with sparse BM25 keyword matching, integrated with hierarchical clause-aware chunking and Cohere neural re-ranking.",
      architectureHighlights: [
        "Hierarchical Clause-Aware Chunking: Preserves statutory parent-child relationships",
        "Dual-Stream Retrieval: Dense FAISS (conceptual semantic match) + BM25 (exact section/rule match)",
        "Reciprocal Rank Fusion (RRF, k=60): Normalizes and merges dense and sparse scores",
        "Cohere Cross-Encoder Rerank: Top-25 candidates compressed to top-4 high-precision contexts",
      ],
      tradeOffs: [
        {
          choice: "Hybrid dense + sparse with RRF over vector-only retrieval",
          alternative: "Pure OpenAI text-embedding-3-large vector search",
          reason:
            "Vector search alone misses exact statutory section tokens like '16(4)'. BM25 ensures 100% keyword recall for alphanumeric legal identifiers.",
        },
        {
          choice: "Cross-encoder re-ranking over LLM context stuffing",
          alternative: "Passing top-20 retrieved chunks directly to LLM prompt",
          reason:
            "Cross-encoders eliminate irrelevant noise and attention distraction ('lost in the middle'), reducing prompt cost by 78% and boosting answer precision.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Dual-stream retrieval pipeline: Legal Query -> Query Expander -> Parallel Stream [FAISS Dense + BM25 Sparse] -> Reciprocal Rank Fusion (k=60) -> Cohere Rerank -> Grounded Generation",
      nodes: [
        {
          id: "query",
          title: "Legal Query",
          type: "input",
          description: "Statutory query or tax rate dispute",
          tech: "FastAPI Ingress",
        },
        {
          id: "dense",
          title: "FAISS Dense Stream",
          type: "process",
          description: "HNSW index over 1536-dim legal embeddings",
          tech: "FAISS HNSW",
        },
        {
          id: "sparse",
          title: "BM25 Sparse Stream",
          type: "process",
          description: "Inverted index tuned for section numbers & alphanumeric keywords",
          tech: "rank_bm25",
        },
        {
          id: "rrf",
          title: "RRF & Cohere Rerank",
          type: "process",
          description: "Fuses rankings and scores top-4 most authoritative context passages",
          tech: "Cohere API / RRF",
        },
        {
          id: "synthesis",
          title: "Grounded Synthesizer",
          type: "output",
          description: "Generates legal opinion strictly citing retrieved statutory clauses",
          tech: "Gemini / Claude",
        },
      ],
      dataFlowSteps: [
        "User submits legal tax query (e.g. 'Conditions for claiming Input Tax Credit under Section 16')",
        "Query expander extracts statutory references and synonyms",
        "Dense FAISS retrieves top-25 semantically similar passages",
        "Sparse BM25 retrieves top-25 exact statutory keyword matches",
        "Reciprocal Rank Fusion merges streams into unified 35-candidate pool",
        "Cohere cross-encoder reranker picks top-4 authoritative chunks",
        "Synthesizer generates formal legal breakdown with bracketed section citations",
      ],
    },
    codeHighlights: [
      {
        title: "Reciprocal Rank Fusion (RRF) Implementation",
        language: "python",
        code: `def reciprocal_rank_fusion(dense_ranks: list[str], sparse_ranks: list[str], k: int = 60) -> list[tuple[str, float]]:
    scores: dict[str, float] = {}
    
    # Process dense vector rankings
    for rank, doc_id in enumerate(dense_ranks):
        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    # Process sparse BM25 rankings
    for rank, doc_id in enumerate(sparse_ranks):
        scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
        
    # Sort merged candidate pool by fused score
    fused_results = sorted(scores.items(), key=lambda x: x[1], reverse=True)
    return fused_results`,
        explanation:
          "RRF blends heterogeneous retrieval scores without requiring fragile calibration or arbitrary manual weights.",
      },
    ],
    interactiveDemoType: "legal-rag",
  },
  {
    id: "roznamcha",
    slug: "roznamcha",
    title: "Roznamcha",
    tagline: "Customer Analytics & CRM platform with native PostgreSQL RFM segmentation and cohort retention",
    category: "Data & Analytics",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/Roznamcha",
    liveUrl: "https://roznamcha-ivj4.vercel.app/",
    summary:
      "Architected a modern Customer Analytics and CRM platform engineered to demonstrate advanced SQL proficiency. Heavy data aggregation, mathematical scoring, and time-series retention logic execute natively inside PostgreSQL database views using NTILE(5) window functions and recursive CTEs, served to a responsive Next.js analytics dashboard.",
    primaryMetric: {
      label: "SQL Execution",
      value: "Native PostgreSQL Views",
    },
    metrics: [
      {
        label: "Segmentation",
        value: "RFM Quintiles",
        change: "Automated",
        description: "NTILE(5) window function dynamically scores 1-5 across R, F, M partitioned by merchant",
      },
      {
        label: "Retention Engine",
        value: "Monthly Cohort CTEs",
        change: "Recursive",
        description: "Tracks customer repeat purchase velocity over subsequent months",
      },
      {
        label: "Query Latency",
        value: "<45ms",
        change: "Optimized",
        description: "Pre-computed database views eliminate client-side JavaScript calculation lag",
      },
      {
        label: "Architecture",
        value: "Next.js + Prisma",
        change: "Production",
        description: "Full-stack cloud deployment on Vercel with responsive merchant UI",
      },
    ],
    techStack: ["PostgreSQL", "Next.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "SQL CTEs"],
    problem: {
      context:
        "Modern e-commerce and retail merchants need real-time visibility into customer retention, churn velocity, and lifetime value without burdening browser clients or experiencing query timeouts over large transaction logs.",
      painPoints: [
        "Client-side analytics cause browser freeze and high memory consumption on 10k+ rows",
        "Lack of automated customer categorization (Champions, Loyal, At-Risk)",
        "Complex time-series retention matrices are difficult to maintain without clean SQL views",
      ],
      constraints: [
        "Execute 100% of mathematical scoring and quintile partitioning natively on PostgreSQL",
        "Maintain sub-50ms API response times across multi-merchant partitions",
        "Deliver actionable retention playbooks for each segmented cohort",
      ],
    },
    solution: {
      overview:
        "Built a dual-view database architecture in PostgreSQL: one view computes dynamic RFM quintiles partitioned by merchant using NTILE(5), while another calculates month-over-month customer retention cohorts via Common Table Expressions (CTEs).",
      architectureHighlights: [
        "PostgreSQL NTILE(5) window functions partitioned by merchant_id",
        "Recursive SQL CTEs calculating cohort retention matrices over acquisition months",
        "Next.js App Router API endpoints querying views with sub-50ms latency",
        "Actionable cohort playbooks for automated win-back and loyalty campaigns",
      ],
      tradeOffs: [
        {
          choice: "Database Views with NTILE(5) over client-side JavaScript calculation",
          alternative: "Streaming raw transactions to the browser and computing in JS",
          reason:
            "Leveraging PostgreSQL's native query optimizer eliminates 90% of payload size and prevents client browser freezes on large merchant histories.",
        },
        {
          choice: "Cohort CTE aggregation over third-party analytics SDKs",
          alternative: "Embedding proprietary SaaS analytics widgets",
          reason:
            "Ensures 100% merchant data privacy, zero recurring vendor costs, and unlimited custom reporting flexibility.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Data Pipeline: Merchant Orders -> PostgreSQL Ingress -> Dynamic RFM View (NTILE 5) & Cohort Retention CTEs -> Prisma ORM -> Next.js Dashboard -> Vercel Deployment",
      nodes: [
        {
          id: "orders",
          title: "Orders Database",
          type: "storage",
          description: "Relational purchase history with merchant_id, customer_id, and amounts",
          tech: "PostgreSQL",
        },
        {
          id: "rfm-view",
          title: "RFM Quintile View",
          type: "process",
          description: "Dynamic NTILE(5) scoring across Recency, Frequency, and Monetary spend",
          tech: "SQL Window Functions",
        },
        {
          id: "cohort-view",
          title: "Cohort Retention View",
          type: "process",
          description: "Month-by-month repeat purchase tracking CTEs",
          tech: "SQL CTEs",
        },
        {
          id: "dashboard",
          title: "Merchant Dashboard",
          type: "output",
          description: "Interactive cohort heatmaps and segment distribution charts",
          tech: "Next.js + Tailwind",
        },
      ],
      dataFlowSteps: [
        "Customer transactions recorded with merchant_id, customer_id, timestamp, and amount",
        "PostgreSQL views execute NTILE(5) partitions to assign quintile scores across R, F, and M",
        "Qualitative segment labels (Champions, Loyal, At-Risk) assigned based on RFM score composite",
        "Cohort CTEs evaluate repeat transactions grouped by acquisition month",
        "Next.js merchant dashboard queries views with instant sub-50ms response",
      ],
    },
    codeHighlights: [
      {
        title: "PostgreSQL RFM NTILE(5) Quintile Scoring View",
        language: "sql",
        code: `CREATE OR REPLACE VIEW rfm_scores AS
SELECT 
  customer_id,
  merchant_id,
  NTILE(5) OVER (PARTITION BY merchant_id ORDER BY last_order_date ASC) as r_score,
  NTILE(5) OVER (PARTITION BY merchant_id ORDER BY total_orders ASC) as f_score,
  NTILE(5) OVER (PARTITION BY merchant_id ORDER BY total_spend ASC) as m_score
FROM merchant_customer_aggregates;`,
        explanation:
          "Leverages database window functions to dynamically partition and score customers relative to their peer group.",
      },
    ],
    interactiveDemoType: "roznamcha",
  },
  {
    id: "olist-analytics",
    slug: "olist-analytics",
    title: "Olist E-Commerce Analytics Engine",
    tagline: "Containerized ELT data warehouse and Metabase BI engine over 100k+ Brazilian marketplace orders",
    category: "Data & Analytics",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/Olist-Analytics-Engine",
    summary:
      "Built an end-to-end Data Engineering & Analytics Warehouse Engine on 100,000+ real orders from the Kaggle Olist Brazilian e-commerce dataset. Orchestrated a containerized PostgreSQL 15 warehouse via Docker Compose, automated ingestion pipelines, and built a 4-layer ELT SQL model (raw -> staging -> intermediate -> marts) feeding interactive Metabase BI dashboards.",
    primaryMetric: {
      label: "Logistics Churn Impact",
      value: "R$ 1.73M Quantified",
    },
    metrics: [
      {
        label: "Order Volume",
        value: "100k+ Orders",
        change: "Kaggle Olist",
        description: "Relational data across customers, products, payments, sellers, and geolocation",
      },
      {
        label: "Review Drop",
        value: "-2.4 Stars",
        change: "Penalty",
        description: "Quantified review score drop resulting from delivery delays",
      },
      {
        label: "Repeat Buyer AOV",
        value: "2.4x Higher",
        change: "Retention",
        description: "Repeat buyers account for 2.4x higher average order value",
      },
      {
        label: "ELT Pipeline",
        value: "4-Layer SQL",
        change: "PostgreSQL 15",
        description: "raw_data -> staging -> intermediate -> marts architecture",
      },
    ],
    techStack: ["PostgreSQL 15", "Docker Compose", "Metabase BI", "Python 3.10", "SQLAlchemy", "Pandas"],
    problem: {
      context:
        "The Olist e-commerce dataset contains over 100,000 complex relational orders spanning a multi-year Brazilian marketplace. Naive spreadsheet or single-script pandas analyses face performance bottlenecks and fail to capture systemic operational frictions like delivery delays, seller bottlenecks, and customer churn.",
      painPoints: [
        "Inability to join large multi-table datasets in memory without significant lag",
        "Lack of quantified visibility into financial losses caused by logistical delays",
        "Manual reporting workflows that don't scale to recurring operational analytics",
      ],
      constraints: [
        "Containerize the entire warehouse and BI dashboard stack using Docker Compose",
        "Implement a strict 4-layer ELT architecture separating raw data from reporting marts",
        "Ensure dimensional marts execute queries in Metabase under 100ms",
      ],
    },
    solution: {
      overview:
        "Architected a production-grade ELT pipeline that automates ingestion, structures staging tables, derives intermediate business metrics, and aggregates dimensional data marts powering Metabase BI executive dashboards.",
      architectureHighlights: [
        "PostgreSQL 15 analytics warehouse containerized with Docker Compose",
        "Automated Kaggle API ingestion into raw_data schema",
        "4-layer SQL transformation model: raw_data -> staging -> intermediate -> marts",
        "Metabase BI connection with pre-built executive dashboards",
      ],
      tradeOffs: [
        {
          choice: "4-layer ELT SQL model in PostgreSQL over Python Pandas transformations",
          alternative: "Running all transformations in memory using Python",
          reason:
            "SQL ELT pipelines in PostgreSQL leverage relational indexing and allow BI tools to query pre-computed dimensional marts directly.",
        },
        {
          choice: "Docker Compose containerization over local standalone installs",
          alternative: "Installing PostgreSQL and Metabase natively on host machine",
          reason: "Ensures reproducible 1-command deployment (`docker-compose up`) across any developer machine.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Data Pipeline: Kaggle API Ingestion -> Dockerized PostgreSQL 15 (Raw Data -> Staging -> Intermediate -> Marts) -> Metabase BI Dashboards",
      nodes: [
        {
          id: "ingestion",
          title: "Kaggle Ingestion",
          type: "input",
          description: "Automated retrieval and staging of 100k+ orders CSV datasets",
          tech: "Python / Kaggle API",
        },
        {
          id: "warehouse",
          title: "PostgreSQL 15 Warehouse",
          type: "storage",
          description: "Relational database with multi-schema data segregation",
          tech: "PostgreSQL 15 / Docker",
        },
        {
          id: "elt-marts",
          title: "Dimensional Marts",
          type: "process",
          description: "Logistics impact, seller performance, and customer lifetime value marts",
          tech: "SQL ELT",
        },
        {
          id: "metabase",
          title: "Metabase BI",
          type: "output",
          description: "Real-time executive dashboards and geographic delay heatmaps",
          tech: "Metabase BI",
        },
      ],
      dataFlowSteps: [
        "Kaggle API script downloads 9 relational datasets into Docker volume",
        "SQLAlchemy copies raw records into raw_data schema",
        "Staging views clean nulls, cast timestamps, and deduplicate records",
        "Intermediate views join orders, items, reviews, and customer geolocations",
        "Dimensional marts compile seller performance, customer retention, and logistics risk",
        "Metabase BI visualizes delay penalties and customer cohort lifetime value",
      ],
    },
    codeHighlights: [
      {
        title: "Logistics Delay & Revenue At Risk Mart SQL",
        language: "sql",
        code: `CREATE OR REPLACE VIEW marts.mart_logistics_impact AS
SELECT 
  c.customer_state,
  COUNT(o.order_id) as total_orders,
  AVG(EXTRACT(DAY FROM (o.order_delivered_customer_date - o.order_estimated_delivery_date))) as avg_delay_days,
  AVG(r.review_score) as avg_review_score,
  SUM(CASE WHEN o.order_delivered_customer_date > o.order_estimated_delivery_date THEN p.payment_value ELSE 0 END) as revenue_at_risk
FROM intermediate.int_order_details o
JOIN staging.stg_customers c ON o.customer_id = c.customer_id
JOIN intermediate.int_order_payments p ON o.order_id = p.order_id
LEFT JOIN staging.stg_order_reviews r ON o.order_id = r.order_id
GROUP BY c.customer_state;`,
        explanation:
          "Computes state-level logistics delay penalties and quantifies revenue at risk directly on the warehouse layer.",
      },
    ],
    interactiveDemoType: "olist",
  },
  {
    id: "optimetrics",
    slug: "optimetrics",
    title: "OptiMetrics",
    tagline: "Statistical A/B experimentation platform detecting hidden segment degradation and novelty decay",
    category: "Data & Analytics",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/OptiMetrics",
    summary:
      "Engineered a production-grade Python and Power BI statistical experimentation platform designed to prevent costly product rollout failures. In a 50,000-user checkout redesign experiment showing a deceptive +47.96% aggregate conversion lift, OptiMetrics detected a severe hidden mobile conversion crash (-47.07%) and 80.7% novelty decay in Week 2, avoiding over $96,300 in lost revenue.",
    primaryMetric: {
      label: "Avoided Loss",
      value: "$96,300+ Saved",
    },
    metrics: [
      {
        label: "Mobile Anomaly",
        value: "-47.07% Crash",
        change: "Anomaly",
        description: "Uncovered hidden mobile failure (9.92% -> 5.25%, p < 0.0001) despite +135.66% desktop lift",
      },
      {
        label: "Novelty Decay",
        value: "80.7% Drop",
        change: "Week 2",
        description: "Conversion lift plummeted from +80.27% (Week 1) to +15.51% (Week 2)",
      },
      {
        label: "SRM Detection",
        value: "Chi-Square Test",
        change: "p = 0.6355",
        description: "Sample Ratio Mismatch verified unbiased 50/50 traffic split",
      },
      {
        label: "Power Analysis",
        value: "±0.81% MDE",
        change: "80% Power",
        description: "Cohen's h statistical power calculation with alpha = 0.05",
      },
    ],
    techStack: ["Python", "SciPy", "Statsmodels", "Power BI", "DAX", "NumPy", "Pandas"],
    problem: {
      context:
        "Product teams frequently rely on naive, surface-level A/B testing aggregates. A checkout redesign experiment on 50,000 users showed an aggregate +47.96% conversion lift, which typically triggers an immediate 100% rollout decision. However, unsegmented metrics often conceal catastrophic subgroup failures.",
      painPoints: [
        "Simpson's Paradox: Aggregate positive lift hiding severe negative conversion in key segments",
        "Novelty Effect: Initial user curiosity inflating early metrics before returning to baseline",
        "Costly Rollouts: Releasing broken variants to mobile users causes direct revenue loss",
      ],
      constraints: [
        "Validate Sample Ratio Mismatch (SRM) using Chi-Square goodness-of-fit",
        "Compute Minimum Detectable Effect (MDE) sensitivity bounds using power analysis",
        "Provide executive segment decision matrix for rollout vs rollback decisions",
      ],
    },
    solution: {
      overview:
        "Built a dual-layer experimentation architecture: a Python statistical engine that runs Chi-Square SRM tests, 2-proportion Z-tests, and Mann-Whitney U tests on average order values, connected to an executive Power BI dashboard with dynamic DAX lift calculations.",
      architectureHighlights: [
        "Automated SRM Chi-Square validation (p = 0.6355 confirming unbiased split)",
        "Device-level segmentation isolating Desktop (+135.66%) vs Mobile (-47.07%) divergence",
        "Temporal cohort decay tracking isolating novelty evaporation across 14 days",
        "Segmented Rollout Strategy: Deploy to Desktop, audit and debug Mobile UX",
      ],
      tradeOffs: [
        {
          choice: "Segmented rollout recommendation over binary 100% ship / abort",
          alternative: "Completely aborting the redesign due to mobile failure",
          reason:
            "Desktop lift was massive and statistically significant (+135.66%). Segmented deployment captured desktop upside while protecting mobile revenue ($96,300+ saved).",
        },
        {
          choice: "Power BI presentation layer over raw Jupyter Notebook reports",
          alternative: "Delivering statistical findings as static Python notebook tables",
          reason:
            "Executive stakeholders require interactive slice-and-dice controls and clear visual confidence intervals to make confident product decisions.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Architecture: User Experiment Logs -> Python Statistical Engine (SciPy / Statsmodels) -> Chi-Square SRM & Z-Tests -> Power BI DAX Presentation Layer",
      nodes: [
        {
          id: "logs",
          title: "Experiment Logs",
          type: "input",
          description: "50,000 user interaction logs with timestamps, device, and conversion flags",
          tech: "NumPy / Pandas",
        },
        {
          id: "srm-test",
          title: "SRM & Power Engine",
          type: "process",
          description: "Chi-Square goodness of fit and Cohen's h MDE power sensitivity",
          tech: "SciPy / Statsmodels",
        },
        {
          id: "segmentation",
          title: "Segmentation Model",
          type: "process",
          description: "Subgroup hypothesis testing and temporal novelty decay evaluation",
          tech: "Python Stats",
        },
        {
          id: "power-bi",
          title: "Executive Dashboard",
          type: "output",
          description: "Interactive DAX metrics, confidence intervals, and rollout decision matrix",
          tech: "Power BI / DAX",
        },
      ],
      dataFlowSteps: [
        "Ingests 50,000 user session records across control and variant buckets",
        "Runs Chi-Square test verifying 50/50 allocation without traffic bias (p = 0.6355)",
        "Calculates 2-proportion Z-test and 95% confidence intervals on conversion lift",
        "Disaggregates results by device type, detecting mobile conversion crash (-47.07%)",
        "Tracks week-over-week lift decay, discovering 80.7% novelty fade in Week 2",
        "Outputs segmented rollout playbook preventing $96,300 in lost mobile revenue",
      ],
    },
    codeHighlights: [
      {
        title: "Sample Ratio Mismatch (SRM) & Z-Test Python Script",
        language: "python",
        code: `from scipy import stats
import statsmodels.stats.proportion as prop

def evaluate_experiment_rigor(control_users, variant_users, control_conv, variant_conv):
    # 1. Sample Ratio Mismatch (SRM) Test
    observed = [control_users, variant_users]
    expected = [(control_users + variant_users) / 2] * 2
    chi2_stat, srm_p_value = stats.chisquare(f_obs=observed, f_exp=expected)
    
    # 2. Two-Proportion Z-Test
    count = [variant_conv, control_conv]
    nobs = [variant_users, control_users]
    z_stat, z_p_value = prop.proportions_ztest(count, nobs)
    ci_low, ci_high = prop.confint_proportions_2indep(variant_conv, variant_users, control_conv, control_users)
    
    return {
        "srm_passed": srm_p_value > 0.01,
        "srm_p": srm_p_value,
        "z_p_value": z_p_value,
        "ci_95": (ci_low, ci_high)
    }`,
        explanation:
          "Verifies traffic allocation integrity before calculating hypothesis tests and confidence intervals.",
      },
    ],
    interactiveDemoType: "optimetrics",
  },
  {
    id: "leetlens",
    slug: "leetlens",
    title: "LeetLens",
    tagline: "AI-Powered LeetCode coding assistant & Chrome extension with execution visualizer",
    category: "Full Stack",
    status: "DEPLOYED",
    year: "2025",
    githubUrl: "https://github.com/Slash-495/LeetLens",
    isExtensionOrRepoOnly: true,
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
        "100% local storage of user API keys (BYOK) with zero telemetry leakage",
        "Instant DOM extraction of LeetCode problem descriptions and code editors",
        "Seamless overlay with zero layout shifts on LeetCode's dynamic Monaco editor",
      ],
    },
    solution: {
      overview:
        "Built LeetLens using Chrome Extension Manifest V3. It hooks into the LeetCode DOM, extracts active problem context, and runs Socratic, tiered hints, code reviews, and recursive state visualization using user-supplied local API keys.",
      architectureHighlights: [
        "Manifest V3 Content Script injecting non-invasive floating mentor drawer",
        "DOM Observer targeting Monaco Editor instances to extract code in real time",
        "Solution Review Engine: Socratic hints, edge-case audit, and Big-O verification",
        "Interactive Execution Trace Visualizer rendering recursive call stacks step by step",
      ],
      tradeOffs: [
        {
          choice: "Local client-side execution (BYOK) over hosted backend proxy",
          alternative: "Centralized server storing keys and routing AI requests",
          reason:
            "Zero operating server costs, infinite scalability, and total privacy for developers practicing proprietary or competitive code.",
        },
        {
          choice: "Socratic tiered hints over instant code completions",
          alternative: "Generating full code solutions immediately",
          reason:
            "Encourages genuine problem-solving intuition rather than mindless copy-pasting during interview preparation.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Manifest V3 Pipeline: LeetCode DOM -> Content Script -> BYOK Local Storage -> Gemini AI -> Interactive Trace Overlay",
      nodes: [
        {
          id: "leetcode-dom",
          title: "LeetCode DOM Ingress",
          type: "input",
          description: "Extracts problem title, description, constraints, and Monaco code buffer",
          tech: "DOM MutationObserver",
        },
        {
          id: "storage",
          title: "BYOK Secure Vault",
          type: "storage",
          description: "Encrypted API keys stored exclusively on client machine",
          tech: "chrome.storage.local",
        },
        {
          id: "ai-engine",
          title: "Socratic Analysis Engine",
          type: "process",
          description: "Generates progressive hints, complexity audits, and recursive trees",
          tech: "Gemini 1.5 Flash",
        },
        {
          id: "ui-drawer",
          title: "Slide-Over Overlay",
          type: "output",
          description: "Non-intrusive floating workbench embedded inside the active tab",
          tech: "React 18 / Tailwind",
        },
      ],
      dataFlowSteps: [
        "User opens LeetCode problem; content script detects active slug and language context",
        "User requests review or visual trace for their current editor code buffer",
        "Extension retrieves local API key from chrome.storage.local without any proxy server",
        "Prompts Gemini API with strict Socratic review instructions and problem constraints",
        "Streams structured feedback, Big-O breakdown, and recursion trees directly into overlay",
      ],
    },
    codeHighlights: [
      {
        title: "BYOK Direct Client API Completion",
        language: "typescript",
        code: `async function generateSocraticReview(code: string, problemContext: ProblemContext, apiKey: string) {
  const endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  
  const response = await fetch(\`\${endpoint}?key=\${apiKey}\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: \`Review this LeetCode solution for \${problemContext.title}:\\n\${code}\\nAnalyze Big-O, edge cases, and comparison without spoiling optimal solution.\` }]
      }]
    })
  });
  
  return await response.json();
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
    category: "Full Stack",
    status: "DEPLOYED",
    year: "2024",
    githubUrl: "https://github.com/Slash-495/Duffy",
    liveUrl: "https://duffy.onrender.com/",
    coldStartNote: "Hosted on Render Free Tier • May take ~30s to wake from sleep",
    summary:
      "Architected a comprehensive language immersion web platform combining an intelligent Spaced Repetition System (SRS) for custom flashcards, real-time in-browser neural voice recognition via the Web Speech API with dynamic pronunciation scoring, Gemini-powered conversational scenario roleplay personas, and B2B classroom roster management.",
    primaryMetric: {
      label: "In-Browser Voice AI",
      value: "Zero-Latency Native Speech",
    },
    metrics: [
      {
        label: "Voice Recognition",
        value: "Web Speech API",
        change: "Client-native",
        description: "Zero external audio upload latency for real-time pronunciation checks",
      },
      {
        label: "SRS Algorithm",
        value: "SuperMemo-2",
        change: "Mathematical",
        description: "Dynamically schedules card reviews based on user recall grade",
      },
      {
        label: "AI Personas",
        value: "Interactive Scenarios",
        change: "Roleplay",
        description: "Coffee shop ordering, airport transit, and casual small talk",
      },
      {
        label: "Classroom Tools",
        value: "B2B Teacher Portal",
        change: "Multi-tenant",
        description: "Teacher rosters, shared decks, and student progress telemetry",
      },
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Web Speech API", "Gemini API", "PostgreSQL", "Prisma"],
    problem: {
      context:
        "Language learners face two distinct challenges: memorization decay (forgetting vocabulary without systematic review intervals) and speaking anxiety (lack of safe, interactive environments to practice spoken conversation).",
      painPoints: [
        "Traditional flashcard apps lack automated spaced retention scheduling",
        "Cloud voice transcription APIs introduce jarring multi-second latency for conversational drills",
        "Educators lack tools to assign structured custom vocabulary decks to student cohorts",
      ],
      constraints: [
        "Zero-latency speech recognition directly inside standard web browsers",
        "Mathematically rigorous SuperMemo-2 (SM-2) retention calculation for all card reviews",
        "Roleplay AI personas strictly adhering to the target language and proficiency level",
      ],
    },
    solution: {
      overview:
        "Built Duffy as an all-in-one language platform pairing browser-native Web Speech recognition with the SuperMemo-2 algorithm and Gemini conversational personas, wrapped in an intuitive full-stack web app.",
      architectureHighlights: [
        "In-Browser Speech Recognition via native SpeechRecognition / webkitSpeechRecognition",
        "SuperMemo-2 Spaced Repetition implementation computing optimal ease factor and interval days",
        "Conversational Scenarios: Context-bounded persona roleplays with dynamic feedback",
        "Teacher Portal: Roster management, student telemetry, and synchronized deck assignments",
      ],
      tradeOffs: [
        {
          choice: "Browser-native Web Speech API over cloud transcription services (Whisper API)",
          alternative: "Streaming audio to server-side OpenAI Whisper endpoints",
          reason:
            "Web Speech API executes instantly with zero server infrastructure costs and near-zero latency, creating a natural back-and-forth conversational flow.",
        },
        {
          choice: "SuperMemo-2 mathematical formulation over fixed interval timers",
          alternative: "Static review intervals (e.g. review every 2 days)",
          reason:
            "SM-2 dynamically adapts to the learner's individual difficulty score, maximizing long-term memory retention efficiency.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Duffy Architecture: Client Audio -> Web Speech API -> Pronunciation Comparator & SM-2 Scheduler -> Gemini Conversation Persona -> Prisma PostgreSQL",
      nodes: [
        {
          id: "mic",
          title: "Audio Ingress",
          type: "input",
          description: "Captures microphone stream and delivers speech recognition events",
          tech: "Web Speech API",
        },
        {
          id: "sm2",
          title: "SM-2 Scheduler",
          type: "process",
          description: "Calculates next review timestamp based on recall ease and grade",
          tech: "SM-2 Algorithm",
        },
        {
          id: "persona",
          title: "Gemini Persona",
          type: "process",
          description: "Engages in conversational immersion drills across varied scenarios",
          tech: "Gemini 1.5 Pro",
        },
        {
          id: "database",
          title: "Cloud Data Layer",
          type: "storage",
          description: "Stores user decks, card retention scores, and teacher classroom rosters",
          tech: "Prisma / PostgreSQL",
        },
      ],
      dataFlowSteps: [
        "Learner opens vocabulary flashcard deck and speaks target phrase",
        "Web Speech API transcribes audio client-side and computes phonetic similarity score",
        "User rates card recall difficulty (0-5 scale)",
        "SM-2 algorithm calculates next review interval and updates ease factor in PostgreSQL",
        "In Conversation mode, learner speaks dialogue; Gemini replies in character with corrective hints",
      ],
    },
    codeHighlights: [
      {
        title: "SuperMemo-2 (SM-2) Spaced Repetition Algorithm",
        language: "typescript",
        code: `export function calculateSM2(
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
    id: "conformal-forecasting",
    slug: "conformal-forecasting",
    title: "Conformal Demand Forecasting",
    tagline: "Probabilistic inventory forecasting engine via LightGBM & Newsvendor optimization",
    category: "Applied ML",
    status: "PRODUCTION",
    year: "2024",
    githubUrl: "https://github.com/Slash-495/Conformal-Demand-Forecasting",
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
        change: "Low latency",
        description: "Sub-12ms inference served via Dockerized FastAPI instance",
      },
    ],
    techStack: ["Python", "LightGBM", "MAPIE", "FastAPI", "Docker", "Optuna", "Pandas"],
    problem: {
      context:
        "Retail inventory planners using point forecasts suffer from asymmetric demand penalties: under-stocking leads to irreversible lost sales and customer dissatisfaction, while over-stocking locks up capital and causes inventory depreciation.",
      painPoints: [
        "Point forecasting models (ARIMA / standard regression) ignore tail risk uncertainty",
        "48% baseline stockout rate during peak promotional volatility",
        "Over-compensation with arbitrary safety stocks inflated warehouse holding costs by 45%",
      ],
      constraints: [
        "Strict 90% finite-sample marginal coverage guarantee on prediction intervals",
        "Real-time API inference latency under 20ms for continuous replenishment systems",
        "Model calibration must remain valid under non-Gaussian, intermittent retail demand",
      ],
    },
    solution: {
      overview:
        "Trained LightGBM quantile regression models calibrated with split inductive conformal prediction (MAPIE) to generate mathematically guaranteed prediction intervals, mapped directly to optimal stock levels via classic Newsvendor fractile optimization.",
      architectureHighlights: [
        "Feature Store: Lag features, rolling statistics, calendar indicators, and promotional flags",
        "LightGBM Gradient Boosting: Fast gradient-based tree boosting with Optuna hyperparameter tuning",
        "Inductive Conformal Prediction: Produces distribution-free prediction intervals with 90% coverage",
        "Newsvendor Profit Maximization: Translates conformal intervals into profit-optimal reorder points",
      ],
      tradeOffs: [
        {
          choice: "Split conformal prediction over parametric Gaussian confidence intervals",
          alternative: "Assuming Gaussian error residuals and taking mean ± 1.96 * sigma",
          reason:
            "Retail sales distributions are heavily skewed and zero-inflated. Conformal prediction provides mathematically proven coverage guarantees without requiring unrealistic normality assumptions.",
        },
        {
          choice: "LightGBM with feature engineering over DeepAR / Temporal Fusion Transformers",
          alternative: "Deep neural sequence models (TFT / LSTM)",
          reason:
            "LightGBM achieved 3.4x faster training cycles and sub-12ms API latency with competitive RMSE, making continuous retraining operationally viable.",
        },
      ],
    },
    architecture: {
      diagramDescription:
        "Probabilistic pipeline: Historical Orders -> Feature Engineering -> LightGBM Regressor -> Conformal Calibration (MAPIE) -> Newsvendor Fractile -> Optimal Reorder Point",
      nodes: [
        {
          id: "features",
          title: "Feature Pipeline",
          type: "input",
          description: "7d/14d/30d rolling averages, lag features, and holiday flags",
          tech: "Pandas / Polars",
        },
        {
          id: "lightgbm",
          title: "LightGBM Model",
          type: "process",
          description: "Fast gradient boosted tree regression with Optuna tuning",
          tech: "LightGBM",
        },
        {
          id: "conformal",
          title: "Conformal Calibrator",
          type: "process",
          description: "Computes non-conformity scores on holdout set to ensure 90% coverage",
          tech: "MAPIE / Python",
        },
        {
          id: "newsvendor",
          title: "Newsvendor Optimizer",
          type: "output",
          description: "Applies critical fractile (Underage vs Overage cost) to pick stock point",
          tech: "FastAPI / Docker",
        },
      ],
      dataFlowSteps: [
        "Raw transactional order data ingested from data lake",
        "Automated feature pipeline generates rolling aggregations and lag features",
        "LightGBM generates point prediction for SKU demand over target lead time",
        "Conformal calibrator inflates prediction by empirical quantile non-conformity threshold",
        "Newsvendor module evaluates unit margin vs holding cost to recommend exact reorder quantity",
        "FastAPI container serves prediction intervals to ERP replenishment systems",
      ],
    },
    codeHighlights: [
      {
        title: "Conformal Inductive Calibration & Newsvendor Order Point",
        language: "python",
        code: `def compute_optimal_order_quantity(
    y_pred_point: float, 
    residuals_calibration: np.ndarray, 
    alpha: float = 0.10, 
    cost_underage: float = 25.0, 
    cost_overage: float = 5.0
) -> dict:
    # 1. Compute empirical non-conformity score quantile
    q_hat = np.quantile(np.abs(residuals_calibration), 1.0 - alpha)
    lower_bound = max(0.0, y_pred_point - q_hat)
    upper_bound = y_pred_point + q_hat
    
    # 2. Critical Fractile for Newsvendor Profit Maximization
    critical_fractile = cost_underage / (cost_underage + cost_overage) # e.g. 25 / 30 = 0.833
    optimal_stock = lower_bound + critical_fractile * (upper_bound - lower_bound)
    
    return {
        "prediction_interval": (lower_bound, upper_bound),
        "coverage_guarantee": f"{int((1 - alpha) * 100)}%",
        "recommended_reorder_units": int(np.ceil(optimal_stock))
    }`,
        explanation:
          "Combines statistical conformal bounds with economic utility theory to maximize expected retail profit.",
      },
    ],
    interactiveDemoType: "conformal",
  },
];

export const PROFILE_DATA = {
  name: "Arush Jain",
  title: "AI Systems, Full-Stack & Analytics Engineer",
  status: "Scalable AI Systems • Data Analytics Warehouses • Full-Stack Engineering",
  location: "IIITDM Jabalpur / Remote",
  education: "B.Tech in Smart Manufacturing, IIITDM Jabalpur (2023 - Present)",
  contact: {
    email: "jainarush423@gmail.com",
  },
  coreFocus: [
    "Scalable AI Systems",
    "Data & Analytics Warehouses",
    "Multi-Agent Workflows",
    "Full-Stack Applications",
  ],
  bio: "Engineering scalable AI systems, data analytics pipelines, and robust full-stack applications with deep algorithmic foundations in data structures and systems design.",
  heroHeadline: "Building scalable AI systems, multi-agent workflows, and robust full-stack applications.",
  heroPunchline: "Building scalable AI systems, multi-agent workflows, and robust full-stack applications.",
  stats: [
    { label: "RailRoute Pass Rate", value: "100% Verified" },
    { label: "Legal RAG Precision", value: "94.2% P@4" },
    { label: "Logistics Churn Impact", value: "R$ 1.73M Quantified" },
    { label: "A/B Loss Prevented", value: "$96,300 Saved" },
  ],
  systemSpecs: {
    education: "IIITDM Jabalpur (2023 - Present)",
    degree: "B.Tech in Smart Manufacturing",
    honors: "Amazon ML Summer School 2026 • Patent Application Published",
    runtime: "Next.js 14 App Router + FastAPI & Python",
    architecture: "Multi-Agent DAGs & Analytics Warehouses",
    styling: "Tailwind CSS + Class-Based Dark Mode",
    motion: "Framer Motion Micro-Interactions",
    copilot: "In-Memory Lexical & BM25 Knowledge Retrieval",
  },
  socialLinks: [
    { label: "GitHub", url: "https://github.com/Slash-495", icon: "Github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/arush-jain", icon: "Linkedin", isPlaceholder: false },
    { label: "LeetCode", url: "https://leetcode.com/u/Slash495/", icon: "Code2", isPlaceholder: false },
    { label: "Email", url: "mailto:jainarush423@gmail.com", icon: "Mail" },
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
  metrics: { label: string; value: string }[];
  patentNumber?: string;
  verificationLink?: {
    label: string;
    url: string;
  };
  iconName: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "amazon-ml-summer-school-2026",
    title: "Amazon ML Summer School 2026",
    badge: "SELECTIVE ADMISSION",
    category: "Elite Selection",
    year: "2026",
    organization: "Amazon Science & Machine Learning Division",
    description:
      "Selected among thousands of applicants across premier Indian engineering institutions for intensive training and direct mentorship by Amazon Machine Learning Scientists. Immersed in foundational ML theory, large-scale deep learning, and frontier generative AI architectures.",
    highlights: [
      "Rigorous competitive selection process evaluating applied mathematics, statistics, and machine learning fundamentals",
      "Direct technical modules covering Supervised Learning, Deep Neural Networks, Dimensionality Reduction, and LLM Alignment",
      "Interactive technical masterclasses analyzing production-grade generative models and real-world deployment challenges at Amazon scale",
    ],
    metrics: [
      { label: "Selection Rate", value: "Highly Competitive" },
      { label: "Curriculum", value: "Amazon ML Scientists" },
    ],
    iconName: "Award",
  },
  {
    id: "two-wheeler-footrest-patent",
    title: "Centrifugal Speed Interlock Footrest Mechanism for Two-Wheelers",
    badge: "PATENT APPLICATION PUBLISHED • APP. NO. 202421034177",
    category: "Intellectual Property",
    year: "2024",
    organization: "Indian Patent Office",
    patentNumber: "202421034177",
    description:
      "Invented a novel mechanical safety footrest mechanism for two-wheelers with a patent application published (App. No. 202421034177, Indian Patent Office). Employs a passive centrifugal flyweight governor that locks footrest actuation when velocity exceeds 5 km/h, preventing pillion foot entrapment and road contact accidents.",
    highlights: [
      "Passive centrifugal governor: Locks footrest actuation above 5 km/h with 100% mechanical fail-safety",
      "Zero parasitic battery draw: Eliminates complex electrical actuators and vulnerability to electrical failure",
      "Complete CAD modeling, dynamic kinematic simulation, and physical prototype fabrication at IIITDMJ",
    ],
    metrics: [
      { label: "Interlock Speed", value: "≤ 5 km/h" },
      { label: "Status", value: "Application Published" },
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
    title: "Shipped Real-World Multi-Agent, Full-Stack & Analytics Systems",
    badge: "6+ PUBLIC REPOSITORIES & DEPLOYMENTS",
    category: "Open Source",
    year: "2024 - 2025",
    organization: "Global Open Source & Live Users",
    description:
      "Built and deployed end-to-end applications across multi-agent systems, data warehouses, and web products: Roznamcha CRM, Olist Analytics Engine, OptiMetrics A/B engine, Chambers GST-RAG legal intelligence, RailRoute Finder, and Duffy voice AI.",
    highlights: [
      "Roznamcha (Live CRM): PostgreSQL NTILE(5) RFM customer analytics & monthly cohort retention",
      "Olist Analytics: Containerized 100k+ order data warehouse with Metabase BI & R$ 1.73M delay quantification",
      "OptiMetrics: Statistical A/B experimentation engine in Python & Power BI saving $96.3k+",
      "Chambers GST-RAG: Dual-stream FAISS + BM25 hybrid legal retrieval cutting hallucinations to 2.1%",
    ],
    metrics: [
      { label: "Public Systems", value: "6 Repositories" },
      { label: "Source Code", value: "100% Publicly Available" },
    ],
    verificationLink: {
      label: "Explore GitHub Profile",
      url: "https://github.com/Slash-495",
    },
    iconName: "Terminal",
  },
];
