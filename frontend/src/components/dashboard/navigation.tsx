"use client";

import React from "react";
import { LayoutDashboard, FolderGit2, User, LogOut } from "lucide-react";
import Image from "next/image";
import { UserOut } from "@/types/api";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: UserOut | null;
  onLogout?: () => void;
}

export function Navigation({ activeTab, setActiveTab, user, onLogout }: NavigationProps) {
  const mobileNavItems = [
    { name: "Projects", icon: <FolderGit2 className="w-5 h-5" />, isCenter: false },
    { name: "Dashboard", icon: <LayoutDashboard className="w-5.5 h-5.5" />, isCenter: true },
    { name: "Profile", icon: <User className="w-5 h-5" />, isCenter: false },
  ];

  const themeStyles = {
    gradientBg: "linear-gradient(to bottom, rgba(26, 26, 34, 0.94), rgba(16, 16, 22, 0.97))",
    borderColor: "rgba(255, 255, 255, 0.08)",
  };

  return (
    <>
      {/* Dynamic Keyframes */}
      <style>{`
        @keyframes liquidSlide {
          0% { transform: scaleX(0.4); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
        .animate-liquid-track {
          animation: liquidSlide 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      {/* --- DESKTOP SIDEBAR NAVIGATION --- */}
      <aside className="hidden md:flex w-64 border-r border-slate-900/60 bg-[#030914]/80 backdrop-blur-2xl flex-col justify-between p-6 shrink-0 z-30 h-full rounded-r-2xl select-none">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pl-2">
            <Image src="/logo.svg" alt="PlugFit Logo" width={32} height={32} className="w-8 h-8" />
            <span className="font-bold text-xl tracking-wide text-white">PlugFit</span>
          </div>

          <nav className="space-y-1.5">
            {mobileNavItems.map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-brand-blue/15 text-brand-yellow border border-brand-blue/20 shadow-inner"
                      : "text-blue-400/60 hover:text-white hover:bg-blue-950/20 border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-brand-yellow" : "text-blue-400/50"}>
                    {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                  </span>
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* --- ENHANCED PROFILE ACTION HUB (keyboard-accessible logout) --- */}
        <button
          type="button"
          onClick={onLogout}
          aria-label={user?.name ? `Log out ${user.name}` : "Log out"}
          className="w-full text-left flex items-center gap-3 p-2.5 border-t border-slate-900/80 pt-4 cursor-pointer bg-transparent hover:bg-blue-950/20 hover:border-blue-900/20 border border-transparent rounded-xl transition-all duration-300 group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/60"
        >
          {/* Gradient Cell Wrapper with System Active Indicator Pip */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue/20 to-blue-950/40 border border-blue-500/20 flex items-center justify-center text-sm font-bold text-white shadow-[0_0_10px_rgba(0,112,243,0.1)] group-hover:border-blue-400/40 transition-colors">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            {/* Ambient Pulse Active Dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#d4ff00] rounded-full border-2 border-[#020712] shadow-[0_0_8px_#d4ff00]" />
          </div>

          {/* User Meta Frame */}
          <div className="overflow-hidden flex-1 flex flex-col justify-center min-w-0">
            <h4 className="text-sm font-bold text-white truncate font-sans group-hover:text-blue-400 transition-colors">
              {user?.name ?? "User"}
            </h4>
            <p className="text-[10px] font-mono text-blue-400/50 truncate uppercase tracking-tight mt-0.5">
              {user?.email ?? "no email"}
            </p>
          </div>

          {/* Interactive Logout Vector Trigger */}
          <div className="text-blue-400/40 group-hover:text-red-400 transition-colors pr-1 shrink-0">
            <LogOut className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" aria-hidden="true" />
          </div>
        </button>
      </aside>

      {/* --- MOBILE NAVIGATION DOCK --- */}
      <div className="md:hidden fixed bottom-5 inset-x-4 h-16 z-50">
        <div className="relative w-full h-full">
          
          {/* UNIFIED BACKGROUND MASTER WRAPPER */}
          <div className="absolute inset-0 flex items-end select-none pointer-events-none w-full h-full backdrop-blur-2xl filter drop-shadow-[0_-10px_20px_rgba(0,0,0,0.65)]">
            {/* Left Molding Wing */}
            <div 
              style={{ background: themeStyles.gradientBg, borderTopColor: themeStyles.borderColor, borderBottomColor: themeStyles.borderColor, borderLeftColor: themeStyles.borderColor }}
              className="flex-1 h-16 border-t border-b border-l rounded-l-2xl -mr-[1px]" 
            />
            
            {/* Seamless Center SVG Cradle */}
            <svg 
              viewBox="0 0 100 64" 
              className="w-[100px] h-16 shrink-0 overflow-visible"
            >
              <defs>
                <linearGradient id="dockMoldingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(26, 26, 34, 0.94)" />
                  <stop offset="100%" stopColor="rgba(16, 16, 22, 0.97)" />
                </linearGradient>
              </defs>
              
              <path 
                d="M 0 0 H 18 C 26 0, 25 15, 32 25 C 38 34, 43 36, 50 36 C 57 36, 62 34, 68 25 C 75 15, 74 0, 82 0 H 100 L 100 64 L 0 64 Z" 
                fill="url(#dockMoldingGrad)"
              />
              
              <path 
                d="M 0 0 H 18 C 26 0, 25 15, 32 25 C 38 34, 43 36, 50 36 C 57 36, 62 34, 68 25 C 75 15, 74 0, 82 0 H 100" 
                fill="none" 
                stroke={themeStyles.borderColor} 
                strokeWidth="1"
              />
              
              <path 
                d="M 0 64 L 100 64" 
                fill="none" 
                stroke={themeStyles.borderColor} 
                strokeWidth="1"
              />
            </svg>
            
            {/* Right Molding Wing */}
            <div 
              style={{ background: themeStyles.gradientBg, borderTopColor: themeStyles.borderColor, borderBottomColor: themeStyles.borderColor, borderRightColor: themeStyles.borderColor }}
              className="flex-1 h-16 border-t border-b border-r rounded-r-2xl -ml-[1px]" 
            />
          </div>

          {/* --- INTERACTIVE ITEM MATRIX FOREGROUND --- */}
          <nav className="absolute inset-0 grid grid-cols-3 h-full items-center z-10 w-full">
            {mobileNavItems.map((item) => {
              const isActive = activeTab === item.name;
              
              if (item.isCenter) {
                return (
                  <div key={item.name} className="relative flex flex-col justify-center items-center h-full">
                    <div className="absolute -top-5.5 w-14 h-14 z-20 transition-all duration-300">
                      <button
                        onClick={() => setActiveTab(item.name)}
                        className={`w-14 h-14 rounded-full flex flex-col items-center justify-center transition-all duration-300 outline-none ${
                          isActive
                            ? "bg-brand-blue text-brand-yellow scale-110 shadow-[0_8px_25px_rgba(0,123,255,0.55)] ring-2 ring-brand-blue/30"
                            : "bg-[#1f1f2e] text-blue-400 border border-glass-border shadow-md"
                        }`}
                      >
                        <div className={`transition-transform duration-500 ease-out ${isActive ? "rotate-[360deg] scale-105" : ""}`}>
                          {item.icon}
                        </div>
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`flex flex-col items-center justify-center h-full pt-2 pb-1 relative transition-all duration-200 select-none ${
                    isActive ? "text-brand-blue" : "text-blue-400/40 hover:text-white"
                  }`}
                >
                  {/* Neon Liquid Indicator Pip */}
                  {isActive && (
                    <span className="absolute top-[1px] w-6 h-[2.5px] bg-brand-blue rounded-full shadow-[0_2px_12px_rgba(0,123,255,0.8)] animate-liquid-track" />
                  )}
                  <div className={`p-1 transition-all duration-300 ${isActive ? "scale-110 text-brand-blue -translate-y-0.5" : ""}`}>
                    {item.icon}
                  </div>
                  <span className={`text-[9px] font-medium tracking-tight mt-0.5 font-sans transition-all ${
                    isActive ? "font-semibold text-white" : "text-blue-400/40"
                  }`}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}