// components/dashboard/project-detail-workspace.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, SlidersHorizontal, X, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ServerService } from "@/services/server.service";

interface McpItem {
  id: string;
  name: string;
  addedOn: string;
  addedTimestamp: number;
  isEvaluated: boolean;
  evalDate: string | null;
}

interface ProjectDetailWorkspaceProps {
  projectId?: string;
  onBack?: () => void;
  onSelectMcp?: (mcpId: string, mcpName: string) => void;
}

// Shared pill-button style matching the Add MCP SVG spec exactly:
// solid #D9D94D fill, #0276E2 bold text, fully rounded, no border/glow.
const PILL_BUTTON_CLASS =
  "bg-[#D9D94D] text-[#0276E2] font-bold rounded-full hover:bg-yellow-300 active:scale-95 transition-all duration-200 cursor-pointer";

export function ProjectDetailWorkspace({
  projectId = "1",
  onBack,
  onSelectMcp,
}: ProjectDetailWorkspaceProps) {
  const router = useRouter();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [mcpList, setMcpList] = useState<McpItem[]>([
    {
      id: "1",
      name: "data-processor-mcp",
      addedOn: "5th July, 2025",
      addedTimestamp: 1751673600,
      isEvaluated: false,
      evalDate: null,
    },
    {
      id: "2",
      name: "data-processor-mcp",
      addedOn: "5th July, 2025",
      addedTimestamp: 1751673600,
      isEvaluated: true,
      evalDate: "25th June,2026",
    },
    {
      id: "3",
      name: "data-processor-mcp",
      addedOn: "5th July, 2025",
      addedTimestamp: 1751673600,
      isEvaluated: true,
      evalDate: "25th June,2026",
    },
  ]);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.push("/dashboard");
    }
  };

  const handleAddMcp = () => {
    ServerService.addMcpToProject(projectId, {});
    toast.info("Add MCP Flow", "[TODO] Add MCP flow pending implementation", "bottom-right");
  };

  const handleRunEvaluation = (mcp: McpItem) => {
    ServerService.runMcpEvaluation(projectId, mcp.id);
    if (onSelectMcp) {
      onSelectMcp(mcp.id, mcp.name);
    } else {
      router.push(`/dashboard/projects/${projectId}/mcp/${mcp.id}`);
    }
  };

  const handleSeeResult = (mcp: McpItem) => {
    if (onSelectMcp) {
      onSelectMcp(mcp.id, mcp.name);
    } else {
      router.push(`/dashboard/projects/${projectId}/mcp/${mcp.id}`);
    }
  };

  const confirmDeleteMcp = () => {
    if (!deleteTargetId) return;
    const target = mcpList.find((item) => item.id === deleteTargetId);
    ServerService.deleteMcpFromProject(projectId, deleteTargetId);
    setMcpList((prev) => prev.filter((item) => item.id !== deleteTargetId));
    toast.success("MCP Removed", `"${target?.name || "MCP"}" was removed from the project.`, "bottom-right");
    setDeleteTargetId(null);
  };

  const filteredAndSortedMcps = mcpList
    .filter((mcp) => {
      const matchesSearch = mcp.name.toLowerCase().includes(searchQuery.toLowerCase().trim());
      if (!matchesSearch) return false;

      if (selectedFilter === "All Evaluated") return mcp.isEvaluated;
      if (selectedFilter === "All Not Evaluated") return !mcp.isEvaluated;
      return true;
    })
    .sort((a, b) => {
      if (selectedFilter === "A to Z") return a.name.localeCompare(b.name);
      if (selectedFilter === "Z to A") return b.name.localeCompare(a.name);
      if (selectedFilter === "Oldest") return a.addedTimestamp - b.addedTimestamp;
      return 0;
    });

  const filterOptions = [
    "All Evaluated",
    "All Not Evaluated",
    "A to Z",
    "Z to A",
    "Oldest",
  ];

  return (
    <div
      className="font-body w-full flex-1 flex flex-col justify-between space-y-8 bg-transparent text-white p-4 sm:p-6 sm:px-8 min-h-full overflow-y-auto relative select-none z-10"
      style={{ fontFamily: "var(--font-body)" }}
    >
      <div className="w-full max-w-7xl mx-auto space-y-6 flex-1">
        
        {/* --- TOP HEADER ROW --- */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 w-full">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Back Button with Yellow Arrow */}
            <button
              onClick={handleBack}
              className="p-2.5 rounded-xl bg-[#051833] border border-blue-900/50 text-[#FBEB4D] hover:bg-[#08244c] hover:border-blue-500/50 transition-all duration-200 mt-1 shrink-0 cursor-pointer shadow-md"
              title="Back to Projects"
            >
              <ArrowLeft className="w-5 h-5 text-[#FBEB4D]" />
            </button>

            {/* Title & Description */}
            <div className="space-y-2">
              <h1
                className="font-hero text-2xl sm:text-3xl font-bold tracking-wide text-[#FBEB4D]"
                style={{ fontFamily: "var(--font-hero)" }}
              >
                Network Optimizer
              </h1>
              <p className="text-gray-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                This project aggregates multiple communication-focused MCPs to ensure that autonomous AI agents can perfectly discover endpoints, accurately select data-routing tools, and navigate complex payloads with zero latency or execution failures.
              </p>
            </div>
          </div>

          {/* Top Right: STATIC PUBLIC PILL BADGE & Stacked Dates */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-blue-950/40">
            <div className="flex items-center gap-2 bg-[#FBEB4D] text-[#051833] font-bold text-xs tracking-wider px-3.5 py-1 rounded-full shadow-[0_0_12px_rgba(251,235,77,0.35)] select-none pointer-events-none">
              <span>PUBLIC</span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#0070f3] shadow-[0_0_6px_#0070f3]" />
            </div>

            <div className="text-right space-y-1 text-xs sm:text-sm">
              <div className="flex items-center justify-end gap-2">
                <span className="text-[#0070f3] font-medium">Created:</span>
                <span className="text-[#00bfff] font-medium">20th July, 2026</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <span className="text-[#0070f3] font-medium">Last MCPs added:</span>
                <span className="text-[#00bfff] font-medium">20th July, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- ADD MCP BUTTON (matches SVG: solid yellow pill, blue bold text) --- */}
        <div>
          <button
            onClick={handleAddMcp}
            className={`px-7 py-2.5 text-xs sm:text-sm ${PILL_BUTTON_CLASS}`}
          >
            Add MCP
          </button>
        </div>

        {/* --- SEARCH & FILTERS ROW --- */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 w-full relative pt-2">
          {/* Search Input Capsule */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
            <input
              type="text"
              placeholder="Search MCPs name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-4 rounded-full bg-[#041630]/90 border border-blue-900/50 text-xs sm:text-sm placeholder-blue-400/50 text-white outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,112,243,0.15)] transition-all duration-300"
            />
          </div>

          {/* Filter Dropdown Toggle Button — same pill style as Add MCP */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-6 h-11 text-xs sm:text-sm shrink-0 ${PILL_BUTTON_CLASS}`}
            >
              <SlidersHorizontal className="w-4 h-4 text-[#0276E2]" />
              <span>Filters</span>
            </button>

            {/* Filters Dropdown Menu */}
            {isFilterOpen && (
              <div className="absolute right-0 mt-2.5 w-60 bg-[#030d1c]/95 backdrop-blur-2xl border border-blue-900/60 rounded-2xl p-2.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex flex-col gap-1">
                  {filterOptions.map((option) => {
                    const isSelected = selectedFilter === option;
                    return (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedFilter(option);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-full text-xs transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? "border border-blue-400/50 bg-blue-950/50 text-white font-bold shadow-inner"
                            : "text-white/90 font-medium hover:text-[#FBEB4D]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                  {selectedFilter !== "All" && (
                    <button
                      onClick={() => {
                        setSelectedFilter("All");
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 rounded-full text-xs transition-all duration-150 cursor-pointer text-blue-300/80 font-medium hover:text-[#FBEB4D] border-t border-blue-900/40 mt-1 pt-2"
                    >
                      Clear filter
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* --- MCP LIST ROWS --- */}
        <div className="space-y-3 pt-2">
          {filteredAndSortedMcps.length > 0 ? (
            filteredAndSortedMcps.map((mcp) => (
              <div
                key={mcp.id}
                className="w-full bg-[#051833]/80 backdrop-blur-md border border-blue-900/60 rounded-2xl md:rounded-full p-4 md:px-6 md:py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 shadow-lg hover:border-blue-500/50 transition-all duration-200"
              >
                {/* Top Row / Name */}
                <div className="flex items-center justify-between w-full md:w-auto">
                  <span className="text-[#FBEB4D] font-bold text-sm truncate min-w-[180px]">
                    {mcp.name}
                  </span>
                  
                  {/* Mobile-only Delete Icon */}
                  <button
                    onClick={() => setDeleteTargetId(mcp.id)}
                    className="md:hidden text-cyan-400 hover:text-red-400 transition p-1 cursor-pointer"
                    title="Remove MCP"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Added On Date */}
                <span className="text-[#0070f3] text-xs truncate">
                  added on: <span className="text-[#00bfff]">{mcp.addedOn}</span>
                </span>

                {/* Evaluation Status */}
                <div className="text-xs truncate">
                  <span className="text-[#0070f3]">Evaluation status: </span>
                  {mcp.isEvaluated ? (
                    <span className="text-[#FBEB4D] font-medium">
                      Done on {mcp.evalDate}
                    </span>
                  ) : (
                    <span className="text-red-500 font-bold">Not done</span>
                  )}
                </div>

                {/* Desktop Action Button & Delete Icon — same pill style as Add MCP */}
                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-blue-900/30">
                  {mcp.isEvaluated ? (
                    <button
                      onClick={() => handleSeeResult(mcp)}
                      className={`px-6 py-2 text-xs w-full md:w-auto text-center ${PILL_BUTTON_CLASS}`}
                    >
                      See Result
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRunEvaluation(mcp)}
                      className={`px-6 py-2 text-xs w-full md:w-auto text-center ${PILL_BUTTON_CLASS}`}
                    >
                      Run Evaluation
                    </button>
                  )}

                  {/* Desktop-only Delete Icon */}
                  <button
                    onClick={() => setDeleteTargetId(mcp.id)}
                    className="hidden md:block text-cyan-400 hover:text-red-400 transition p-1 cursor-pointer"
                    title="Remove MCP"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 border border-dashed border-blue-900/30 rounded-2xl bg-[#040d1a]/20">
              <p className="text-sm text-blue-400/40 font-mono">No MCPs found matching your filter criteria.</p>
            </div>
          )}
        </div>

      </div>

      {/* --- CONFIRMATION DIALOG MODAL FOR REMOVAL --- */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-[#030914] border border-blue-900/50 rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-base font-bold text-white">Remove MCP</h3>
            </div>
            <p className="text-xs text-blue-400/70">
              Are you sure you want to remove this MCP from the project? This action can be undone by adding it again later.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-blue-400 hover:text-white hover:bg-blue-950/40 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteMcp}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-600/80 hover:bg-red-600 text-white transition shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}