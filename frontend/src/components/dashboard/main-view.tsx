"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  FolderGit2, 
  Globe, 
  User, 
  Settings, 
  Plus, 
  Plug, 
  Award, 
  Sparkles, 
  CloudLightning, 
  ArrowRight 
} from "lucide-react";

export function DashboardView() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Mock data reflecting your design parameters perfectly
  const metrics = [
    {
      title: "Total MCPs",
      value: "24",
      change: "+3 this week",
      changeType: "positive",
      icon: <Plug className="w-4 h-4 text-brand-yellow" />,
    },
    {
      title: "Average Score",
      value: "76",
      change: "from 61 last month",
      changeType: "neutral",
      icon: <Award className="w-4 h-4 text-brand-yellow" />,
    },
    {
      title: "Optimizations Completed",
      value: "138",
      change: "12 today",
      changeType: "neutral",
      icon: <Sparkles className="w-4 h-4 text-brand-yellow" />,
    },
    {
      title: "Deployments",
      value: "19",
      change: "2 pending",
      changeType: "negative",
      icon: <CloudLightning className="w-4 h-4 text-brand-yellow" />,
    },
  ];

  const projects = [
    { id: 1, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 2, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 3, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 4, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
  ];

  return (
    <div className="min-h-screen bg-background text-white flex font-sans select-none antialiased">
      
      {/* --- SIDEBAR NAVIGATION CONTAINER --- */}
      <aside className="w-64 border-r border-glass-border bg-glass-bg backdrop-blur-2xl flex flex-col justify-between p-6 shrink-0">
        <div className="space-y-8">
          {/* Main Brand Logo Identity */}
          <div className="flex items-center gap-3 pl-2">
            <div className="p-2 bg-brand-blue rounded-xl shadow-lg shadow-brand-blue/20 flex items-center justify-center">
              <Plug className="w-5 h-5 text-brand-yellow transform rotate-45" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white">PlugFit</span>
          </div>

          {/* Navigation Route Menu Stack */}
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
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? "bg-brand-blue/15 text-brand-yellow border border-brand-blue/20" 
                      : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-brand-yellow" : "text-gray-400"}>
                    {item.icon}
                  </span>
                  {item.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Workspace Profile Plate Footer */}
        <div className="flex items-center gap-3 p-2 border-t border-glass-border/60 pt-4">
          <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-semibold text-gray-300">
            UJ
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-mono text-gray-400 truncate">user.john...</p>
          </div>
        </div>
      </aside>

      {/* --- MAIN INTERACTIVE WORKSPACE AREA --- */}
      <main className="flex-1 p-8 overflow-y-auto space-y-8 relative">
        {/* Background Ambient Depth Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Action Header Control Bar */}
        <div className="flex justify-end items-center relative z-10">
          <button className="flex items-center gap-2 px-5 h-11 bg-brand-darkBtn text-brand-yellow font-medium text-sm border border-glass-border rounded-full hover:border-brand-blue/30 hover:bg-brand-darkBtn/80 transition shadow-lg">
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>

        {/* --- METRICS CONTENT SECTION --- */}
        <section className="bg-glass-bg border border-glass-border rounded-3xl p-6 space-y-4 shadow-xl relative z-10">
          <h2 className="text-sm font-medium tracking-wide text-brand-yellow uppercase font-mono">
            Metrics
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((card, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-b from-[#0b172a] via-transparent to-transparent border border-glass-border rounded-2xl p-5 relative overflow-hidden group min-h-[160px] flex flex-col justify-between"
              >
                {/* Visual Glass Shimmer Gloss Layer */}
                <div className="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-brand-blue/10 to-transparent opacity-100 transition-opacity duration-500 group-hover:from-brand-blue/15" />
                
                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs text-gray-400 font-medium tracking-wide">{card.title}</span>
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    {card.icon}
                  </div>
                </div>

                <div className="mt-4 relative z-10">
                  <div className="text-4xl font-bold font-mono tracking-tight text-white">
                    {card.value}
                  </div>
                  <span className={`text-[11px] font-mono mt-1 block ${
                    card.changeType === "positive" ? "text-brand-blue" :
                    card.changeType === "negative" ? "text-red-400" : "text-gray-500"
                  }`}>
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- RECENT ACTIVITY SECTION TRACK --- */}
        <section className="bg-glass-bg border border-glass-border rounded-3xl p-6 space-y-4 shadow-xl relative z-10">
          <h2 className="text-sm font-medium tracking-wide text-brand-yellow uppercase font-mono">
            Recent Activity
          </h2>

          <div className="relative">
            {/* Horizontal Track Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pr-12">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-b from-[#061224]/60 to-[#030508]/40 border border-glass-border rounded-2xl p-5 space-y-4 hover:border-brand-blue/20 transition duration-300"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-blue uppercase tracking-wider block">Project:</span>
                    <h3 className="text-base font-medium text-white tracking-wide truncate">{project.name}</h3>
                    <p className="text-[11px] text-gray-500 font-sans">Created: {project.age}</p>
                  </div>
                  
                  <div className="pt-2 border-t border-glass-border/40">
                    <span className="text-xs text-brand-yellow font-medium font-mono block">{project.count}</span>
                    <p className="text-[10px] text-gray-600 mt-0.5">latest added: {project.age}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Next Navigation Trigger Handle overlay */}
            <div className="absolute right-0 top-0 bottom-0 w-10 flex items-center justify-center bg-gradient-to-l from-background to-transparent z-20">
              <button className="p-2 bg-brand-darkBtn border border-glass-border rounded-full hover:border-brand-yellow/40 transition text-brand-yellow group shadow-lg">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}