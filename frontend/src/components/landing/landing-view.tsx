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
      {/* Interactive Moving Waves Background Canvas */}
      <MCPContextNexusBackground />

      {/* Top Navbar */}
      <Navbar onAuthClick={onNavigateToAuth} />

      {/* HERO SECTION - Configured with wider max-w-7xl/1440px constraints to prevent empty side space on 1920x1080 screens */}
      <header className="pt-28 sm:pt-36 pb-16 max-w-7xl mx-auto px-6 xl:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        
        {/* Hero Left Column */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Main Hero Title */}
          <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-wide font-sans leading-tight">
            <span className="text-[#FBEB4D] block">MCPs That AI</span>
            <span className="text-[#00bfff] block">Agents Can</span>
            <span className="text-[#00bfff] block">Actually Use</span>
          </h1>

          {/* Subtitle Paragraph */}
          <p className="text-gray-300 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base font-sans leading-relaxed">
            Upload an MCP sever and PlugFit automatically cleans, evaluates, optimizes and deploys it.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#FBEB4D] text-[#030d1c] font-bold text-sm hover:bg-yellow-300 transition-all duration-200 shadow-lg text-center"
            >
              Start Optimizing
            </Link>
            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#041630]/90 border border-[#FBEB4D]/80 text-[#FBEB4D] font-bold text-sm hover:bg-blue-950 transition-all duration-200 shadow-lg text-center cursor-pointer"
            >
              Watch Demo
            </button>
          </div>
        </div>

        {/* Hero Right Column: 3D Score Sphere Graphic */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto flex justify-center">
          <ScoreSimulator />
        </div>

      </header>

      {/* MAIN SECTIONS */}
      <main className="w-full space-y-8 overflow-x-hidden">
        {/* THE PROBLEM SECTION */}
        <ProblemSection />

        {/* FEATURES SECTION */}
        <FeaturesGrid />

        {/* REGISTRY PREVIEW SECTION */}
        <RegistryPreview />

        {/* OPTIMIZE YOUR MCP TODAY BANNER */}
        <CtaBanner />
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-blue-900/40 text-center text-xs text-blue-400/50 font-sans">
        <p>© 2026 PlugFit. All rights reserved.</p>
      </footer>
    </div>
  );
}