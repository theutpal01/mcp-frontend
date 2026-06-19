import React from "react";
import { GradientGraphic } from "./gradient-graphic";
import { TiltCard } from "@/components/ui/tilt-card";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row items-center justify-center p-6 lg:p-16 gap-8 lg:gap-12 overflow-hidden select-none">
      
      {/* LEFT HAND CARD: Branding & Asymmetric Graphic */}
      <div className="w-full max-w-md lg:h-[580px] bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 sm:p-10 shadow-2xl relative flex flex-col justify-between overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-medium text-brand-yellow leading-tight tracking-wide text-left max-w-xs">
            MCPs that AI Agents can actually use.
          </h1>
        </div>
        
        {/* Graph Container at the bottom of the card */}
        <div className="absolute inset-x-0 bottom-0 h-full w-full">
          <GradientGraphic />
        </div>
      </div>

      {/* RIGHT HAND CARD: Interactive Form with 3D Mouse Tilt */}
      <TiltCard 
        maxRotation={4} 
        scale={1.01}
        className="w-full max-w-md lg:h-[580px] bg-glass-bg backdrop-blur-xl border border-glass-border rounded-3xl p-8 sm:p-10 shadow-2xl flex flex-col justify-center"
      >
        {children}
      </TiltCard>
      
    </div>
  );
}