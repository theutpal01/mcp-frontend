import React, { useState } from "react";
import { LayoutDashboard, FolderGit2, Globe, User, Settings, Plus, Plug, Award, Sparkles, CloudLightning, ArrowRight } from "lucide-react";

interface DashboardViewProps {
  userEmail?: string;
  onLogout?: () => void;
}

export function DashboardView({ userEmail = "amina.tabasum...", onLogout }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div className="flex flex-1 min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-glass-border bg-glass-bg backdrop-blur-2xl flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3 pl-2">
            <div className="p-2 bg-[#007BFF] rounded-xl flex items-center justify-center">
              <Plug className="w-5 h-5 text-[#FBEB4D] transform rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white">PlugFit</span>
          </div>

          <nav className="space-y-1.5">
            {[
              { name: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
              { name: "View my projects", icon: <FolderGit2 className="w-4 h-4" /> },
              { name: "View others", icon: <Globe className="w-4 h-4" /> },
              { name: "Profile", icon: <User className="w-4 h-4" /> },
              { name: "Settings", icon: <Settings className="w-4 h-4" /> },
            ].map((item) => {
              const isActive = activeTab === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(item.name)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive ? "bg-[#007BFF]/15 text-[#FBEB4D] border border-[#007BFF]/20" : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        <div onClick={onLogout} className="flex items-center gap-3 p-2 border-t border-glass-border/60 pt-4 cursor-pointer hover:bg-white/5 rounded-xl transition">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-semibold text-gray-300">UJ</div>
          <p className="text-xs font-mono text-gray-400 truncate">{userEmail}</p>
        </div>
      </aside>

      {/* DASHBOARD CONTENT BODY */}
      <main className="flex-1 p-8 space-y-8 overflow-y-auto">
        <div className="flex justify-end">
          <button className="flex items-center gap-2 px-5 h-11 bg-[#0B182E] text-[#FBEB4D] font-medium text-sm border border-glass-border rounded-full hover:border-[#007BFF]/30 transition">
            <Plus className="w-4 h-4" /> Create Project
          </button>
        </div>

        {/* METRICS TRACK SHELF */}
        <section className="bg-glass-bg border border-glass-border rounded-3xl p-6 space-y-4 shadow-xl">
          <h2 className="text-sm font-medium tracking-wide text-[#FBEB4D] uppercase font-mono">Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Standard Non-Redundant Metric Mapping Loop */}
            {[
              { title: "Total MCPs", val: "24", sub: "+3 this week", icon: <Plug className="w-4 h-4 text-[#FBEB4D]" /> },
              { title: "Average Score", val: "76", sub: "from 61 last month", icon: <Award className="w-4 h-4 text-[#FBEB4D]" /> },
              { title: "Optimizations Completed", val: "138", sub: "12 today", icon: <Sparkles className="w-4 h-4 text-[#FBEB4D]" /> },
              { title: "Deployments", val: "19", sub: "2 pending", icon: <CloudLightning className="w-4 h-4 text-[#FBEB4D]" /> }
            ].map((m, idx) => (
              <div key={idx} className="bg-gradient-to-b from-[#0b172a] via-transparent to-transparent border border-glass-border rounded-2xl p-5 relative overflow-hidden min-h-[160px] flex flex-col justify-between">
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs text-gray-400 font-medium">{m.title}</span>
                  {m.icon}
                </div>
                <div className="mt-4 relative z-10">
                  <div className="text-4xl font-bold font-mono text-white">{m.val}</div>
                  <span className="text-[11px] font-mono mt-1 block text-gray-500">{m.sub}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}