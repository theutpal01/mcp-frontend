// components/dashboard/mcp-detail-workspace.tsx
"use client";

import React from "react";
import { ArrowLeft, Check, ChevronDown, FileText, Cpu, PlayCircle, BarChart2 } from "lucide-react";

interface McpDetailWorkspaceProps {
  mcpId?: string;
  mcpName?: string;
  onBack?: () => void;
}

export function McpDetailWorkspace({
  mcpId = "1",
  mcpName = "data-processor-mcp",
  onBack,
}: McpDetailWorkspaceProps) {
  return (
    <div className="w-full flex-1 flex flex-col justify-start bg-transparent text-white p-3 sm:p-5 sm:px-8 min-h-full xl:max-h-[100vh] xl:overflow-hidden overflow-y-auto relative select-none z-10">
      <div className="w-full max-w-7xl mx-auto space-y-3 xl:space-y-2.5 flex-1 flex flex-col justify-between">
        
        {/* --- HEADER ROW: BACK BUTTON & MCP TITLE --- */}
        <div className="relative flex items-center justify-center w-full py-1 shrink-0">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute left-0 p-2 rounded-full bg-[#040d1a] border border-blue-900/40 text-blue-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-950/60 transition-all duration-200 cursor-pointer"
            title="Back to Project"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Centered Yellow Title */}
          <h1 className="text-xl sm:text-2xl font-bold tracking-wide text-[#FBEB4D] font-sans text-center">
            {mcpName}
          </h1>
        </div>

        {/* --- 1. SCORE SECTION --- */}
        <div className="space-y-1.5 shrink-0">
          <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-[#FBEB4D] pl-1">
            SCORE SECTION
          </h2>

          <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-3 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Before Score Card (Red Glow) */}
              <div className="border-2 border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-[#05142b] rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-white text-xs font-sans font-semibold">Before:</span>
                <span className="text-red-500 font-extrabold text-3xl sm:text-4xl font-sans tracking-tight">
                  41
                </span>
              </div>

              {/* After Score Card */}
              <div className="border border-blue-500/40 bg-[#05142b] rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-white text-xs font-sans font-semibold">After:</span>
                <span className="text-[#FBEB4D] font-extrabold text-3xl sm:text-4xl font-sans tracking-tight">
                  88
                </span>
              </div>

              {/* Improvement Card */}
              <div className="border border-blue-500/40 bg-[#05142b] rounded-xl p-3 flex flex-col items-center justify-center text-center space-y-1">
                <span className="text-white text-xs font-sans font-semibold">Improvement:</span>
                <span className="text-[#FBEB4D] font-extrabold text-3xl sm:text-4xl font-sans tracking-tight">
                  +114%
                </span>
              </div>

              {/* Score Gauge Card */}
              <div className="border border-blue-500/40 bg-[#05142b] rounded-xl p-2.5 flex flex-col items-center justify-center text-center space-y-0.5">
                <span className="text-white text-xs font-sans font-semibold">Score Gauge:</span>
                <div className="relative flex items-center justify-center w-14 h-14">
                  <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-blue-950"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[#FBEB4D]"
                      strokeDasharray="66, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute text-xs font-bold text-white font-sans">
                    66%
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- 2. METRICS GRID --- */}
        <div className="space-y-1.5 shrink-0">
          <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-[#FBEB4D] pl-1">
            METRICS GRID
          </h2>

          <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-3 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              
              {/* Column 1 */}
              <div className="bg-[#05142b] border border-blue-900/40 rounded-xl p-2.5 space-y-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Tool Discoverability:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#FBEB4D] rounded-full w-[70%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Failure Rate:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#0070f3] rounded-full w-[45%]" />
                  </div>
                </div>
              </div>

              {/* Column 2 */}
              <div className="bg-[#05142b] border border-blue-900/40 rounded-xl p-2.5 space-y-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Tool Selection Accuracy:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#0070f3] rounded-full w-[85%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Duplicate Reduction:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#FBEB4D] rounded-full w-[60%]" />
                  </div>
                </div>
              </div>

              {/* Column 3 */}
              <div className="bg-[#05142b] border border-blue-900/40 rounded-xl p-2.5 space-y-2">
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Completion Rate:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#FBEB4D] rounded-full w-[90%]" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-white font-sans block">
                    Description Quality:
                  </span>
                  <div className="w-full h-2.5 rounded-full bg-blue-950 overflow-hidden border border-blue-900/40">
                    <div className="h-full bg-[#FBEB4D] rounded-full w-[80%]" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* --- 3. AGENT REPLAY STEPPER --- */}
        <div className="space-y-1.5 shrink-0">
          <h2 className="text-xs font-bold font-sans tracking-widest uppercase text-[#FBEB4D] pl-1">
            AGENT REPLAY
          </h2>

          <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-3.5 shadow-lg">
            <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto px-4">
              
              {/* Stepper Connecting Line */}
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#FBEB4D]/60 z-0" />

              {/* Stage 1: Task */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-[11px] font-semibold text-blue-300 font-sans flex items-center gap-1">
                  <FileText className="w-3 h-3 text-blue-400" />
                  Task
                </span>
                <div className="w-5 h-5 rounded-full bg-[#FBEB4D] flex items-center justify-center text-[#040d1a] shadow-[0_0_8px_rgba(251,235,77,0.5)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Stage 2: Agent Decision */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-[11px] font-semibold text-blue-300 font-sans flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-400" />
                  Agent Decision
                </span>
                <div className="w-5 h-5 rounded-full bg-[#FBEB4D] flex items-center justify-center text-[#040d1a] shadow-[0_0_8px_rgba(251,235,77,0.5)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Stage 3: Tool Call */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-[11px] font-semibold text-blue-300 font-sans flex items-center gap-1">
                  <PlayCircle className="w-3 h-3 text-blue-400" />
                  Tool Call
                </span>
                <div className="w-5 h-5 rounded-full bg-[#FBEB4D] flex items-center justify-center text-[#040d1a] shadow-[0_0_8px_rgba(251,235,77,0.5)]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Stage 4: Result */}
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-[11px] font-semibold text-blue-300 font-sans flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-blue-400" />
                  Result
                </span>
                <div className="w-4 h-4 rounded-full bg-[#FBEB4D] shadow-[0_0_8px_rgba(251,235,77,0.5)]" />
              </div>

            </div>
          </div>
        </div>

        {/* --- 4. ORIGINAL VS OPTIMIZED MANIFEST (2 COLUMNS) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 shrink-0">
          
          {/* Left Column: Original Manifest */}
          <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-4 bottom-4 w-1.5 bg-[#FBEB4D] rounded-l-full" />
            
            <div className="space-y-2 pr-3">
              <h3 className="text-base font-bold text-[#FBEB4D] font-sans">
                Original manifest
              </h3>

              <div className="space-y-1.5 font-mono text-[11px] text-blue-300">
                <p className="text-white font-semibold font-sans text-xs">Tool List</p>

                {/* Tool 1 */}
                <div className="space-y-0.5 pl-2">
                  <div className="flex items-center gap-1 text-blue-400">
                    <ChevronDown className="w-3 h-3" />
                    <span>tool_1: <span className="text-blue-300">process_data</span></span>
                  </div>
                  <p className="pl-5 text-blue-400/80 text-[10px]">description: Process input to</p>
                  <div className="pl-5 space-y-0.5">
                    <div className="flex items-center gap-1 text-blue-400">
                      <ChevronDown className="w-3 h-3" />
                      <span>Endpoints</span>
                    </div>
                    <p className="pl-5 text-blue-400/80 text-[10px]">/api/v1/process</p>
                  </div>
                </div>

                {/* Tool 2 */}
                <div className="space-y-0.5 pl-2">
                  <div className="flex items-center gap-1 text-blue-400">
                    <ChevronDown className="w-3 h-3" />
                    <span>tool_2: <span className="text-blue-300">mata_oatb</span></span>
                  </div>
                  <p className="pl-5 text-blue-400/80 text-[10px]">description: Process input and</p>
                  <div className="pl-5 space-y-0.5">
                    <div className="flex items-center gap-1 text-blue-400">
                      <ChevronDown className="w-3 h-3" />
                      <span>Endpoints</span>
                    </div>
                    <p className="pl-5 text-blue-400/80 text-[10px]">/api/v1/process/io9xn</p>
                  </div>
                </div>

                {/* Tool 3 */}
                <div className="pl-2">
                  <div className="flex items-center gap-1 text-blue-400">
                    <ChevronDown className="w-3 h-3" />
                    <span>tool_3: <span className="text-blue-300">process_data</span></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Optimized Manifest */}
          <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-4 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute right-0 top-4 bottom-4 w-1.5 bg-[#FBEB4D] rounded-l-full" />
            
            <div className="space-y-3 pr-3">
              <h3 className="text-base font-bold text-[#FBEB4D] font-sans">
                Optimized manifest
              </h3>

              {/* Cleaned Tool Box */}
              <div className="space-y-1">
                <p className="text-white font-semibold font-sans text-xs">Cleaned tool</p>
                <div className="bg-[#041630]/90 border border-blue-800/40 rounded-xl p-2.5 space-y-1 font-mono text-[11px] text-blue-400">
                  <p>tool_1: process_data, tooli_ts</p>
                  <p>tool_2: process_data, tooli_ts</p>
                </div>
              </div>

              {/* Improved Description Box */}
              <div className="space-y-1">
                <p className="text-white font-semibold font-sans text-xs">Improved description</p>
                <div className="bg-[#041630]/90 border border-blue-800/40 rounded-xl p-2.5 font-mono text-[11px] text-blue-400 leading-relaxed">
                  Tool_1: Process input or elamentarios, enbord enemics and enolingunstard ensures and integrated.
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* --- 5. DIFF VIEWER SECTION --- */}
        <div className="bg-[#040e21]/80 backdrop-blur-md border border-blue-900/40 rounded-2xl p-4 shadow-lg relative overflow-hidden shrink-0">
          <div className="absolute right-0 top-4 bottom-4 w-1.5 bg-[#FBEB4D] rounded-l-full" />
          
          <div className="space-y-2 pr-3">
            <h3 className="text-base font-bold text-[#FBEB4D] font-sans">
              Diff Viewer
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 border border-blue-900/40 rounded-xl p-3 bg-[#020b18]/80 font-mono text-[11px]">
              
              {/* Left Column: Tool List & Code Snippets */}
              <div className="lg:col-span-7 space-y-2">
                <p className="text-white font-semibold font-sans text-xs">Tool list</p>
                <p className="text-blue-300 font-bold">tool_1: process_data</p>

                {/* Diff Highlight Box */}
                <div className="bg-[#0d2a45]/80 border-l-4 border-cyan-400 p-2 rounded-r-lg space-y-0.5 text-cyan-300">
                  <p className="font-bold">tool_1: process_data</p>
                  <p className="text-cyan-200 text-[10px]">description: Process input to distening and data information</p>
                </div>

                <div className="space-y-0.5 text-blue-400">
                  <p className="text-[10px]">endpoints: <span className="text-blue-300">/api/v1/process</span></p>
                  <p className="text-blue-300 font-bold">tool_3: process_data</p>
                </div>
              </div>

              {/* Right Column: Line Numbers & Table Rows */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-blue-900/40 pt-2 lg:pt-0 lg:pl-3 space-y-1">
                {[
                  { line: 1, text: "Added tool", highlight: true },
                  { line: 2, text: "tool_1: process_data", highlight: false },
                  { line: 3, text: "tool_1: process_data", highlight: false },
                  { line: 4, text: "description: Process input to distening and data information", highlight: false },
                  { line: 5, text: "", highlight: false },
                  { line: 6, text: "Merged Entries", highlight: true },
                  { line: 7, text: "", highlight: false },
                ].map((row) => (
                  <div key={row.line} className="flex items-start gap-2 py-0.5">
                    <span className="w-4 text-right text-blue-400/50 select-none shrink-0 text-[10px]">{row.line}</span>
                    <span className={`truncate ${row.highlight ? "text-cyan-300 font-bold" : "text-blue-300/80"}`}>
                      {row.text}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
