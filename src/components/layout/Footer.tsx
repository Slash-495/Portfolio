"use client";

import * as React from "react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#E5E5DF] bg-[#F9F9F6] py-14 sm:py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-baseline justify-between gap-6 text-sm text-[#8C8C85]">
        <div className="flex flex-col gap-1">
          <span className="text-[#1A1A1A] font-medium">Arush Jain</span>
          <span className="font-light text-xs">
            &copy; {currentYear} • Designed with minimalism & editorial craft
          </span>
        </div>

        {/* Minimal Text Links */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-[#666662]">
          <a
            href="https://github.com/Slash-495"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://www.linkedin.com/in/arush-jain"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://leetcode.com/u/Slash495/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            LeetCode ↗
          </a>
          <a
            href="mailto:jainarush423@gmail.com"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            jainarush423@gmail.com
          </a>
          <a
            href="#resume"
            className="hover:text-[#1A1A1A] transition-colors"
          >
            Resumes ↓
          </a>
          <button
            onClick={scrollToTop}
            className="hover:text-[#455A30] transition-colors pl-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
