"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  onOpenCopilot: () => void;
}

export function Header({ onOpenCopilot }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC]/85 dark:bg-[#0B0F19]/85 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4 font-mono text-xs">
        {/* Left: Name Logo */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 font-bold text-sm tracking-tight text-[#0F172A] dark:text-[#F1F5F9] hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors uppercase font-mono"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
            <span>Arush Jain</span>
          </a>
        </div>

        {/* Center: Navigation Links (Projects, Achievements, AI Chat, About) */}
        <nav className="hidden md:flex items-center gap-7 text-slate-600 dark:text-slate-400 font-medium">
          <a
            href="#projects"
            className="hover:text-[#0F172A] dark:hover:text-[#F1F5F9] transition-colors uppercase tracking-wider text-xs"
          >
            Projects
          </a>
          <a
            href="#achievements"
            className="hover:text-[#0F172A] dark:hover:text-[#F1F5F9] transition-colors uppercase tracking-wider text-xs"
          >
            Achievements
          </a>
          <a
            href="#about"
            className="hover:text-[#0F172A] dark:hover:text-[#F1F5F9] transition-colors uppercase tracking-wider text-xs"
          >
            About
          </a>
          <a
            href="#ai-chat"
            className="hover:text-emerald-600 dark:hover:text-emerald-400 text-emerald-600 dark:text-emerald-400 font-semibold transition-colors uppercase tracking-wider text-xs flex items-center gap-1.5"
          >
            <Bot className="w-3.5 h-3.5" />
            AI Chat
          </a>
        </nav>

        {/* Right: Copilot Shortcut + Prominent Dark/Light Toggle */}
        <div className="flex items-center gap-3">
          {/* Quick Copilot button */}
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenCopilot}
            className="hidden sm:inline-flex gap-1.5 text-xs border-[#E2E8F0] dark:border-[#1E293B] hover:border-emerald-500 text-slate-700 dark:text-slate-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>AI Copilot</span>
            <kbd className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-[10px] text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-slate-700">
              ⌘K
            </kbd>
          </Button>

          {/* Prominent Dark/Light Toggle Button with smooth icon transition */}
          {mounted ? (
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark and light theme"
              className="relative p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 shadow-xs hover:shadow-md transition-all select-none"
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: resolvedTheme === "dark" ? 0 : 180,
                  scale: 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex items-center justify-center w-4 h-4"
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="w-4 h-4 text-indigo-400" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </motion.div>
            </button>
          ) : (
            <div className="w-9 h-9 rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-slate-100 dark:bg-slate-900 animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
