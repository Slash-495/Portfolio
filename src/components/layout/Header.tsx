"use client";

import * as React from "react";

interface HeaderProps {
  onOpenCopilot: () => void;
}

export function Header({ onOpenCopilot }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#F9F9F6]/90 backdrop-blur-xs border-b border-[#E5E5DF] transition-colors">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 h-20 flex items-center justify-between">
        {/* Left: Author Brand */}
        <a
          href="#"
          className="text-base sm:text-lg font-medium tracking-tight text-[#1A1A1A] hover:text-[#455A30] transition-colors"
        >
          Arush Jain
        </a>

        {/* Right: Plain text links spaced far apart */}
        <nav className="flex items-center gap-6 sm:gap-10 text-sm font-normal text-[#1A1A1A]">
          <a
            href="#work"
            className="text-[#666662] hover:text-[#1A1A1A] transition-colors"
          >
            All work
          </a>
          <a
            href="#career"
            className="text-[#666662] hover:text-[#1A1A1A] transition-colors"
          >
            Career
          </a>
          <a
            href="#about"
            className="text-[#666662] hover:text-[#1A1A1A] transition-colors"
          >
            About
          </a>
          <a
            href="#resume"
            className="text-[#666662] hover:text-[#1A1A1A] transition-colors"
          >
            Resumes ↓
          </a>
          <button
            onClick={onOpenCopilot}
            className="text-[#666662] hover:text-[#455A30] transition-colors"
          >
            Ask AI
          </button>
          <a
            href="mailto:jainarush423@gmail.com"
            className="text-[#1A1A1A] hover:text-[#455A30] transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>Contact</span>
            <span className="text-xs text-[#455A30]">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
