import React from "react";
import Link from "next/link";
import { Navbar } from "./navbar";
import { ScoreSimulator } from "./score-simulator";
import { FeaturesGrid } from "./features-grid";
import { GradientGraphic } from "@/components/auth/gradient-graphic";
import { ArrowRight } from "lucide-react";

interface LandingViewProps {
  onNavigateToAuth?: () => void;
}

export function LandingView({ onNavigateToAuth }: LandingViewProps) {
  return (
    <>
      <Navbar onAuthClick={onNavigateToAuth} />

      {/* HERO SECTION */}
      <header className="pt-36 pb-24 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center flex-grow">
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#007BFF]/5 border border-[#007BFF]/10 text-xs font-mono text-[#007BFF]">
            <span>Optimization Protocol F-01 Engine Standard</span>
          </div> */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-medium tracking-tight text-[#FBEB4D] leading-[1.1]">
            MCPs that AI Agents <br /> can actually use.
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
            Stop feeding agents auto-generated, cluttered plugs. PlugFit ingests API schemas, automatically purges duplicate declarations, and certifies reliability via autonomous validation loops.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <Link href="/signup"
              className="w-full sm:w-auto px-6 h-12 flex items-center justify-center gap-2 bg-[#0B182E] text-[#FBEB4D] font-medium border border-glass-border rounded-xl hover:border-[#007BFF]/30 transition-all shadow-lg group"
            >
              Optimize Your API Spec
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 w-full max-w-xl mx-auto">
          <ScoreSimulator />
        </div>
      </header>

      <main id="features" className="border-y border-glass-border bg-black/10">
        <FeaturesGrid />
      </main>

      {/* FOOTER */}
      <footer className="relative h-[65vh] bg-[#05080E] border-t border-glass-border pt-16 pb-12 overflow-hidden mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-10 relative z-10 mb-16">
          <div className="col-span-2 space-y-4">
            <span className="font-bold text-white tracking-wide text-lg">PlugFit</span>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              The continuous evaluation and optimization runtime layer engineered exclusively for Model Context Protocol servers.
            </p>
          </div>
          {["Platform", "Registry", "System"].map((title, i) => (
            <div key={i} className="space-y-3 font-mono text-xs">
              <h4 className="text-[11px] uppercase tracking-widest text-[#007BFF] font-semibold">{title}</h4>
              <ul className="space-y-2 text-gray-400 font-sans text-xs">
                <li><a href="#" className="hover:text-[#FBEB4D] transition">Sub-System Link</a></li>
                <li><a href="#" className="hover:text-[#FBEB4D] transition">Documentation</a></li>
              </ul>
            </div>
          ))}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[125%] pointer-events-none opacity-50">
          <GradientGraphic/>
        </div>
      </footer>
    </>
  );
}