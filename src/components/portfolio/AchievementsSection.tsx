"use client";

import * as React from "react";
import { ACHIEVEMENTS } from "@/lib/projects-data";
import { ArrowUpRight } from "lucide-react";

export function AchievementsSection() {
  return (
    <section id="career" className="scroll-mt-24 flex flex-col gap-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E5E5DF] pb-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
            Milestones // 02
          </span>
          <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
            Career & Honors
          </h2>
        </div>
        <p className="text-sm text-[#8C8C85] max-w-sm">
          A documented history of competitive selections, published patent applications, academic background, and real-world milestones.
        </p>
      </div>

      {/* Clean Editorial Timeline List */}
      <div className="flex flex-col">
        {ACHIEVEMENTS.map((item) => (
          <div
            key={item.id}
            className="border-b border-[#E5E5DF] py-7 sm:py-8 px-2 -mx-2 flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 group hover:bg-black/[0.015] transition-colors"
          >
            {/* Left: Year */}
            <div className="w-full md:w-36 shrink-0 text-xs font-mono text-[#8C8C85]">
              {item.year}
            </div>

            {/* Center: Title & Description */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg sm:text-xl font-normal text-[#1A1A1A] group-hover:text-[#455A30] transition-colors tracking-tight">
                  {item.title}
                </h3>
              </div>

              <div className="text-xs uppercase tracking-wider text-[#455A30] font-medium">
                {item.organization}
              </div>

              <p className="text-sm text-[#666662] font-light leading-relaxed max-w-3xl pt-1">
                {item.description}
              </p>
            </div>

            {/* Right: Badge / Link */}
            <div className="shrink-0 pt-2 md:pt-0 self-start md:self-baseline">
              {item.verificationLink ? (
                <a
                  href={item.verificationLink.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#8C8C85] hover:text-[#1A1A1A] transition-colors"
                >
                  <span>Verify</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-xs text-[#8C8C85] font-mono">
                  {item.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
