"use client";

import * as React from "react";
import { ShieldCheck, Award, Sliders, AlertTriangle, CheckCircle2, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function PatentFootrestDemo() {
  const [vehicleSpeed, setVehicleSpeed] = React.useState(0);
  const [pillionMounted, setPillionMounted] = React.useState(false);

  // Safety interlock rule: speed must be <= 5 km/h to actuate
  const isInterlockTriggered = vehicleSpeed > 5;
  const isFootrestExtended = !isInterlockTriggered && pillionMounted;

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-slate-950 text-slate-100 border border-slate-800 font-mono text-xs">
      {/* Header Telemetry */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold uppercase tracking-wider text-slate-300">
            EMBEDDED CONTROLLER: PATENTED TWO-WHEELER FOOTREST & AMAZON ML 2026
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="active">PATENT GRANTED</Badge>
          <Badge variant="metric">AMAZON ML SUMMER SCHOOL 2026</Badge>
        </div>
      </div>

      {/* Embedded State Machine Status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Vehicle Velocity</div>
          <div className="text-xl font-bold text-white mt-1">
            {vehicleSpeed} km/h
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Speedometer Interrupt
          </div>
        </div>

        <div
          className={`p-3 rounded-lg border transition-all ${
            isInterlockTriggered
              ? "bg-red-950/30 border-red-500/50 text-red-200"
              : "bg-emerald-950/30 border-emerald-500/50 text-emerald-200"
          }`}
        >
          <div className="text-[10px] text-slate-400 uppercase">Speed Interlock Gate</div>
          <div className="text-xl font-bold mt-1">
            {isInterlockTriggered ? "LOCKED (>5 km/h)" : "ARMED (&le;5 km/h)"}
          </div>
          <div className="text-[10px] mt-0.5">
            {isInterlockTriggered ? "Accidental deployment blocked" : "Safe to actuate"}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800">
          <div className="text-[10px] text-slate-500 uppercase">Footrest Mechanical State</div>
          <div
            className={`text-xl font-bold mt-1 ${
              isFootrestExtended ? "text-emerald-400" : "text-slate-300"
            }`}
          >
            {isFootrestExtended ? "EXTENDED (ACTIVE)" : "RETRACTED FLUSH"}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Actuation Time: 120ms
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-emerald-400" /> Vehicle Speed Slider:
            </span>
            <span className="text-emerald-400 font-bold">{vehicleSpeed} km/h</span>
          </div>
          <input
            type="range"
            min={0}
            max={60}
            step={1}
            value={vehicleSpeed}
            onChange={(e) => setVehicleSpeed(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
          <span className="text-[10px] text-slate-500">
            Slide above 5 km/h to see the safety interlock lock actuation!
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <span className="text-slate-400 text-[11px] mb-1.5">Pillion Passenger Sensor:</span>
          <button
            onClick={() => setPillionMounted(!pillionMounted)}
            className={`w-full py-2 px-3 rounded-lg border text-xs font-mono font-semibold transition-all ${
              pillionMounted
                ? "bg-emerald-950/70 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            {pillionMounted ? "● Pillion Passenger Present (Mounted)" : "○ Solo Rider (No Passenger)"}
          </button>
        </div>
      </div>

      {/* Amazon ML Summer School 2026 Callout */}
      <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-3 text-slate-300">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-white text-xs">Amazon ML Summer School 2026 Selectee</div>
            <div className="text-[10px] text-slate-400">
              Advanced deep learning, generative modeling, and LLM scaling mentorship.
            </div>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
          SELECTED
        </span>
      </div>
    </div>
  );
}
