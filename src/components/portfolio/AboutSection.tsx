"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Music,
  Activity,
  Languages,
  Trophy,
  Gauge,
  Sparkles,
  ArrowRight,
  Mail,
  Quote,
  Terminal,
  Compass,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function AboutSection() {
  const sideQuests = [
    {
      title: "McLaren F1 & Tire Strategy",
      tag: "RACE DAY ADRENALINE",
      icon: <Gauge className="w-4 h-4 text-amber-500" />,
      description: "Stressing over tire degradation, undercut windows, and pit wall strategy every Grand Prix weekend.",
      metric: "Papaya Army // P1 Hunting",
      bgGradient: "from-amber-500/10 to-transparent",
      borderColor: "border-amber-500/25",
    },
    {
      title: "Liverpool FC",
      tag: "YNWA // PASSION",
      icon: <Trophy className="w-4 h-4 text-red-500" />,
      description: "Aggressively supporting the Reds through every 90+4' Anfield stoppage-time thriller.",
      metric: "Anfield Faithful",
      bgGradient: "from-red-500/10 to-transparent",
      borderColor: "border-red-500/25",
    },
    {
      title: "Strava Miles",
      tag: "CLEARING RAM",
      icon: <Activity className="w-4 h-4 text-emerald-500" />,
      description: "Logging miles on the pavement to flush mental cache, reset focus, and pace out engineering ideas.",
      metric: "Pavement & Endurance",
      bgGradient: "from-emerald-500/10 to-transparent",
      borderColor: "border-emerald-500/25",
    },
    {
      title: "Rock Music Nerd",
      tag: "SPOTIFY WRAPPED SPOILED",
      icon: <Music className="w-4 h-4 text-indigo-500" />,
      description: "Eternal gratitude to that one middle school friend who introduced me to AC/DC and permanently hard-wired my musical taste.",
      metric: "AC/DC • Classic Hard Rock",
      bgGradient: "from-indigo-500/10 to-transparent",
      borderColor: "border-indigo-500/25",
    },
    {
      title: "Learning Japanese",
      tag: "CURRENT QUEST",
      icon: <Languages className="w-4 h-4 text-sky-500" />,
      description: "Exploring Japanese sentence structure and vocabulary (strictly Rōmaji only for now, let's not push it).",
      metric: "Rōmaji Immersion",
      bgGradient: "from-sky-500/10 to-transparent",
      borderColor: "border-sky-500/25",
    },
  ];

  return (
    <section id="about" className="scroll-mt-24 flex flex-col gap-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <User className="w-4 h-4 text-emerald-500" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              03 // THE BUILDER BEHIND THE TERMINAL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            About Arush Jain
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            Bridging hardware intuition with scalable software engineering, plus off-duty side quests.
          </p>
        </div>
      </div>

      {/* Main Narrative Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Personal Narrative & Philosophy (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 justify-between p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md shadow-xs">
          <div className="flex flex-col gap-5">
            {/* Engineering Journey */}
            <div className="space-y-4 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
              <p>
                <strong className="text-zinc-950 dark:text-zinc-100 font-mono font-semibold">Hi, I'm Arush.</strong> I'm a final-year engineering student at{" "}
                <span className="text-zinc-950 dark:text-zinc-100 font-medium underline decoration-emerald-500/50 underline-offset-4">
                  IIITDM Jabalpur
                </span>
                , officially majoring in Smart Manufacturing but unofficially spending all my time architecting scalable AI systems and full-stack applications.
              </p>
              <p>
                My journey here has been anything but a straight line—I’ve gone from designing a patented automated footrest for two-wheelers to engineering multi-agent LLM pipelines and probabilistic demand forecasting models. I love the chaos of bridging hardware intuition with deep software engineering, whether that means optimizing a vector retrieval system for a legal RAG copilot or getting selected for the{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono text-xs sm:text-sm px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25">
                  Amazon ML Summer School
                </span>
                .
              </p>
              <p>
                For me, it’s always been about building reliable, production-grade tools that actually solve real problems, minus the unnecessary jargon.
              </p>
            </div>

            {/* Offline Side Quests Intro */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-950/60 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                // WHEN AWAY FROM DOCKER & TRACES
              </span>
              When I’m not obsessing over execution trajectories or debugging Docker containers, my brain is usually occupied by entirely different side quests. You can catch me stressing over McLaren’s tire strategy in F1, aggressively supporting Liverpool FC, or logging my miles on Strava. I’m also a massive rock music nerd—shoutout to that one middle school friend who introduced me to AC/DC and ruined my Spotify Wrapped forever—and I’m currently trying to learn Japanese (Rōmaji only for now, let's not push it).
            </div>
          </div>

          {/* Core Philosophy Callout */}
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <Quote className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <blockquote className="font-mono text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 italic leading-relaxed">
                "I believe the best software comes from genuine curiosity and good taste, not just typing fast. Good work starts with a conversation, so let's make something worth putting into the world."
              </blockquote>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for engineering roles & technical conversations</span>
              </div>

              <a
                href="mailto:jainarush423@gmail.com"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-500" />
                <span>Say Hello</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Side Quests Bento Matrix (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <div className="flex items-center justify-between font-mono text-xs px-1 text-zinc-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              <span>OFFLINE TELEMETRY & SIDE QUESTS</span>
            </span>
            <span>5 ACTIVE</span>
          </div>

          {sideQuests.map((quest, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xs flex flex-col justify-between hover:scale-[1.01] transition-transform ${quest.borderColor}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
                      {quest.icon}
                    </div>
                    <h4 className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      {quest.title}
                    </h4>
                  </div>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 uppercase tracking-wider">
                    {quest.tag}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed pl-8">
                  {quest.description}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between pl-8 font-mono text-[10px] text-zinc-500">
                <span>FOCUS:</span>
                <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                  {quest.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
