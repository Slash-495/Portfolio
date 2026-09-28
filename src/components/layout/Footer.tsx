"use client";

import * as React from "react";
import { Terminal, Github, Linkedin, Twitter, Mail, ArrowUp } from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#08080a] py-12 transition-colors font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Top row: Status and Links */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                {PROFILE_DATA.name}
              </span>
              <span className="text-zinc-400">//</span>
              <span className="text-zinc-500 text-[11px]">PORTFOLIO RUNTIME v2.5</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              High-impact engineering, sub-millisecond systems, and tactile interfaces.
            </p>
          </div>

          <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
            {PROFILE_DATA.socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase text-[11px]"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom row: Keyboard Shortcuts & System Tag */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-zinc-400">KEYBOARD SHORTCUTS:</span>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px]">
                ⌘K
              </kbd>
              <span>Copilot</span>
            </div>
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-[10px]">
                ESC
              </kbd>
              <span>Close Deep Dive</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-emerald-500">●</span>
            <span>SYSTEM STATE: OPTIMAL (0 FRAME DROPS)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
