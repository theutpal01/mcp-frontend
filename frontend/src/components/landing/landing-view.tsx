// components/landing/landing-view.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "./navbar";
import { ScoreSimulator } from "./score-simulator";
import { ProblemSection } from "./problem-section";
import { FeaturesGrid } from "./features-grid";
import { RegistryPreview } from "./registry-preview";
import { CtaBanner } from "./cta-banner";
import { MCPContextNexusBackground } from "@/components/auth/reactive-background";

interface LandingViewProps {
  onNavigateToAuth?: () => void;
}

export function LandingView({ onNavigateToAuth }: LandingViewProps) {
  return (
    <div id="home" className="min-h-screen text-white flex flex-col font-sans select-none antialiased w-full relative overflow-x-hidden">
      <MCPContextNexusBackground />

      <Navbar onAuthClick={onNavigateToAuth} />

      {/* HERO SECTION */}
      <header className="pt-36 sm:pt-44 lg:pt-48 pb-12 sm:pb-16 max-w-7xl mx-auto px-5 sm:px-8 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center w-full">

        {/* Hero Left Column: Headline + Subtitle (aligned with sphere) */}
        <div className="lg:col-span-7 lg:row-start-1 space-y-5 sm:space-y-6 text-center lg:text-left">
         {/* Main Hero Title */}
<h1
  className="font-hero font-semibold leading-[1] tracking-[0.05em]"
  style={{
    fontSize: "clamp(1.75rem, 1rem + 3.5vw, 4.5rem)",
    backgroundImage:
      "linear-gradient(180deg, #D9D94D 0%, #0276E2 100%)",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    display: "inline-block",
  }}
>
  <span className="block whitespace-nowrap">MCPs That AI</span>
  <span className="block whitespace-nowrap">Agents Can</span>
  <span className="block whitespace-nowrap">Actually Use</span>
</h1>

         {/* Subtitle Paragraph */}
<p
  className="max-w-md sm:max-w-lg mx-auto lg:mx-0"
  style={{
    fontFamily: "var(--font-body)",
    fontWeight: 400,
    fontSize: "clamp(0.95rem, 0.7rem + 1vw, 1.75rem)",
    lineHeight: 1,
    letterSpacing: "0.05em",
    color: "rgba(255, 255, 255, 0.7)",
  }}
>
  Upload an MCP server and PlugFit automatically cleans, evaluates,
  optimizes and deploys it.
</p>
        </div>

               {/* Hero Right Column: 3D Score Sphere Graphic (aligned with headline+subtitle only) */}
        <div className="lg:col-span-5 lg:row-start-1 w-full max-w-[220px] sm:max-w-[300px] lg:max-w-md mx-auto flex justify-center order-first lg:order-none">
          <ScoreSimulator />
        </div>

                  {/* Action Button */}
        <div className="lg:col-span-7 lg:row-start-2 flex justify-center lg:justify-start pt-1 mx-auto lg:mx-0">
          <Link
            href="/signup"
            className="px-10 sm:px-12 py-4 sm:py-5 rounded-2xl bg-[#FBEB4D] text-[#0276E2] font-extrabold text-base sm:text-lg tracking-wide hover:bg-yellow-300 hover:scale-[1.02] transition-all duration-200 shadow-lg text-center whitespace-nowrap"
          >
            Start Optimizing
          </Link>
        </div>

      </header>

      <main className="w-full space-y-8 overflow-x-hidden pt-24 sm:pt-32 lg:pt-40">
        <ProblemSection />
        <FeaturesGrid />
        <RegistryPreview />
        <CtaBanner />
      </main>

      <footer className="w-full py-8 border-t border-blue-900/40 text-center text-xs text-blue-400/50 font-sans">
        <p>© 2026 PlugFit. All rights reserved.</p>
      </footer>
    </div>
  );
}