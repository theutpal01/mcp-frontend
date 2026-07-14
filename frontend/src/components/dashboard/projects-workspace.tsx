// components/dashboard/projects-workspace.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, SlidersHorizontal, Globe, Lock, Check, Calendar, BarChart3 } from "lucide-react";

interface ProjectItem {
  id: string | number;
  name: string;
  createdAge: string;
  timestamp: number; // Added Unix epoch timestamps for true sorting
  mcpCount: number;
  latestAddedAge: string;
  isPublic: boolean;
}

interface GroupedProjects {
  date: string;
  projects: ProjectItem[];
}

export function ProjectsWorkspace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibilityFilter, setVisibilityFilter] = useState<"all" | "public" | "private">("all");
  const [sortBy, setSortBy] = useState<"date" | "mcp">("date");
  
  const filterRef = useRef<HTMLDivElement>(null);

  // Close the drop panel when user hits the out-of-bounds context
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Raw dataset array with true chronological metadata handles
  const rawProjects: ProjectItem[] = [
    { id: 1, name: "Network optimizer", createdAge: "1 day ago", timestamp: 1782384000, mcpCount: 5, latestAddedAge: "1 day ago", isPublic: true },
    { id: 2, name: "Database sharder", createdAge: "2 days ago", timestamp: 1782297600, mcpCount: 8, latestAddedAge: "12 hours ago", isPublic: true },
    { id: 3, name: "Telemetry relay", createdAge: "1 day ago", timestamp: 1782384000, mcpCount: 3, latestAddedAge: "1 day ago", isPublic: false },
    { id: 4, name: "Auth stream crypt", createdAge: "1 year ago", timestamp: 1750680000, mcpCount: 12, latestAddedAge: "3 days ago", isPublic: false },
    { id: 5, name: "Proxy balancer", createdAge: "1 year ago", timestamp: 1750680000, mcpCount: 4, latestAddedAge: "1 week ago", isPublic: true },
  ];

  // Processing pipeline: Filter -> Sort -> Group
  const processedProjects = rawProjects
    .filter((project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVisibility =
        visibilityFilter === "all" ||
        (visibilityFilter === "public" && project.isPublic) ||
        (visibilityFilter === "private" && !project.isPublic);
      return matchesSearch && matchesVisibility;
    })
    .sort((a, b) => {
      if (sortBy === "mcp") return b.mcpCount - a.mcpCount;
      return b.timestamp - a.timestamp; // Sorts by chronological index
    });

  // Re-grouping objects back into structural date categories matching your image frames
  const groupedProjects: GroupedProjects[] = processedProjects.reduce<GroupedProjects[]>((acc, project) => {
    const dateLabel = project.timestamp > 1760000000 ? "25th June, 2026" : "23rd June, 2025";
    const existingGroup = acc.find((g) => g.date === dateLabel);
    if (existingGroup) {
      existingGroup.projects.push(project);
    } else {
      acc.push({ date: dateLabel, projects: [project] });
    }
    return acc;
  }, []);

  return (
    <div className="w-full space-y-8 bg-transparent text-white p-4 sm:p-6 min-h-full overflow-y-auto relative select-none z-10">
      
      {/* --- SEARCH & CONTROL BAR ROW --- */}
      <div className="flex items-center justify-between gap-4 w-full max-w-7xl mx-auto relative">
        
        {/* Futuristic Search Capsule */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400/40" />
          <input
            type="text"
            placeholder="Search project name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-11 pr-4 rounded-full bg-[#040d1a]/90 border border-blue-900/40 text-sm font-sans placeholder-blue-400/30 text-white outline-none focus:border-brand-blue/60 focus:shadow-[0_0_15px_rgba(0,112,243,0.15)] transition-all duration-300"
          />
        </div>

        {/* Dynamic Filter Token Wrapper Node */}
        <div className="relative" ref={filterRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-5 h-10 rounded-full font-medium text-sm border transition-all duration-300 shadow-lg shrink-0 ${
              isFilterOpen || visibilityFilter !== "all" || sortBy !== "date"
                ? "bg-brand-blue/20 text-brand-yellow border-brand-blue/60 shadow-[0_0_15px_rgba(0,112,243,0.2)]"
                : "bg-[#040d1a]/90 text-blue-400/80 border-blue-900/40 hover:bg-blue-950/60 hover:text-white hover:border-blue-500/40"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {(visibilityFilter !== "all" || sortBy !== "date") && (
              <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse ml-0.5" />
            )}
          </button>

          {/* --- INTERACTIVE DROPDOWN INTERFACE MATRIX --- */}
          {isFilterOpen && (
            <div className="absolute right-0 mt-2.5 w-64 bg-[#040d1a]/95 backdrop-blur-2xl border border-blue-900/40 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)] z-50 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              
              {/* Context Block: Visibility Filters */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider uppercase text-blue-400/40 block pl-1">Visibility Matrix</label>
                <div className="flex flex-col gap-1">
                  {[
                    { id: "all", label: "All Telemetries", icon: <SlidersHorizontal className="w-3.5 h-3.5" /> },
                    { id: "public", label: "Public Only", icon: <Globe className="w-3.5 h-3.5" /> },
                    { id: "private", label: "Private Only", icon: <Lock className="w-3.5 h-3.5" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setVisibilityFilter(item.id as any)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        visibilityFilter === item.id 
                          ? "bg-brand-blue/15 text-white" 
                          : "text-blue-400/60 hover:text-white hover:bg-blue-950/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {visibilityFilter === item.id && <Check className="w-3.5 h-3.5 text-brand-yellow" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-blue-950/60 w-full" />

              {/* Context Block: Sort Controls */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono tracking-wider uppercase text-blue-400/40 block pl-1">Sort Hierarchy</label>
                <div className="flex flex-col gap-1">
                  {[
                    { id: "date", label: "Chronological Epoch", icon: <Calendar className="w-3.5 h-3.5" /> },
                    { id: "mcp", label: "MCP Volume Count", icon: <BarChart3 className="w-3.5 h-3.5" /> }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSortBy(item.id as any)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        sortBy === item.id 
                          ? "bg-brand-blue/15 text-white" 
                          : "text-blue-400/60 hover:text-white hover:bg-blue-950/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                      {sortBy === item.id && <Check className="w-3.5 h-3.5 text-brand-yellow" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* --- PROJECTS GRID SYSTEM --- */}
      <div className="w-full max-w-7xl mx-auto space-y-8">
        {groupedProjects.length > 0 ? (
          groupedProjects.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-4">
              
              {/* Chronological Epoch Header */}
              <h3 className="text-sm font-bold font-mono tracking-wide text-yellow-400/80 pl-1">
                {group.date}
              </h3>

              {/* Responsive Project Card Track Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {group.projects.map((project) => (
                  <div
                    key={project.id}
                    className="flex flex-col justify-between p-5 bg-[#051124]/70 backdrop-blur-md border border-slate-900/80 rounded-2xl min-h-[190px] shadow-xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)] group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Top Section: Meta & Access Pill */}
                    <div className="flex items-start justify-between gap-2 relative z-10">
                      <span className="text-xs font-medium text-blue-400/50 font-sans">
                        Project:
                      </span>
                      
                      {project.isPublic ? (
                        <div className="flex items-center gap-1 bg-[#d4ff00]/10 border border-[#d4ff00]/30 rounded-full pl-2 pr-1.5 py-0.5 text-[8px] font-bold tracking-wider text-[#d4ff00]">
                          <span>PUBLIC</span>
                          <span className="w-2 h-2 rounded-full bg-brand-blue shadow-[0_0_6px_#0070f3]" />
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-blue-950/60 border border-blue-500/30 rounded-full pl-1.5 pr-2 py-0.5 text-[8px] font-bold tracking-wider text-blue-400">
                          <span className="w-2 h-2 rounded-full bg-yellow-400 shadow-[0_0_6px_#eab308]" />
                          <span>PRIVATE</span>
                        </div>
                      )}
                    </div>

                    {/* Mid Section: Core Context Data */}
                    <div className="space-y-1 my-3 relative z-10">
                      <h4 className="text-lg font-bold text-white tracking-tight leading-tight group-hover:text-brand-blue transition-colors duration-200 line-clamp-2">
                        {project.name}
                      </h4>
                      <p className="text-[11px] font-medium text-blue-400/40 font-sans">
                        Created: {project.createdAge}
                      </p>
                    </div>

                    {/* Bottom Section: Analytical Micro-Telemetry */}
                    <div className="pt-2 border-t border-slate-900/60 space-y-0.5 relative z-10">
                      <p className="text-sm font-bold text-brand-yellow font-sans">
                        {project.mcpCount} MCPs added
                      </p>
                      <p className="text-[10px] font-sans text-blue-400/40">
                        latest added: {project.latestAddedAge}
                      </p>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ))
        ) : (
          /* Empty Search Fallback Space */
          <div className="text-center py-16 border border-dashed border-blue-900/30 rounded-2xl bg-[#040d1a]/20">
            <p className="text-sm text-blue-400/40 font-mono">No matching network architecture detected.</p>
          </div>
        )}
      </div>

    </div>
  );
}