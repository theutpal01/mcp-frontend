import React from "react";
import { DashboardCard } from "../ui/dashboard-card";

interface ProjectCardProps {
  name: string;
  age: string;
  count: string;
  glass?: boolean;
}

export function ProjectCard({ name, age, count, glass }: ProjectCardProps) {
  return (
    <DashboardCard 
      glass={glass} 
      className="py-4hover:border-brand-blue/30 duration-300 transition-colors cursor-pointer"
    >
      {/* Primary Scope */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-brand-blue uppercase tracking-wider block">
          Project:
        </span>
        <h3 className="text-base font-medium text-white tracking-wide truncate font-sans">
          {name}
        </h3>
        <p className="text-[11px] text-ui-neutral font-sans">
          Created: {age}
        </p>
      </div>
      
      {/* Telemetry Metrics Split */}
      <div className="pt-2 border-t border-glass-border/40 w-full">
        <span className="text-xs text-brand-yellow font-medium font-mono block">
          {count}
        </span>
        <p className="text-[10px] text-ui-muted mt-0.5 font-sans">
          Latest update: {age}
        </p>
      </div>
    </DashboardCard>
  );
}