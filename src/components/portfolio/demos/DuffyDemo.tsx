"use client";

import * as React from "react";
import { Mic, Volume2, Sparkles, GraduationCap, Flame, Play, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function DuffyDemo() {
  const [activeScenario, setActiveScenario] = React.useState<"cafe" | "airport">("cafe");
  const [isRecording, setIsRecording] = React.useState(false);
  const [userTranscript, setUserTranscript] = React.useState("Sumimasen, koohii o hitotsu kudasai.");
  const [pronunciationScore, setPronunciationScore] = React.useState(94);

  const scenarios = {
    cafe: {
      location: "Tokyo Specialty Cafe",
      aiPrompt: "Irasshaimase! Go-chuumon wa ikaga desu ka? (Welcome! What would you like to order?)",
      targetResponse: "Sumimasen, koohii o hitotsu kudasai. (Excuse me, one coffee please.)",
      aiReply: "Kashikomarimashita! Hotto desu ka, aisu desu ka? (Certainly! Hot or iced?)",
    },
    airport: {
      location: "Narita Airport Immigration",
      aiPrompt: "Nihon e no taizai mokuteki wa nan desu ka? (What is the purpose of your stay in Japan?)",
      targetResponse: "Kankou de kimashita. Isshuukan taizai shimasu. (I am here for sightseeing for 1 week.)",
      aiReply: "Wakarimashita. Douzo, yoi tabi o! (Understood. Have a great journey!)",
    },
  };

  const handleSimulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setPronunciationScore(Math.floor(92 + Math.random() * 6));
    }, 600);
  };

  const scenario = scenarios[activeScenario];

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            DUFFY: IN-BROWSER WEB SPEECH VOICE AI & SRS ECOSYSTEM
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">VOICE LATENCY: &lt;150ms</Badge>
          <Badge variant="active">LIVE: DUFFY.ONRENDER.COM</Badge>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveScenario("cafe")}
          className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
            activeScenario === "cafe"
              ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          Scenario 1: Cafe Order
        </button>
        <button
          onClick={() => setActiveScenario("airport")}
          className={`px-3 py-1.5 rounded-md border text-xs font-mono transition-all ${
            activeScenario === "airport"
              ? "bg-emerald-950/70 border-emerald-500/80 text-emerald-300 font-semibold"
              : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
          }`}
        >
          Scenario 2: Airport Immigration
        </button>
      </div>

      {/* AI Scenario Roleplay Box */}
      <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col gap-3 font-sans text-xs">
        <div className="flex items-center justify-between font-mono text-[11px] pb-2 border-b border-slate-800">
          <span className="text-emerald-400 font-bold uppercase">{scenario.location}</span>
          <span className="text-slate-400 font-mono">Gemini AI Adaptive Persona</span>
        </div>

        {/* AI Agent Speech */}
        <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-900">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
            AI
          </div>
          <div>
            <div className="text-slate-200 font-medium">{scenario.aiPrompt}</div>
            <div className="text-[10px] text-slate-500 font-mono mt-0.5">Spoken via Text-To-Speech</div>
          </div>
        </div>

        {/* User Spoken Response Simulation */}
        <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-900">
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
            YOU
          </div>
          <div className="flex-1">
            <div className="text-slate-200 font-medium">{scenario.targetResponse}</div>
            <div className="flex items-center gap-3 text-[10px] font-mono mt-1 text-slate-400">
              <span className="text-emerald-400 font-bold">Pronunciation: {pronunciationScore}%</span>
              <span>Fluency: Native Speed</span>
              <span>Intonation: 96%</span>
            </div>
          </div>
        </div>

        {/* AI Follow-up */}
        <div className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-lg border border-slate-900">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
            AI
          </div>
          <div>
            <div className="text-slate-200 font-medium">{scenario.aiReply}</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Scenario Completed • +50 XP Earned</div>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex items-center justify-between pt-1">
        <Button
          size="sm"
          variant="glow"
          onClick={handleSimulateVoice}
          disabled={isRecording}
          className="text-emerald-400 border-emerald-500/40 hover:border-emerald-400 gap-1.5"
        >
          <Mic className={`w-3.5 h-3.5 ${isRecording ? "animate-ping text-red-400" : ""}`} />
          {isRecording ? "Listening & Scoring..." : "Test Web Speech Voice Recognition"}
        </Button>

        <a
          href="https://duffy.onrender.com/"
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-slate-400 hover:text-emerald-400 underline transition-colors"
        >
          Open Live App (duffy.onrender.com) &rarr;
        </a>
      </div>
    </div>
  );
}
