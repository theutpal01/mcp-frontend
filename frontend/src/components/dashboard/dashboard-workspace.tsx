"use client";

import React from "react";
import { Plus, Plug, Award, Sparkles, CloudLightning, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { MetricCard } from "./metric-card";
import { ProjectCard } from "./project-card";
import { UserOut } from "@/types/api";

interface DashboardWorkspaceProps {
  glassLayout: boolean;
  user: UserOut | null;
}

export function DashboardWorkspace({ glassLayout, user }: DashboardWorkspaceProps) {
  const metrics = [
    { title: "Total MCPs", value: "24", change: "+3 this week", changeType: "positive" as const, icon: <Plug className="w-4 h-4 text-brand-yellow" /> },
    { title: "Average Score", value: "76", change: "from 61 last month", changeType: "neutral" as const, icon: <Award className="w-4 h-4 text-brand-yellow" /> },
    { title: "Optimizations Completed", value: "138", change: "12 today", changeType: "neutral" as const, icon: <Sparkles className="w-4 h-4 text-brand-yellow" /> },
    { title: "Deployments", value: "19", change: "2 pending", changeType: "negative" as const, icon: <CloudLightning className="w-4 h-4 text-brand-yellow" /> },
  ];

  const projects = [
    { id: 1, name: "Network optimizer", age: "1 day ago", count: "5 MCPs added" },
    { id: 2, name: "Security parser", age: "3 days ago", count: "12 MCPs added" },
    { id: 3, name: "Database proxy", age: "1 week ago", count: "3 MCPs added" },
    { id: 4, name: "Log cleaning node", age: "2 weeks ago", count: "8 MCPs added" },
  ];

  return (
    <div className="space-y-6 lg:space-y-8 w-full">
      {/* Local Tab Controls Header Context Bar */}
      <div className="flex justify-between md:justify-end items-center gap-4 relative z-10">
        <div className="md:hidden flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-white">PlugFit</h1>
          <p className="text-xs text-ui-primary font-mono truncate max-w-[150px]">{user?.email}</p>
        </div>
        
        <Button 
          className="w-fit flex items-center gap-2 px-5 h-10 rounded-full bg-glass-bg text-brand-yellow font-medium text-sm border border-glass-border hover:bg-glass-bg/30 hover:border-brand-blue/30 transition shadow-lg shrink-0"
          glass={glassLayout}
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Create Project</span>
          <span className="sm:hidden">Create</span>
        </Button>
      </div>

      {/* --- METRICS GRID CONTAINMENT SECTION --- */}
      <section className="space-y-3.5 relative z-10">
        <h2 className="text-xs font-medium tracking-wider text-brand-yellow uppercase font-mono">
          System Analytics
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((card, idx) => (
            <MetricCard
              key={idx}
              title={card.title}
              value={card.value}
              change={card.change}
              changeType={card.changeType}
              icon={card.icon}
              glass={glassLayout}
            />
          ))}
        </div>
      </section>

      {/* --- RECENT ACTIVITY SECTION LAYOUT TRACK --- */}
      <section className="space-y-3.5 relative z-10">
        <h2 className="text-xs font-medium tracking-wider text-brand-yellow uppercase font-mono">
          Recent Projects Workspace
        </h2>

        <div className="relative group/track">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:pr-12">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                name={project.name}
                age={project.age}
                count={project.count}
                glass={glassLayout}
              />
            ))}
          </div>

          {/* Slider Navigation Next Control Button Overlay */}
          <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-10 items-center justify-center bg-gradient-to-l from-background to-transparent opacity-0 group-hover/track:opacity-100 transition-opacity duration-300 z-20">
            <button className="p-2 bg-brand-darkBtn border border-glass-border rounded-full hover:border-brand-yellow/40 transition text-brand-yellow group shadow-lg">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}