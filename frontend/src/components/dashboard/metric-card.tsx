import React from "react";
import { DashboardCard } from "../ui/dashboard-card";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  glass?: boolean;
}

export function MetricCard({ title, value, change, changeType, icon, glass }: MetricCardProps) {
  return (
    <DashboardCard glass={glass} className="min-h-[150px]">
      <div className="flex items-center justify-between w-full">
        <span className="text-xs text-ui-primary font-medium tracking-wide font-sans">{title}</span>
        <div className="p-1.5 bg-brand-darkBtn/60 rounded-lg border border-glass-border flex items-center justify-center text-brand-blue">
          {icon}
        </div>
      </div>

      <div className="mt-4 w-full">
        <div className="text-4xl font-bold font-mono tracking-tight text-white">
          {value}
        </div>
        <span className={`text-[11px] font-mono mt-1 block ${
          changeType === "positive" ? "text-brand-blue" :
          changeType === "negative" ? "text-status-negative" : "text-status-neutral"
        }`}>
          {change}
        </span>
      </div>
    </DashboardCard>
  );
}