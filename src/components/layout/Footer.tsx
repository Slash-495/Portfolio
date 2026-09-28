"use client";

import * as React from "react";
import { Terminal, Github, Linkedin, Code2, Mail, Phone, ArrowUp, GraduationCap } from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#08080a] py-12 transition-colors font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Top row: Identity and Contact Information */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-sm">
                {PROFILE_DATA.name}
              </span>
              <span className="text-zinc-400">//</span>
              <span className="text-zinc-500 text-[11px]">{PROFILE_DATA.title}</span>
            </div>
            <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 text-[11px]">
              <GraduationCap className="w-3.5 h-3.5 text-emerald-500" />
              <span>{PROFILE_DATA.education}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-zinc-500 text-[11px] mt-1">
              <a
                href={`mailto:${PROFILE_DATA.contact.email}`}
                className="hover:text-emerald-500 transition-colors flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> {PROFILE_DATA.contact.email}
              </a>
              <span>•</span>
              <a
                href={`tel:${PROFILE_DATA.contact.phone.replace(/\s+/g, "")}`}
                className="hover:text-emerald-500 transition-colors flex items-center gap-1"
              >
                <Phone className="w-3 h-3" /> {PROFILE_DATA.contact.phone}
              </a>
            </div>
          </div>

          {/* Links: GitHub, LinkedIn (placeholder), LeetCode (placeholder) */}
          <div className="flex flex-wrap items-center gap-3 text-zinc-600 dark:text-zinc-400">
            {/* GitHub */}
            <a
              href="https://github.com/Slash-495"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase text-[11px]"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn Placeholder */}
            <a
              href="https://linkedin.com/in/#"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn Profile (Placeholder)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase text-[11px]"
            >
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            {/* LeetCode Placeholder */}
            <a
              href="https://leetcode.com/#"
              target="_blank"
              rel="noreferrer"
              title="LeetCode Profile (Placeholder)"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors uppercase text-[11px]"
            >
              <Code2 className="w-3.5 h-3.5 text-amber-500" />
              <span>LeetCode</span>
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors"
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
