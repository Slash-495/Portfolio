"use client";

import * as React from "react";

export function AboutSection() {
  const sideQuests = [
    {
      title: "McLaren F1 & Tire Strategy",
      note: "Stressing over tire deg, undercut windows, and pit calls every Grand Prix weekend.",
    },
    {
      title: "Liverpool FC",
      note: "You'll Never Walk Alone. Aggressive Anfield supporter through every stoppage-time thriller.",
    },
    {
      title: "Strava Miles",
      note: "Logging pavement miles to flush mental cache and reset focus.",
    },
    {
      title: "Rock Music Nerd",
      note: "Eternal gratitude to that one middle school friend who introduced me to AC/DC and ruined my Spotify Wrapped forever.",
    },
    {
      title: "Learning Japanese",
      note: "Exploring sentence structures and vocabulary (Rōmaji only for now, let's not push it).",
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 flex flex-col gap-12 sm:gap-16">
      {/* Section Header */}
      <div className="flex flex-col gap-2 border-b border-[#E5E5DF] pb-6">
        <span className="text-xs uppercase tracking-widest text-[#8C8C85]">
          Background // 03
        </span>
        <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1A1A1A]">
          About & Offline Pursuits
        </h2>
      </div>

      {/* Editorial Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-start">
        {/* Main Prose (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-base sm:text-lg text-[#2D2D2D] font-light leading-relaxed">
          <p>
            Hi, I'm Arush. I'm an engineering student at IIITDM Jabalpur (2027 Grad), officially majoring in Smart Manufacturing but unofficially spending all my time architecting scalable AI systems and full-stack applications.
          </p>

          <p>
            My journey here has been anything but a straight line—I’ve gone from designing a published patent application for an automatic sensor-based footrest assembly for two-wheelers (using embedded controllers and pressure sensors) to engineering multi-agent LLM systems, relational data warehouses, and probabilistic demand forecasting models. I love the chaos of bridging hardware intuition with deep software engineering, whether that means optimizing a dual-stream retrieval pipeline for a legal RAG copilot or getting selected for the Amazon ML Summer School 2026.
          </p>

          <p>
            For me, it’s always been about building reliable, production-grade tools that actually solve real problems, minus the unnecessary jargon.
          </p>

          {/* Pull Quote */}
          <div className="border-l-2 border-[#455A30] pl-6 my-2">
            <blockquote className="text-xl sm:text-2xl font-normal tracking-tight text-[#1A1A1A] italic leading-snug">
              "I believe the best software comes from genuine curiosity and good taste, not just typing fast. Good work starts with a conversation, so let's make something worth putting into the world."
            </blockquote>
          </div>
        </div>

        {/* Side Quests & Offline Pursuits List (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 pt-2">
          <div className="text-xs uppercase tracking-widest text-[#8C8C85] border-b border-[#E5E5DF] pb-3">
            Offline Side Quests
          </div>

          <div className="flex flex-col">
            {sideQuests.map((quest, i) => (
              <div
                key={i}
                className="py-4 border-b border-[#E5E5DF] last:border-b-0 flex flex-col gap-1"
              >
                <div className="text-sm font-medium text-[#1A1A1A]">
                  {quest.title}
                </div>
                <div className="text-xs text-[#666662] font-light leading-relaxed">
                  {quest.note}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <a
              href="mailto:jainarush423@gmail.com"
              className="text-xs text-[#455A30] hover:text-[#1A1A1A] font-medium tracking-wide transition-colors inline-flex items-center gap-1.5 underline underline-offset-4 decoration-[#455A30]/40 hover:decoration-[#1A1A1A]"
            >
              <span>Start a conversation</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
