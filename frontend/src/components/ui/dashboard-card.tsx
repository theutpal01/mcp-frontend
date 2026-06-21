import React from "react";
import { cn } from "@/lib/utils";

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  children: React.ReactNode;
}

export function DashboardCard({ className, glass = false, children, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 relative overflow-hidden transition-all duration-300 group flex flex-col justify-between",
        
        !glass && [
          "bg-gradient-to-b from-brand-darkBtn via-background to-transparent",
          "border border-glass-border shadow-md"
        ],
        
        glass && [
          "bg-glass-bg backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]",
          "border border-glass-border hover:border-brand-blue/30"
        ],
        
        className
      )}
      {...props}
    >
      {glass && (
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}
      
      <div className="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-brand-blue/5 to-transparent opacity-100 pointer-events-none transition-opacity duration-500 group-hover:from-brand-blue/10" />
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}