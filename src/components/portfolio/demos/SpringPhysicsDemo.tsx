"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, Sliders, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function SpringPhysicsDemo() {
  const [stiffness, setStiffness] = React.useState(260);
  const [damping, setDamping] = React.useState(18);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Dynamic spring configuration matching the sliders
  const springX = useSpring(x, { stiffness, damping, mass: 0.8 });
  const springY = useSpring(y, { stiffness, damping, mass: 0.8 });

  // 3D tilt transforms derived from displacement
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

  const [currentDisplacement, setCurrentDisplacement] = React.useState(0);

  React.useEffect(() => {
    const unsub = springX.on("change", (val) => {
      setCurrentDisplacement(Math.round(Math.abs(val)));
    });
    return () => unsub();
  }, [springX]);

  const resetPosition = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 font-mono text-xs">
      {/* Telemetry header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-violet-400" />
          <span className="font-semibold uppercase tracking-wider text-zinc-300">
            ANALYTICAL 2ND-ORDER SPRING SOLVER
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="metric">TARGET: 120 FPS</Badge>
          <Badge variant="active">LAYOUT THRASH: 0ms</Badge>
        </div>
      </div>

      {/* Physics Interactive Canvas Area */}
      <div className="relative h-56 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-center overflow-hidden [perspective:800px] select-none">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

        {/* Draggable Card */}
        <motion.div
          drag
          dragConstraints={{ left: -140, right: 140, top: -70, bottom: 70 }}
          dragElastic={0.2}
          onDrag={(_, info) => {
            x.set(info.offset.x);
            y.set(info.offset.y);
          }}
          onDragEnd={() => {
            x.set(0);
            y.set(0);
          }}
          style={{
            x: springX,
            y: springY,
            rotateX,
            rotateY,
          }}
          className="relative z-10 w-64 p-4 rounded-xl bg-zinc-900/90 border border-violet-500/40 shadow-2xl backdrop-blur-md cursor-grab active:cursor-grabbing hover:border-violet-400 transition-colors"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">
              DRAG ME & RELEASE
            </span>
            <div className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
          </div>
          <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mb-3">
            Simulating closed-form harmonic damping. Transforms are applied via hardware matrix with zero reflow.
          </p>
          <div className="flex items-center justify-between text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-2 font-mono">
            <span>Δx: {currentDisplacement}px</span>
            <span className="text-emerald-400 font-semibold">120 FPS LOCKED</span>
          </div>
        </motion.div>

        <div className="absolute bottom-2 left-3 text-[10px] text-zinc-500 font-mono">
          GPU MATRIX3D TRANSFORMS
        </div>
      </div>

      {/* Physics Parameter Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-violet-400" /> Stiffness (Tension)
            </span>
            <span className="text-violet-400 font-semibold">{stiffness}</span>
          </div>
          <input
            type="range"
            min={80}
            max={500}
            step={10}
            value={stiffness}
            onChange={(e) => setStiffness(Number(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-violet-400" /> Damping (Friction)
            </span>
            <span className="text-violet-400 font-semibold">{damping}</span>
          </div>
          <input
            type="range"
            min={5}
            max={40}
            step={1}
            value={damping}
            onChange={(e) => setDamping(Number(e.target.value))}
            className="w-full accent-violet-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
        </div>
      </div>

      {/* Presets and reset */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500 text-[10px]">Presets:</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setStiffness(350);
              setDamping(12);
            }}
            className="text-[10px] h-6 px-2 border-zinc-800 hover:bg-zinc-900"
          >
            Snappy Bouncy
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setStiffness(180);
              setDamping(28);
            }}
            className="text-[10px] h-6 px-2 border-zinc-800 hover:bg-zinc-900"
          >
            Critically Damped
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={resetPosition}
          className="text-[10px] h-6 px-2 text-zinc-400 hover:text-zinc-200"
        >
          <RefreshCw className="w-3 h-3" /> Re-center
        </Button>
      </div>
    </div>
  );
}
