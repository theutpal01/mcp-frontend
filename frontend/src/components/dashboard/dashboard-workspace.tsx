// components/dashboard/dashboard-workspace.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Plug, Award, Sparkles, CloudLightning, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { MetricCard } from "./metric-card";
import { ProjectCard } from "./project-card";
import { UserOut } from "@/types/api";
import { CreateProjectDialog } from "./create-project-dialog";
import { ServerService } from "@/services/server.service";
import { ServerOut } from "@/types/api";

interface DashboardWorkspaceProps {
  glassLayout: boolean;
  user: UserOut | null;
}

export function DashboardWorkspace({ glassLayout, user }: DashboardWorkspaceProps) {
  // Configured precisely to replicate the color transitions seen across card lines in the pictures
  const metrics = [
    {
      title: "Total MCPs",
      value: "24",
      change: "+3 this week",
      changeType: "positive" as const,
      icon: <Plug className="w-4 h-4" />,
      gradient: "from-blue-500 via-blue-600 to-yellow-400",
      glow: "shadow-[0_0_20px_rgba(0,112,243,0.15)]"
    },
    {
      title: "Average Score",
      value: "76",
      change: "from 61 last month",
      changeType: "neutral" as const,
      icon: <Award className="w-4 h-4" />,
      gradient: "from-yellow-400 via-yellow-300 to-blue-500",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]"
    },
    {
      title: "Optimizations Completed",
      value: "138",
      change: "12 today",
      changeType: "neutral" as const,
      icon: <Sparkles className="w-4 h-4" />,
      gradient: "from-blue-500 via-cyan-500 to-yellow-400",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]"
    },
    {
      title: "Deployments",
      value: "19",
      change: "2 pending",
      changeType: "negative" as const,
      icon: <CloudLightning className="w-4 h-4" />,
      gradient: "from-red-500 via-red-600 to-red-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    },
  ];

  const [servers, setServers] = useState<ServerOut[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const fetchServers = async () => {
    try {
      const serverList = await ServerService.listServers();
      setServers(serverList);
    } catch (error) {
      console.error("Failed to fetch servers:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchServers();
    }
  }, [user]);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const placeholderProjects = [
    { id: 1, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 2, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 3, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 4, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 5, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
  ];

  const displayProjects = servers.length > 0
    ? servers.map((server) => ({
        id: server.id,
        name: server.name,
        age: formatTimeAgo(server.created_at),
        count: `${server.tool_count_after ?? 0} tools`,
      }))
    : placeholderProjects;

  return (
    <div className="w-full space-y-6 bg-transparent text-white p-4 sm:p-6 min-h-full overflow-y-auto relative select-none">
      
      {/* Global Background Ambient Topography Lines Map */}
      <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none mix-blend-screen">
        <svg width="100%" height="100%" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
          <path d="M-50,150 C300,80 500,280 800,120 C1050,10 1100,300 1300,250 M-50,300 C250,220 400,450 750,320 C1000,210 1050,500 1300,420 M-50,480 C300,420 450,620 850,500 C1100,400 1150,700 1300,650 M-50,650 C200,580 380,780 700,660 C950,560 1100,850 1300,780" stroke="#00d2ff" strokeWidth="1.5" fill="none" strokeDasharray="4 2"/>
        </svg>
      </div>

      {/* Header Context Bar Row */}
      <div className="flex justify-between md:justify-end items-center gap-4 relative z-10 mb-2">
        <div className="md:hidden flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-white font-sans">PlugFit</h1>
          <p className="text-xs text-blue-400/70 font-mono truncate max-w-[150px]">{user?.email}</p>
        </div>
        
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="w-fit flex items-center gap-2 px-5 h-10 rounded-full bg-[#040d1a] text-yellow-400 font-medium text-sm border border-blue-900/40 hover:bg-blue-950/40 hover:border-blue-500/40 transition duration-300 shadow-xl shrink-0"
          glass={glassLayout}
        >
          <Plus className="w-4 h-4" />
          <span>Create Project</span>
        </Button>
      </div>

      {/* --- METRICS PANEL SECTION --- */}
      <section className="relative z-10 border border-slate-900 bg-brand-blue/10 backdrop-blur-md rounded-[28px] p-6 shadow-[2xl]">
        <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[#d4ff00] font-mono mb-5">
          Metrics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {metrics.map((card, idx) => (
            <MetricCard
              key={idx}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType}
              icon={card.icon}
              gradientBorder={card.gradient}
              glowClass={card.glow}
            />
          ))}
        </div>
      </section>

      {/* --- RECENT ACTIVITY CAROUSEL PANEL SECTION --- */}
      <section className="relative z-10 border border-slate-900/60 bg-brand-blue/10 backdrop-blur-md rounded-[28px] p-6 shadow-[2xl]">
        <h2 className="text-lg font-bold uppercase tracking-[0.18em] text-[#d4ff00] font-mono mb-5">
          Recent Activity
        </h2>

        <div className="relative w-full">
          {/* Scrollable Container with Hidden Scrollbars */}
          <div className="flex gap-5 overflow-x-auto pb-2 pr-36 snap-x scrollbar-none scroll-smooth">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                age={project.age}
                count={project.count}
              />
            ))}
          </div>

          {/* Clean Mask Alpha Gradient Overlay with Interactive Yellow Navigation Pointer */}
          <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l rounded-2xl from-[#030914] via-[#030914]/80 to-transparent pointer-events-none flex items-center justify-end pr-2 z-20">
            <button className="pointer-events-auto bg-[#020712] border border-yellow-500/30 p-3 rounded-full text-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-transparent transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.2)] group">
              <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={fetchServers}
      />
    </div>
  );
}