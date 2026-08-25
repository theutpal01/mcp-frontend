// components/ui/background-mesh.tsx
import React from "react";

interface BackgroundMeshProps {
  children: React.ReactNode;
  showGlows?: boolean;
}

export function BackgroundMesh({ children, showGlows = true }: BackgroundMeshProps) {
  return (
    <div className="min-h-screen w-full bg-[#030508] text-white selection:bg-[#007BFF]/20 font-sans relative antialiased overflow-x-hidden">
      {/* CENTRALIZED TECH-GRID DRIFT MESH */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] overflow-hidden">
        <div 
          className="w-full h-[200%] animate-grid-scroll"
          style={{
            backgroundImage: "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* AMBIENT RADIAL DEPTH FLARES */}
      {showGlows && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#007BFF]/5 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#007BFF]/5 blur-[120px] rounded-full pointer-events-none z-0" />
        </>
      )}

      {/* CONTENT LAYER */}
      <div className="relative z-10 w-full min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </div>
    </div>
  );
}