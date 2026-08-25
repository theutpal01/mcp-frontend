// components/landing/score-simulator.tsx
"use client";

import React from "react";

export function ScoreSimulator() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 select-none">
      {/* Glowing 3D Sphere Graphic */}
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-br from-[#0052cc] via-[#041a3d] to-[#020b18] border border-blue-500/30 shadow-[0_0_60px_rgba(0,112,243,0.45)] transition-all duration-300 hover:scale-105">
        
        {/* Inner Radial Glow Overlay */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-t from-transparent via-blue-600/20 to-blue-400/30 blur-md pointer-events-none" />

        {/* Big Yellow Score */}
        <span className="relative z-10 text-6xl sm:text-7xl font-extrabold text-[#FBEB4D] font-sans tracking-tight drop-shadow-[0_0_15px_rgba(251,235,77,0.4)]">
          41
        </span>
      </div>

      {/* Underneath Label */}
      <p className="text-[#00bfff] text-sm sm:text-base font-medium font-sans tracking-wide text-center">
        Before Optimization
      </p>
    </div>
  );
}