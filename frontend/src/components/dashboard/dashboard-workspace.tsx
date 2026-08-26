// components/dashboard/dashboard-workspace.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Plus, Plug, Award, Sparkles, CloudLightning, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { MetricCard } from "./metric-card";
import { ProjectCard } from "./project-card";
import { UserOut } from "@/types/api";
import { CreateProjectDialog } from "./create-project-dialog";
import { ServerService } from "@/services/server.service";
import { ServerOut } from "@/types/api";
import { LoadingSpinner } from "../ui/loading-spinner";

interface DashboardWorkspaceProps {
  glassLayout: boolean;
  user: UserOut | null;
}

export function DashboardWorkspace({ glassLayout, user }: DashboardWorkspaceProps) {
  const [servers, setServers] = useState<ServerOut[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // All state writes happen in promise callbacks — never synchronously in the
  // effect body, which would trigger cascading renders.
  const fetchServers = useCallback(async () => {
    try {
      const serverList = await ServerService.listServers();
      setServers(serverList);
      setFetchError(false);
    } catch (error) {
      console.error("Failed to fetch servers:", error);
      setFetchError(true);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    ServerService.listServers()
      .then((serverList) => {
        if (cancelled) return;
        setServers(serverList);
        setFetchError(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch servers:", error);
        if (cancelled) return;
        setFetchError(true);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  // --- REAL METRICS DERIVED FROM API DATA ---
  const totalMcps = servers.length;
  const scoredServers = servers.filter((s) => typeof s.score_after === "number");
  const averageScore =
    scoredServers.length > 0
      ? Math.round(
          scoredServers.reduce((sum, s) => sum + (s.score_after ?? 0), 0) / scoredServers.length
        )
      : null;
  const toolsOptimized = servers.reduce((sum, s) => {
    const before = s.tool_count_before ?? 0;
    const after = s.tool_count_after ?? 0;
    return sum + Math.max(before - after, 0);
  }, 0);
  const activeDeployments = servers.filter((s) =>
    ["ready", "active", "deployed", "completed"].includes(s.status?.toLowerCase() ?? "")
  ).length;

  const formatValue = (value: number | null) =>
    value === null ? "—" : String(value);

  const metrics = [
    {
      title: "Total MCPs",
      value: formatValue(totalMcps),
      change: totalMcps > 0 ? `${totalMcps} configured` : "No MCPs yet",
      changeType: (totalMcps > 0 ? "positive" : "neutral") as "positive" | "neutral",
      icon: <Plug className="w-4 h-4" />,
      gradient: "from-blue-500 via-blue-600 to-yellow-400",
      glow: "shadow-[0_0_20px_rgba(0,112,243,0.15)]"
    },
    {
      title: "Average Score",
      value: formatValue(averageScore),
      change:
        averageScore !== null
          ? `across ${scoredServers.length} optimized`
          : "Run an optimization first",
      changeType: "neutral" as const,
      icon: <Award className="w-4 h-4" />,
      gradient: "from-yellow-400 via-yellow-300 to-blue-500",
      glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]"
    },
    {
      title: "Tools Optimized",
      value: formatValue(toolsOptimized),
      change:
        toolsOptimized > 0 ? `cleaned across ${scoredServers.length} specs` : "No cleanup yet",
      changeType: "neutral" as const,
      icon: <Sparkles className="w-4 h-4" />,
      gradient: "from-blue-500 via-cyan-500 to-yellow-400",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]"
    },
    {
      title: "Active Deployments",
      value: formatValue(activeDeployments),
      change:
        servers.length - activeDeployments > 0
          ? `${servers.length - activeDeployments} pending`
          : "All deployed",
      changeType: (activeDeployments < servers.length ? "negative" : "positive") as
        | "negative"
        | "positive",
      icon: <CloudLightning className="w-4 h-4" />,
      gradient: activeDeployments < servers.length
        ? "from-red-500 via-red-600 to-red-500"
        : "from-blue-500 via-cyan-500 to-blue-500",
      glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    },
  ];

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const scrollCarousel = (direction: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

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
          {metrics.map((card) => (
            <MetricCard
              key={card.title}
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

        {isLoading ? (
          <div className="flex items-center justify-center gap-3 py-12 text-blue-400/60">
            <LoadingSpinner size="sm" />
            <span className="text-sm font-mono">Loading your MCP servers...</span>
          </div>
        ) : fetchError ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 border border-dashed border-red-900/40 rounded-xl bg-red-950/10">
            <p className="text-sm text-red-400/80 font-mono">Could not load your projects.</p>
            <Button
              onClick={fetchServers}
              className="h-9 px-5 rounded-full bg-transparent border border-blue-900/40 text-blue-400/80 hover:text-white hover:border-blue-500/40 transition-all"
            >
              Retry
            </Button>
          </div>
        ) : servers.length === 0 ? (
          /* Honest empty state — no fake placeholder cards */
          <div className="flex flex-col items-center justify-center gap-4 py-12 border border-dashed border-blue-900/30 rounded-2xl bg-[#040d1a]/20">
            <Plug className="w-8 h-8 text-blue-400/30" />
            <div className="text-center space-y-1">
              <p className="text-sm text-white/70 font-medium">No MCP servers yet</p>
              <p className="text-xs text-blue-400/50 font-mono max-w-xs">
                Create your first project to start optimizing API schemas for agents.
              </p>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="h-9 px-5 rounded-full bg-brand-blue/90 border border-brand-blue/40 text-white hover:bg-brand-blue transition-all"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Create your first project
            </Button>
          </div>
        ) : (
          <div className="relative w-full">
            {/* Scrollable Container with Hidden Scrollbars */}
            <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-2 pr-36 snap-x scrollbar-none scroll-smooth">
              {[...servers]
                .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
                .map((server) => (
                  <ProjectCard
                    key={server.id}
                    name={server.name}
                    age={formatTimeAgo(server.created_at)}
                    count={`${server.tool_count_after ?? 0} tools`}
                  />
                ))}
            </div>

            {/* Functional Carousel Navigation Controls */}
            {servers.length > 3 && (
              <>
                <button
                  onClick={() => scrollCarousel(-1)}
                  aria-label="Scroll activity left"
                  className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-auto bg-[#020712]/90 border border-yellow-500/30 p-3 rounded-full text-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-transparent transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.2)] group z-20"
                >
                  <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
                </button>
                <div className="absolute right-0 top-0 bottom-0 w-36 bg-gradient-to-l rounded-2xl from-[#030914] via-[#030914]/80 to-transparent pointer-events-none flex items-center justify-end pr-2 z-10">
                  <button
                    onClick={() => scrollCarousel(1)}
                    aria-label="Scroll activity right"
                    className="pointer-events-auto bg-[#020712] border border-yellow-500/30 p-3 rounded-full text-yellow-400 hover:text-black hover:bg-yellow-400 hover:border-transparent transition-all duration-300 shadow-[0_0_20px_rgba(212,255,0,0.2)] group"
                  >
                    <ArrowRight className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform duration-200" strokeWidth={2.5} />
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <CreateProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={fetchServers}
      />
    </div>
  );
}
