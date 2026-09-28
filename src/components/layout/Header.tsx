"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Sparkles, Terminal, FileText, Bot } from "lucide-react";
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
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#0a0a0c]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4 font-mono text-xs">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="font-bold text-zinc-900 dark:text-zinc-100 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors uppercase tracking-wider flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ALEX VANCE</span>
            <span className="text-zinc-400 hidden sm:inline">//</span>
            <span className="text-zinc-500 hidden sm:inline font-normal text-[11px]">
              SYSTEMS & DESIGN TECHNOLOGIST
            </span>
          </a>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-zinc-600 dark:text-zinc-400">
          <a
            href="#work"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider text-[11px]"
          >
            01 / Work
          </a>
          <a
            href="#specs"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider text-[11px]"
          >
            02 / Specs & Matrix
          </a>
          <a
            href="#copilot"
            className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            <Bot className="w-3.5 h-3.5" />
            03 / RAG Copilot
          </a>
        </nav>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick RAG Copilot Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={onOpenCopilot}
            className="gap-1.5 text-[11px] border-zinc-300 dark:border-zinc-800 hover:border-emerald-500 text-zinc-800 dark:text-zinc-200"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span className="hidden sm:inline">Ask Copilot</span>
            <kbd className="hidden sm:inline-block px-1 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-[9px] text-zinc-500 border border-zinc-300 dark:border-zinc-700">
              ⌘K
            </kbd>
          </Button>

          {/* Dark / Light Mode Toggle Button */}
          {mounted ? (
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark/light theme"
              className="relative p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-50 hover:border-zinc-400 dark:hover:border-zinc-700 transition-all select-none"
            >
              <motion.div
                initial={false}
                animate={{ rotate: resolvedTheme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {resolvedTheme === "dark" ? (
                  <Moon className="w-4 h-4 text-zinc-200" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-500" />
                )}
              </motion.div>
            </button>
          ) : (
            <div className="w-8 h-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
