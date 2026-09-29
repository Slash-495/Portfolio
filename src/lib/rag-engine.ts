import { KNOWLEDGE_BASE, KnowledgeChunk } from "./knowledge-base";

export interface Citation {
  id: string;
  projectId?: string;
  projectTitle?: string;
  title: string;
  category: string;
}

export interface RagResponse {
  answer: string;
  citations: Citation[];
  confidence: number;
  matchedChunks: number;
  suggestedFollowUps: string[];
}

// Tokenize text into normalized lowercase alphanumeric terms
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1);
}

// Score a chunk against a query
function scoreChunk(queryTokens: string[], chunk: KnowledgeChunk): number {
  let score = 0;
  const chunkText = `${chunk.title} ${chunk.content} ${chunk.keywords.join(" ")}`.toLowerCase();
  const chunkTokens = tokenize(chunkText);
  const chunkSet = new Set(chunkTokens);

  for (const token of queryTokens) {
    // Exact match in keywords (high weight)
    if (chunk.keywords.some((k) => k.toLowerCase() === token)) {
      score += 4.5;
    }
    // Match in title (medium weight)
    if (chunk.title.toLowerCase().includes(token)) {
      score += 3.0;
    }
    // Match in body
    if (chunkSet.has(token)) {
      score += 1.2;
    }
  }

  // Bonus for multi-word phrase matching
  const rawQuery = queryTokens.join(" ");
  if (rawQuery.length > 5 && chunkText.includes(rawQuery)) {
    score += 5.0;
  }

  return score;
}

export function queryRagCopilot(query: string): RagResponse {
  const queryTokens = tokenize(query);

  if (queryTokens.length === 0) {
    return {
      answer: "Please ask a question about my engineering projects, system architectures, or technical philosophy.",
      citations: [],
      confidence: 0,
      matchedChunks: 0,
      suggestedFollowUps: [
        "How does Chronos Engine achieve 1.2M events/sec?",
        "Explain the deterministic DAG architecture in Nexus Graph.",
      ],
    };
  }

  // Score all chunks
  const scored = KNOWLEDGE_BASE.map((chunk) => ({
    chunk,
    score: scoreChunk(queryTokens, chunk),
  })).filter((item) => item.score > 0);

  scored.sort((a, b) => b.score - a.score);

  const topMatches = scored.slice(0, 3);

  if (topMatches.length === 0) {
    return {
      answer:
        "I don't have direct benchmark or architectural documentation specifically for that query. You can ask me about **RailRoute Agent** (3-agent train routing), **Chambers & Infrastructure** (dual-stream legal RAG), **Conformal Demand Forecasting** (LightGBM Newsvendor optimization), **Multimodal Two-Tower Recommender** (PyTorch InfoNCE), **Duffy & LeetLens** (WebRTC Whisper & BYOK extension), or Arush's **two-wheeler footrest patent** and selection for **Amazon ML Summer School 2026**.",
      citations: [],
      confidence: 0.1,
      matchedChunks: 0,
      suggestedFollowUps: [
        "How did RailRoute Agent achieve a 100% pass rate?",
        "Explain the dual-stream retrieval in Chambers Legal RAG.",
        "Tell me about Arush's patent and Amazon ML selection.",
      ],
    };
  }

  // Gather unique citations
  const citations: Citation[] = [];
  const seenIds = new Set<string>();

  for (const match of topMatches) {
    if (!seenIds.has(match.chunk.id)) {
      seenIds.add(match.chunk.id);
      citations.push({
        id: match.chunk.id,
        projectId: match.chunk.projectId,
        projectTitle: match.chunk.projectTitle,
        title: match.chunk.title,
        category: match.chunk.category,
      });
    }
  }

  // Synthesize answer based on top matching chunks
  const primaryMatch = topMatches[0].chunk;
  let synthesizedAnswer = primaryMatch.content;

  if (topMatches.length > 1 && topMatches[1].score > 3.0 && topMatches[1].chunk.id !== primaryMatch.id) {
    synthesizedAnswer += `\n\nAdditionally, ${topMatches[1].chunk.content}`;
  }

  // Determine relevant follow-ups
  const suggestedFollowUps: string[] = [];
  if (primaryMatch.projectId === "railroute-agent") {
    suggestedFollowUps.push(
      "How did the 3-agent triad cut latency from 3.2s to 1.45s?",
      "How does the Verifier enforce 45m-180m layover safety?"
    );
  } else if (primaryMatch.projectId === "chambers-legal-rag") {
    suggestedFollowUps.push(
      "How does BM25 and FAISS fusion lower hallucinations to 2.1%?",
      "Why is Cohere Cross-Encoder reranking critical for GST sections?"
    );
  } else if (primaryMatch.projectId === "conformal-demand-forecasting") {
    suggestedFollowUps.push(
      "How does Newsvendor critical ratio map asymmetric stockout risk?",
      "What guarantees does Split Conformal prediction provide?"
    );
  } else if (primaryMatch.projectId === "two-tower-recommender") {
    suggestedFollowUps.push(
      "How does InfoNCE contrastive loss leverage in-batch negatives?",
      "What gives the +4.2% lift in Recall@10 over matrix factorization?"
    );
  } else if (primaryMatch.projectId === "leetlens") {
    suggestedFollowUps.push(
      "How does LeetLens evaluate time/space complexity without spoiling code?",
      "How does the Execution Trace Visualizer render recursion trees?"
    );
  } else if (primaryMatch.projectId === "duffy") {
    suggestedFollowUps.push(
      "How does Duffy's Web Speech API deliver in-browser pronunciation scoring?",
      "How does the SuperMemo-2 Spaced Repetition algorithm schedule cards?"
    );
  } else if (primaryMatch.projectId === "velora") {
    suggestedFollowUps.push(
      "How does Velora achieve sub-45ms API response latency?",
      "How do Next.js Server Actions and Zod ensure end-to-end type safety?"
    );
  } else if (primaryMatch.projectId === "embedded-footrest-patent") {
    suggestedFollowUps.push(
      "How does the speed interlock gate prevent highway deployment?",
      "Tell me about Arush's experience at Amazon ML Summer School 2026."
    );
  } else {
    suggestedFollowUps.push(
      "How does RailRoute Agent achieve a 100% operational pass rate?",
      "Explain the dual-stream retrieval in Chambers & Infrastructure."
    );
  }

  const confidence = Math.min(0.99, Number((topMatches[0].score / 12).toFixed(2)));

  return {
    answer: synthesizedAnswer,
    citations,
    confidence,
    matchedChunks: topMatches.length,
    suggestedFollowUps: suggestedFollowUps.slice(0, 3),
  };
}
