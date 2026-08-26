// components/landing/features-grid.tsx
"use client";

import React from "react";

export function FeaturesGrid() {
  const features = [
    {
      num: "1",
      title: "Universal Ingest",
      desc: "OpenAPI  Swagger  MCP URLs  Tool manifest",
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
    <section
      id="features"
      className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full"
    >
      {/* Section Title */}
      <h2
        className="text-center mb-10 uppercase"
        style={{
          fontFamily: "'Conthrax', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: "#D9D94D",
          fontSize: "clamp(1.75rem, 1rem + 3.2vw, 3.75rem)",
          lineHeight: 1,
        }}
      >
        Features
      </h2>

      {/* 6 Feature Capsule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto">
        {features.map((item) => (
          <div
            key={item.num}
            className="relative flex h-24 rounded-full border border-blue-900/40 overflow-hidden transition-all duration-200"
            style={{ backgroundColor: "rgba(0, 85, 164, 0.2)" }}
          >
            {/* Left Block: Number */}
            <div
              className="w-20 sm:w-24 flex items-center justify-center shrink-0"
              style={{ backgroundColor: "rgba(0, 85, 164, 0.35)" }}
            >
              <span
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 700,
                  color: "#D9D94D",
                  fontSize: "clamp(1.75rem, 1rem + 2vw, 3rem)",
                }}
              >
                {item.num}
              </span>
            </div>

            {/* Right Block: Text Content — centered, yellow title */}
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-2">
              <h3
                className="mb-0.5"
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 700,
                  color: "#D9D94D",
                  fontSize: "clamp(0.9rem, 0.6rem + 0.8vw, 1.15rem)",
                  lineHeight: 1.2,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 500,
                  color: "#0276E2",
                  fontSize: "clamp(0.78rem, 0.55rem + 0.9vw, 1.1rem)",
                  lineHeight: 1.4,
                }}
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}