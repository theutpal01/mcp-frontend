// components/landing/cta-banner.tsx
"use client";

import React from "react";
import Link from "next/link";

const W = 224; // bar width, matches Figma asset
const H = 578; // full banner height, matches Figma asset
const CORNER_R = 150; // outer corner radius, from Figma path
const K = 0.447716; // bezier control offset ratio derived from Figma's curve (150 * 0.447716 ≈ 67.1573)

// Bar top-edge y position (smaller = taller bar). Bottom is always fixed at H.
const BAR_TOPS = [250, 0, 160, 40, 0, 120, 0, 220];

function plainBarPath(x: number, topY: number) {
  return `M${x} ${topY} H${x + W} V${H} H${x} V${topY} Z`;
}

// Rounded bottom-left corner, replicating the Figma path shape
function leftRoundedBarPath(x: number, topY: number) {
  const c = CORNER_R * K;
  return `
    M${x} ${topY}
    H${x + W}
    V${H}
    H${x + CORNER_R}
    C${x + c} ${H} ${x} ${H - (CORNER_R - c)} ${x} ${H - CORNER_R}
    V${topY}
    Z
  `;
}

// Rounded bottom-right corner (mirrored)
function rightRoundedBarPath(x: number, topY: number) {
  const c = CORNER_R * K;
  return `
    M${x} ${topY}
    H${x + W}
    V${H - CORNER_R}
    C${x + W} ${H - (CORNER_R - c)} ${x + W - c} ${H} ${x + W - CORNER_R} ${H}
    H${x}
    V${topY}
    Z
  `;
}

export function CtaBanner() {
  const totalWidth = BAR_TOPS.length * W;

  return (
    <section className="pt-0 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full flex justify-center">
      <div className="relative w-full max-w-4xl rounded-[32px] overflow-hidden min-h-[220px]">
        {/* Skyline: one shared gradient in absolute (userSpaceOnUse) coordinates,
            so every bar samples the SAME absolute row — yellow lines up across all bars. */}
        <svg
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox={`0 0 ${totalWidth} ${H}`}
        >
          <defs>
            <linearGradient
              id="skylineGradient"
              gradientUnits="userSpaceOnUse"
              x1={totalWidth / 2}
              y1="0"
              x2={totalWidth / 2}
              y2={H}
            >
              <stop offset="0.175" stopColor="#015DB4" stopOpacity="0" />
              <stop offset="0.35" stopColor="#0166C3" />
              <stop offset="0.5" stopColor="#0276E2" />
              <stop offset="0.75" stopColor="#C3C33E" stopOpacity="0.75" />
              <stop offset="1" stopColor="#EBEB5C" />
            </linearGradient>
          </defs>

          {BAR_TOPS.map((topY, i) => {
            const x = i * W;
            const isFirst = i === 0;
            const isLast = i === BAR_TOPS.length - 1;
            const d = isFirst
              ? leftRoundedBarPath(x, topY)
              : isLast
              ? rightRoundedBarPath(x, topY)
              : plainBarPath(x, topY);
            return <path key={i} d={d} fill="url(#skylineGradient)" />;
          })}
        </svg>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[220px] p-8 sm:p-10 text-center space-y-4">
          <div className="space-y-0.5">
            <h2
              className="text-3xl sm:text-5xl text-white tracking-wide"
              style={{
                fontFamily: "var(--font-hero)",
                fontWeight: 600,
              }}
            >
              Optimize your
            </h2>
            <h2
              className="text-3xl sm:text-5xl text-white tracking-wide"
              style={{
                fontFamily: "var(--font-hero)",
                fontWeight: 600,
              }}
            >
              MCP today
            </h2>
          </div>

          <div className="pt-1">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-10 py-3.5 rounded-2xl text-[#D9D94D] hover:brightness-110 active:scale-95 transition-all duration-200"
              style={{
                backgroundColor: "#011226",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "clamp(1rem, 0.8rem + 0.5vw, 1.25rem)",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}