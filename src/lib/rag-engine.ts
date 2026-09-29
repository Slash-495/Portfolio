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

const STOP_WORDS = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are",
  "as", "at", "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "can",
  "could", "did", "do", "does", "doing", "down", "during", "each", "few", "for", "from", "further",
  "had", "has", "have", "having", "he", "her", "here", "hers", "herself", "him", "himself", "his",
  "how", "i", "if", "in", "into", "is", "it", "its", "itself", "me", "more", "most", "my", "myself",
  "no", "nor", "not", "of", "off", "on", "once", "only", "or", "other", "our", "ours", "ourselves",
  "out", "over", "own", "same", "she", "should", "so", "some", "such", "than", "that", "the", "their",
  "theirs", "them", "themselves", "then", "there", "these", "they", "this", "those", "through", "to",
  "too", "under", "until", "up", "very", "was", "we", "were", "what", "when", "where", "which",
  "while", "who", "whom", "why", "with", "would", "you", "your", "yours", "yourself", "yourselves",
  "tell", "show", "give", "explain", "please"
]);

/**
 * Tokenizes query text into normalized lowercase alphanumeric terms, stripping stop words.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s_-]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word));
}

/**
 * In-Memory Lexical & BM25 Keyword Search Engine
 * Scores knowledge chunks using exact keyword weights, title tokens, and phrase matches.
 */
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

  const fallbackRefusal: RagResponse = {
    answer:
      "I don't have information on that topic. I am a specialized portfolio assistant strictly dedicated to answering questions about Arush Jain's engineering projects, data analytics pipelines, and technical background. You can ask me about his multi-agent systems, analytics warehouses, or A/B experimentation engines.",
    citations: [],
    confidence: 0,
    matchedChunks: 0,
    suggestedFollowUps: [
      "How did RailRoute Agent achieve a 100% pass rate?",
      "Explain the dual-stream retrieval in Chambers Legal RAG.",
      "Tell me about Roznamcha's PostgreSQL RFM segmentation.",
    ],
  };

  if (queryTokens.length === 0) {
    return {
      answer: "Please ask a question about Arush's engineering projects, data analytics pipelines, or technical background.",
      citations: [],
      confidence: 0,
      matchedChunks: 0,
      suggestedFollowUps: [
        "How did RailRoute Agent achieve a 100% pass rate?",
        "Explain the dual-stream retrieval in Chambers Legal RAG.",
        "Tell me about Roznamcha's PostgreSQL RFM segmentation.",
      ],
    };
  }

  // Score all chunks
  const scored = KNOWLEDGE_BASE.map((chunk) => ({
    chunk,
    score: scoreChunk(queryTokens, chunk),
  })).filter((item) => item.score > 0);

  scored.sort((a, b) => b.score - a.score);

  // Strict confidence cutoff: if no match or top score is weak, refuse safely
  if (scored.length === 0 || scored[0].score < 2.5) {
    return fallbackRefusal;
  }

  const topMatches = scored.slice(0, 3);

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

  // Determine relevant follow-ups based on primary match
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
  } else if (primaryMatch.projectId === "roznamcha") {
    suggestedFollowUps.push(
      "How do PostgreSQL NTILE(5) window functions calculate RFM quintiles?",
      "How does Roznamcha track month-over-month cohort retention using CTEs?"
    );
  } else if (primaryMatch.projectId === "olist-analytics") {
    suggestedFollowUps.push(
      "How does the 4-layer ELT pipeline quantify the R$ 1.73M logistics delay penalty?",
      "What does the Metabase BI dashboard reveal about repeat customer AOV?"
    );
  } else if (primaryMatch.projectId === "optimetrics") {
    suggestedFollowUps.push(
      "How did OptiMetrics detect the -47.07% mobile conversion crash?",
      "How does OptiMetrics isolate 80.7% novelty decay in A/B testing?"
    );
  } else if (primaryMatch.projectId === "conformal-demand-forecasting") {
    suggestedFollowUps.push(
      "How does Newsvendor critical ratio map asymmetric stockout risk?",
      "What guarantees does Split Conformal prediction provide?"
    );
  } else if (primaryMatch.projectId === "leetlens") {
    suggestedFollowUps.push(
      "How does LeetLens evaluate time/space complexity without spoiling code?",
      "How does the Execution Trace Visualizer render recursion trees?"
    );
  } else if (primaryMatch.projectId === "duffy") {
    suggestedFollowUps.push(
      "How does Duffy integrate Whisper API for live audio transcription?",
      "How does the WebRTC architecture enable real-time communication?"
    );
  } else if (primaryMatch.category === "Patent") {
    suggestedFollowUps.push(
      "What is the publication status of the two-wheeler footrest patent (2025)?",
      "How do the pressure sensors and embedded controller prevent actuation at speed?"
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
