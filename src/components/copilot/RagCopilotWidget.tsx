"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Send,
  Sparkles,
  RotateCcw,
  Check,
  Copy,
  ArrowUpRight,
  ExternalLink,
  ChevronDown,
  Terminal,
  Search,
} from "lucide-react";
import { queryRagCopilot, Citation, RagResponse } from "@/lib/rag-engine";
import { SUGGESTED_PROMPTS } from "@/lib/knowledge-base";
import { PROJECTS, ProjectCaseStudy } from "@/lib/projects-data";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  citations?: Citation[];
  timestamp: string;
}

interface RagCopilotWidgetProps {
  onOpenProjectCaseStudy?: (project: ProjectCaseStudy) => void;
  isFloating?: boolean;
}

export function RagCopilotWidget({
  onOpenProjectCaseStudy,
  isFloating = false,
}: RagCopilotWidgetProps) {
  const [query, setQuery] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "initial-1",
      sender: "copilot",
      text: "Greetings. I am Alex's portfolio RAG Copilot, grounded in technical specs, system architecture decisions, and benchmark metrics for projects like Chronos Engine, Nexus Graph, HyperFluid, and Sentient Core. Ask me anything about performance optimizations, engineering trade-offs, or system designs.",
      timestamp: "Just now",
    },
  ]);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);
  const chatBottomRef = React.useRef<HTMLDivElement | null>(null);

  // Auto-scroll chat to bottom
  React.useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const q = (textToSend || query).trim();
    if (!q || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setQuery("");
    setIsTyping(true);

    // Simulate realistic RAG retrieval & typewriter stream delay
    setTimeout(() => {
      const result: RagResponse = queryRagCopilot(q);

      const copilotMsg: Message = {
        id: `copilot-${Date.now()}`,
        sender: "copilot",
        text: result.answer,
        citations: result.citations,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, copilotMsg]);
      setIsTyping(false);
    }, 450);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCitationClick = (citation: Citation) => {
    if (!citation.projectId || !onOpenProjectCaseStudy) return;
    const project = PROJECTS.find((p) => p.id === citation.projectId);
    if (project) {
      onOpenProjectCaseStudy(project);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "initial-reset",
        sender: "copilot",
        text: "Conversation reset. Context window cleared. What engineering topic would you like to explore next?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#0c0c0e]/90 backdrop-blur-md shadow-xl overflow-hidden font-mono text-xs">
      {/* Copilot Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                PORTFOLIO RAG COPILOT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-[10px] text-zinc-500">
              GROUNDED IN ARCHITECTURE & BENCHMARK SPECS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetChat}
            title="Reset Context"
            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Suggested Prompts Pill Bar */}
      <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-zinc-900/30 overflow-x-auto scrollbar-none flex items-center gap-2">
        <span className="text-[10px] text-zinc-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-emerald-500" /> Prompts:
        </span>
        {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-zinc-200/60 dark:bg-zinc-800/70 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px] whitespace-nowrap transition-colors border border-zinc-300/40 dark:border-zinc-700/60"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[380px] min-h-[260px]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-center gap-2 mb-1 px-1 text-[10px] text-zinc-400">
              <span>{msg.sender === "user" ? "YOU" : "COPILOT"}</span>
              <span>•</span>
              <span>{msg.timestamp}</span>
            </div>

            <div
              className={`relative max-w-[88%] p-3.5 rounded-xl border leading-relaxed font-sans text-xs ${
                msg.sender === "user"
                  ? "bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 border-zinc-900 dark:border-zinc-200 font-medium"
                  : "bg-zinc-100/90 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Citations / Grounded Sources */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-1.5 font-mono text-[10px]">
                  <span className="text-zinc-400 uppercase tracking-widest">
                    Grounded Case Citations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {msg.citations.map((cite) => (
                      <button
                        key={cite.id}
                        onClick={() => handleCitationClick(cite)}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 transition-colors"
                      >
                        <span>[{cite.projectTitle || cite.title}]</span>
                        <ArrowUpRight className="w-2.5 h-2.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Copy answer button */}
              {msg.sender === "copilot" && (
                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="absolute top-2 right-2 p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
                  title="Copy response"
                >
                  {copiedId === msg.id ? (
                    <Check className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-zinc-100 dark:bg-zinc-900/80 text-zinc-500 w-fit">
            <span className="text-[10px] font-mono">Synthesizing vector context</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Query Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about 1.2M/s throughput, 68% token reduction, 120 FPS physics..."
            className="w-full bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
          />
        </div>

        <Button
          type="submit"
          size="sm"
          disabled={!query.trim() || isTyping}
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
}
