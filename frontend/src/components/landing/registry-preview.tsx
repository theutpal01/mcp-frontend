// components/landing/registry-preview.tsx
"use client";

import React from "react";

export function RegistryPreview() {
  const registryItems = [
    { name: "Stripe Payments", category: "Finance", score: "44" },
    { name: "Postgres Query", category: "Database", score: "66" },
    { name: "Notion Workspace", category: "Docs", score: "81" },
  ];

  return (
    <section
      id="registry"
      className="pt-16 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full"
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
        Registry Preview
      </h2>

      {/* 3 Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl mx-auto">
        {registryItems.map((item, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-blue-900/40 flex flex-col justify-between shrink-0 transition-all duration-200 p-6"
            style={{ backgroundColor: "rgba(0, 85, 164, 0.2)" }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <h3
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontWeight: 700,
                    color: "#ffffff",
                    fontSize: "clamp(0.95rem, 0.6rem + 0.9vw, 1.25rem)",
                    lineHeight: 1.2,
                  }}
                >
                  {item.name}
                </h3>
                <p
                  style={{
                    fontFamily: "'Helvetica Neue', Arial, sans-serif",
                    fontWeight: 500,
                    color: "#0276E2",
                    fontSize: "clamp(0.75rem, 0.55rem + 0.6vw, 0.95rem)",
                  }}
                >
                  {item.category}
                </p>
              </div>
              <span
                style={{
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 700,
                  color: "#D9D94D",
                  fontSize: "clamp(1.1rem, 0.7rem + 1.2vw, 1.75rem)",
                }}
              >
                {item.score}
              </span>
            </div>

            <div className="pt-6 flex justify-center">
              <button
                className="rounded-full border border-blue-600/40 hover:bg-[#0070f3] hover:text-white transition-colors duration-200 cursor-pointer"
                style={{
                  backgroundColor: "#052857",
                  color: "#D9D94D",
                  fontFamily: "'Helvetica Neue', Arial, sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(0.75rem, 0.55rem + 0.5vw, 0.9rem)",
                  padding: "0.6rem 2.25rem",
                }}
              >
                DEPLOY
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}