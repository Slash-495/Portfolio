"use client";

import * as React from "react";
import { Github, Linkedin, Code2, Mail, ArrowUp } from "lucide-react";
import { PROFILE_DATA } from "@/lib/projects-data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E2E8F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0B0F19] py-10 transition-colors font-mono text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Left: Clean Copyright Tag */}
        <div className="flex flex-col sm:flex-row items-center gap-2 text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <span>&copy; {currentYear} Arush Jain. All rights reserved.</span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            IIITDM Jabalpur
          </span>
        </div>

        {/* Right: Minimal Icon Links (GitHub, LinkedIn, LeetCode, Email) + Back to Top */}
        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
          {/* GitHub */}
          <a
            href="https://github.com/Slash-495"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* LinkedIn (Placeholder) */}
          <a
            href="https://linkedin.com/in/#"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            title="LinkedIn (Placeholder)"
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:text-blue-500 hover:border-blue-400 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-500" />
          </a>

          {/* LeetCode (Placeholder) */}
          <a
            href="https://leetcode.com/#"
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode Profile"
            title="LeetCode (Placeholder)"
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:text-amber-500 hover:border-amber-400 transition-colors"
          >
            <Code2 className="w-4 h-4 text-amber-500" />
          </a>

          {/* Email */}
          <a
            href="mailto:jainarush423@gmail.com"
            aria-label="Send Email"
            title="jainarush423@gmail.com"
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:text-emerald-500 hover:border-emerald-400 transition-colors"
          >
            <Mail className="w-4 h-4 text-emerald-500" />
          </a>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A] hover:text-[#0F172A] dark:hover:text-white hover:border-slate-400 dark:hover:border-slate-600 transition-colors ml-2"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
