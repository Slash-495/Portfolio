"use client";

import * as React from "react";
import { Play, Pause, Zap, RotateCcw, Activity } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function EventStreamerDemo() {
  const [isRunning, setIsRunning] = React.useState(true);
  const [throughputK, setThroughputK] = React.useState(1200); // 1.2M
  const [eventCount, setEventCount] = React.useState(14820000);
  const [latency, setLatency] = React.useState(0.78);
  const [fps, setFps] = React.useState(60);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // Simulate slight realistic telemetry jitter
      const jitter = (Math.random() - 0.5) * 0.08;
      const baseLat = throughputK > 1500 ? 0.95 : 0.76;
      setLatency(Number((baseLat + jitter).toFixed(2)));
      setFps(throughputK > 2000 ? 59 : 60);
      setEventCount((prev) => prev + Math.floor(throughputK * 16.6));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, throughputK]);

  // Particle / Waveform animation on canvas
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (isRunning) {
        phase += (throughputK / 1000) * 0.08;
      }

      // Draw grid
      ctx.strokeStyle = "rgba(100, 116, 139, 0.15)";
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw high-frequency telemetry wave
      ctx.beginPath();
      ctx.strokeStyle = "#10b981"; // Emerald
      ctx.lineWidth = 2;

      for (let x = 0; x < w; x++) {
        const freq1 = 0.02;
        const freq2 = 0.06;
        const amp = isRunning ? 25 + (throughputK / 2000) * 20 : 5;
        const y =
          h / 2 +
          Math.sin(x * freq1 + phase) * amp +
          Math.cos(x * freq2 - phase * 0.5) * (amp * 0.5);

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw active data pulses
      if (isRunning) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.8)";
        for (let i = 0; i < 6; i++) {
          const px = ((phase * 40 + i * 90) % w);
          const py = h / 2 + Math.sin(px * 0.02 + phase) * 25;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [isRunning, throughputK]);

  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-zinc-950 text-zinc-100 border border-zinc-800 font-mono text-xs">
      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isRunning ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="font-semibold uppercase tracking-wider text-zinc-300">
              {isRunning ? "WASM STREAM: ACTIVE" : "STREAM PAUSED"}
            </span>
          </div>
          <Badge variant="metric">RING BUFFER: 64MB</Badge>
        </div>

        <div className="flex items-center gap-4 text-zinc-400">
          <div>
            FPS: <span className="text-zinc-100 font-bold">{fps}</span>
          </div>
          <div>
            p99: <span className="text-emerald-400 font-bold">{latency}ms</span>
          </div>
          <div>
            Events:{" "}
            <span className="text-zinc-100 font-bold">
              {eventCount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Visualizer Canvas */}
      <div className="relative rounded-lg overflow-hidden border border-zinc-800/80 bg-black/60">
        <canvas
          ref={canvasRef}
          width={650}
          height={160}
          className="w-full h-40 block"
        />
        <div className="absolute top-2 left-3 flex items-center gap-2 pointer-events-none">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[10px] text-zinc-400 uppercase tracking-widest">
            SharedArrayBuffer Ring Offscreen GL Pipeline
          </span>
        </div>
        <div className="absolute bottom-2 right-3 text-[10px] text-zinc-500 font-mono">
          {(throughputK / 1000).toFixed(2)}M EVENTS/SEC
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-zinc-400 whitespace-nowrap">Throughput:</span>
          <input
            type="range"
            min={100}
            max={2500}
            step={50}
            value={throughputK}
            onChange={(e) => setThroughputK(Number(e.target.value))}
            className="w-full sm:w-48 accent-emerald-500 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
          />
          <span className="text-emerald-400 font-semibold w-24">
            {(throughputK / 1000).toFixed(2)}M/s
          </span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsRunning(!isRunning)}
            className="border-zinc-700 text-zinc-200 hover:bg-zinc-900"
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" /> Resume
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="default"
            onClick={() => {
              setThroughputK(2500);
              setIsRunning(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-500 text-black font-semibold"
          >
            <Zap className="w-3.5 h-3.5" /> Burst 2.5M
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setThroughputK(1200);
              setEventCount(14820000);
              setIsRunning(true);
            }}
            className="text-zinc-400 hover:text-zinc-200"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
