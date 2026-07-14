"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  gradientBorder: string;
  glowClass?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon,
  gradientBorder,
  glowClass,
}: MetricCardProps) {
  return (
    /* Outer layout channel creating the thin pixel gradient border track */
    <div
      className={cn(
        "p-[1.5px] rounded-3xl bg-gradient-to-br transition-all duration-300",
        gradientBorder,
        glowClass
      )}
    >
      {/* Core card body panel */}
      <div className="bg-[#050e1e]/95 rounded-[22px] px-4 py-7 h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
        
        {/* Top lighting ambient glare effect */}
        <div className="absolute top-0 inset-x-0 h-[30%] bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        {/* Header telemetry group */}
        <div className="flex items-center justify-center gap-2 mb-4 relative z-10">
          <div className="text-yellow-400 flex items-center justify-center w-4 h-4">
            {icon}
          </div>
          <span className="text-sm font-semibold tracking-wide text-yellow-400/90 font-mono">
            {title}
          </span>
        </div>

        {/* High-impact statistic digit */}
        <h3 className="text-6xl font-bold tracking-tighter text-white mb-2 relative z-10 font-sans">
          {value}
        </h3>

        {/* Trend delta label */}
        <span
          className={cn(
            "text-sm font-mono tracking-wide relative z-10",
            changeType === "positive" && "text-blue-400",
            changeType === "neutral" && "text-blue-400/80",
            changeType === "negative" && "text-red-500 font-semibold animate-pulse"
          )}
        >
          {change}
        </span>
      </div>
    </div>
  );
}