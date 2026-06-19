"use client";

import { useState, useEffect } from "react";
import { Play, Sparkles, CheckCircle2, Cpu, AlertTriangle } from "lucide-react";

export function ScoreSimulator() {
  const [stage, setStage] = useState<"idle" | "ingesting" | "cleaning" | "evaluating" | "done">("idle");
  const [score, setScore] = useState(41);

  useEffect(() => {
    if (stage === "evaluating") {
      const interval = setInterval(() => {
        setScore((prev) => {
          if (prev >= 88) {
            clearInterval(interval);
            setStage("done");
            return 88;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [stage]);

  const startSimulation = () => {
    setScore(41);
    setStage("ingesting");
    
    setTimeout(() => setStage("cleaning"), 1500);
    setTimeout(() => setStage("evaluating"), 3000);
  };

  return (
    <div className="w-full bg-glass-bg backdrop-blur-xl border border-glass-border rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-blue/10 blur-2xl rounded-full" />
      
      {/* Top Console Bar */}
      <div className="flex items-center justify-between border-b border-glass-border pb-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-green-500/60" />
          <span className="text-xs text-gray-500 font-mono ml-2">plugfit-harness-v1.ts</span>
        </div>
        {stage === "idle" || stage === "done" ? (
          <button
            onClick={startSimulation}
            className="flex items-center gap-1.5 px-3 py-1 bg-brand-blue text-white rounded-md text-xs font-medium hover:bg-brand-blue/80 transition"
          >
            <Play className="w-3 h-3 fill-white" />
            {stage === "done" ? "Optimize Again" : "Run Optimization Loop"}
          </button>
        ) : (
          <span className="text-xs font-mono text-brand-blue animate-pulse">
            Processing...
          </span>
        )}
      </div>

      {/* Simulator Interface Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Step List Terminal */}
        <div className="space-y-3 font-mono text-xs">
          <div className={`flex items-center gap-2 p-2 rounded border transition-colors ${
            stage === "ingesting" ? "bg-brand-blue/5 border-brand-blue text-brand-blue" : "border-transparent text-gray-400"
          }`}>
            <Cpu className="w-4 h-4" />
            <span>Ingesting OpenAPI/Swagger schemas...</span>
          </div>

          <div className={`flex items-center gap-2 p-2 rounded border transition-colors ${
            stage === "cleaning" ? "bg-brand-blue/5 border-brand-blue text-brand-blue" : "border-transparent text-gray-400"
          }`}>
            <Sparkles className="w-4 h-4" />
            <span>LLM: Merging duplicates & refining descriptions...</span>
          </div>

          <div className={`flex items-center gap-2 p-2 rounded border transition-colors ${
            stage === "evaluating" || stage === "done" ? "bg-brand-blue/5 border-brand-blue text-brand-blue" : "border-transparent text-gray-400"
          }`}>
            <CheckCircle2 className="w-4 h-4 text-brand-yellow" />
            <span>Agent Usability Score Verification</span>
          </div>
        </div>

        {/* Big Score Visualizer Display */}
        <div className="flex flex-col items-center justify-center p-6 border border-glass-border bg-black/20 rounded-xl text-center">
          <span className="text-xs uppercase tracking-wider text-brand-blue font-medium mb-1">
            Usability Benchmark
          </span>
          <div className="text-6xl font-bold font-mono tracking-tighter text-brand-yellow flex items-baseline">
            {score}
            <span className="text-sm font-normal text-gray-500 ml-1">/100</span>
          </div>
          
          <div className="mt-4 w-full bg-white/5 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-blue to-brand-yellow transition-all duration-300"
              style={{ width: `${score}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-400">
            {score < 60 ? (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                <span>Agent risks high execution failures</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span className="text-brand-yellow font-medium">Agent optimization confirmed</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}