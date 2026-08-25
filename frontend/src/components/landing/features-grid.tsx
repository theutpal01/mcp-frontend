// components/landing/features-grid.tsx
"use client";

import React from "react";

export function FeaturesGrid() {
  const features = [
    {
      num: "1",
      title: "Universal Ingest",
      desc: "OpenAPI Swagger MCP URLs Tool manifest",
    },
    {
      num: "2",
      title: "AI Cleaning",
      desc: "Merges duplicates. Improves descriptions.",
    },
    {
      num: "3",
      title: "AI Test Generation",
      desc: "Automatically creates evaluation tasks.",
    },
    {
      num: "4",
      title: "Agent Evaluation",
      desc: "Measures actual usability",
    },
    {
      num: "5",
      title: "Community Connect",
      desc: "Connect with other builders publishing MCPs on PlugFit",
    },
    {
      num: "6",
      title: "One Click Deployment",
      desc: "Deploy optimized MCPs",
    },
  ];

  return (
    <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FBEB4D] tracking-widest uppercase font-sans text-center mb-10">
        Features
      </h2>

      {/* 6 Feature Capsule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {features.map((item) => (
          <div
            key={item.num}
            className="flex h-24 rounded-full border border-blue-900/40 overflow-hidden bg-[#041630]/30 hover:border-blue-500/40 transition-all duration-200 shadow-lg"
          >
            {/* Left Block: Rounded Cap containing Yellow Number */}
            <div className="w-20 sm:w-24 bg-[#052857] flex items-center justify-center border-r border-blue-900/40 shrink-0">
              <span className="text-[#FBEB4D] font-extrabold text-3xl font-sans">
                {item.num}
              </span>
            </div>

            {/* Right Block: Text Content */}
            <div className="flex-1 flex flex-col justify-center px-6 py-2">
              <h3 className="text-sm sm:text-base font-bold text-[#FBEB4D] font-sans">
                {item.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm font-sans mt-0.5 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}