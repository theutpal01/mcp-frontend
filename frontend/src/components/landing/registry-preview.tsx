// components/landing/registry-preview.tsx
"use client";

import React from "react";

export function RegistryPreview() {
  const registryItems = [
    {
      name: "Stripe Payments",
      category: "Finance",
      score: "44",
    },
    {
      name: "Postgres Query",
      category: "Database",
      score: "66",
    },
    {
      name: "Notion Workspace",
      category: "Docs",
      score: "81",
    },
  ];

  return (
    <section id="registry" className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FBEB4D] tracking-widest uppercase font-sans text-center mb-10">
        Registry Preview
      </h2>

      {/* 3 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {registryItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#041630]/90 backdrop-blur-md border border-blue-900/50 rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-xl hover:border-blue-500/40 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-white font-sans truncate">
                  {item.name}
                </h3>
                <p className="text-xs text-blue-400/80 font-sans">
                  {item.category}
                </p>
              </div>
              <span className="text-lg font-bold text-[#FBEB4D] font-sans">
                {item.score}
              </span>
            </div>

            <div className="pt-2 flex justify-center">
              <button className="px-6 py-1.5 rounded-full bg-[#052857] border border-blue-600/40 text-[#FBEB4D] font-bold text-xs hover:bg-[#0070f3] hover:text-white transition-colors duration-200 cursor-pointer">
                DEPLOY
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
