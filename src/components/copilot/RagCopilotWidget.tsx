"use client";

import * as React from "react";
import { ArrowUpRight, RotateCcw, ArrowRight } from "lucide-react";
import { queryRagCopilot, Citation, RagResponse } from "@/lib/rag-engine";
import { SUGGESTED_PROMPTS } from "@/lib/knowledge-base";
import { PROJECTS, ProjectCaseStudy } from "@/lib/projects-data";

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
      text: "Hi, I am Arush's portfolio AI assistant. I can answer questions regarding his full-stack systems, multi-agent pipelines, probabilistic demand models, and background. What would you like to explore?",
      timestamp: "Just now",
    },
  ]);
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
    }, 380);
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
        text: "Conversation cleared. What would you like to look into next?",
        timestamp: "Just now",
      },
    ]);
  };

  return (
    <div
      className={`flex flex-col h-full bg-[#F9F9F6] ${
        isFloating ? "" : "border border-[#E5E5DF] rounded-2xl p-6 sm:p-8"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E5DF] pb-4 mb-4">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A8B6B]" />
            <h3 className="text-base sm:text-lg font-normal tracking-tight text-[#1A1A1A]">
              Ask AI
            </h3>
          </div>
          <span className="text-xs text-[#8C8C85] font-light">
            Grounded answers across Arush's code, systems, and journey.
          </span>
        </div>

        <button
          onClick={resetChat}
          title="Reset conversation"
          className="text-xs text-[#8C8C85] hover:text-[#1A1A1A] transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pb-2">
        {SUGGESTED_PROMPTS.slice(0, 3).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-xs text-[#666662] hover:text-[#1A1A1A] border border-[#E5E5DF] hover:border-[#7A8B6B] rounded-full px-3 py-1 bg-white/60 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 max-h-[380px] min-h-[240px] pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            {/* Minimal chat bubble */}
            <div
              className={`max-w-[85%] text-sm sm:text-base font-light leading-relaxed ${
                msg.sender === "user"
                  ? "bg-[#EFEFEA] text-[#1A1A1A] rounded-2xl px-4 py-3"
                  : "bg-transparent text-[#1A1A1A] py-1"
              }`}
            >
              <div className="whitespace-pre-wrap">{msg.text}</div>

              {/* Citations as quiet olive links */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2 border-t border-[#E5E5DF] flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-[#8C8C85]">Sources:</span>
                  {msg.citations.map((cite) => (
                    <button
                      key={cite.id}
                      onClick={() => handleCitationClick(cite)}
                      className="text-[#7A8B6B] hover:text-[#1A1A1A] underline underline-offset-2 decoration-[#7A8B6B]/40 hover:decoration-[#1A1A1A] transition-colors inline-flex items-center gap-1"
                    >
                      <span>{cite.projectTitle || cite.title}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="text-xs text-[#8C8C85] italic py-1">
            Retrieving grounded response...
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-4 pt-3 border-t border-[#E5E5DF] flex items-center gap-3"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question about systems, latency, or background..."
          className="flex-1 bg-white border border-[#E5E5DF] focus:border-[#7A8B6B] rounded-full px-4 py-2.5 text-sm text-[#1A1A1A] placeholder:text-[#8C8C85] outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!query.trim() || isTyping}
          className="w-10 h-10 rounded-full bg-[#1A1A1A] text-white hover:bg-[#7A8B6B] disabled:opacity-30 disabled:hover:bg-[#1A1A1A] transition-colors flex items-center justify-center shrink-0"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
