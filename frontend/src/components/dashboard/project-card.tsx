"use client";

import React from "react";

interface ProjectCardProps {
  name: string;
  age: string;
  count: string;
}

export function ProjectCard({ name, age, count }: ProjectCardProps) {
  return (
    <div className="min-w-[230px] max-w-[230px] bg-[#03122f] border border-blue-900/30 rounded-3xl p-6 flex flex-col justify-between snap-start transition-all duration-300 hover:border-blue-500/30 group cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      {/* Top Meta Area */}
      <div className="space-y-1">
        <span className="text-xs font-mono font-medium tracking-wider text-blue-400/90 block">
          Project:
        </span>
        <h4 className="text-2xl font-bold tracking-tight text-white font-sans truncate leading-tight group-hover:text-blue-300 transition-colors">
          {name}
        </h4>
        <span className="text-xs font-mono text-blue-400/50 block pt-0.5">
          Created: {age}
        </span>
      </div>

      {/* Bottom Counter Area */}
      <div className="mt-8 pt-2">
        <span className="text-base font-bold text-yellow-400 tracking-wide block font-mono">
          {count}
        </span>
        <span className="text-[10px] font-mono text-blue-400/40 block mt-0.5 uppercase tracking-tight">
          lastest added: {age}
        </span>
      </div>
    </div>
  );
}