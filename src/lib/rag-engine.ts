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
        "I don't have direct benchmark or architectural documentation specifically for that query. You can ask me about **Chronos Engine** (distributed streaming & WASM), **Nexus Graph** (multi-agent deterministic DAGs), **HyperFluid** (120 FPS GPU physics), **Sentient Core** (single-flight edge caching), or my engineering philosophy on skipping past clients in favor of high-impact technical proof.",
      citations: [],
      confidence: 0.1,
      matchedChunks: 0,
      suggestedFollowUps: [
        "How did you optimize Chronos Engine latency?",
        "What is your philosophy on high-impact project engineering?",
        "How does Sentient Core prevent cache stampedes?",
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
  if (primaryMatch.projectId === "chronos-engine") {
    suggestedFollowUps.push(
      "How does the SharedArrayBuffer eliminate garbage collection?",
      "What are the trade-offs between Rust/WASM vs Web Workers?"
    );
  } else if (primaryMatch.projectId === "nexus-graph") {
    suggestedFollowUps.push(
      "How did you achieve a 68% token reduction?",
      "Why use deterministic DAGs instead of autonomous ReAct loops?"
    );
  } else if (primaryMatch.projectId === "hyperfluid") {
    suggestedFollowUps.push(
      "How does analytical spring math prevent frame-rate drift?",
      "Why use a single shared WebGL canvas overlay?"
    );
  } else if (primaryMatch.projectId === "sentient-core") {
    suggestedFollowUps.push(
      "How does the single-flight collapser broadcast responses?",
      "What is the role of counting Bloom filters at the edge?"
    );
  } else {
    suggestedFollowUps.push(
      "How did you optimize Chronos Engine for 1.2M events/sec?",
      "Explain the deterministic multi-agent routing in Nexus Graph."
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
