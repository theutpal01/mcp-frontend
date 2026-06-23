"use client";

import React, { useState } from "react";
import { Navigation } from "./navigation";
import { DashboardWorkspace } from "./dashboard-workspace";
import { ViewPlaceholder } from "./view-placeholder";
import { UserOut } from "@/types/api";

interface DashboardViewProps {
  user: UserOut | null;
  onLogout?: () => void;
  glassLayout?: boolean;
}

export function DashboardView({ user = null, onLogout, glassLayout = true }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-background text-white flex flex-col md:flex-row font-sans select-none antialiased w-full pb-16 md:pb-0">
      
      {/* Structural Responsive Sidebar/Bottom Navbar Framework */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userEmail={user?.email || ""} 
        onLogout={onLogout} 
      />

      {/* --- DASHBOARD MAIN PLATFORM PANEL SPACE --- */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto relative w-full flex flex-col justify-start">
        {/* Background Ambient Radial Blur Shimmer Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-brand-blue/5 blur-[100px] sm:blur-[120px] rounded-full pointer-events-none" />

        {/* Unified Tab Router Component Delivery Block */}
        {activeTab === "Dashboard" ? (
          <DashboardWorkspace 
            glassLayout={glassLayout} 
            user={user} 
          />
        ) : (
          <ViewPlaceholder title={activeTab} />
        )}
      </main>
    </div>
  );
}