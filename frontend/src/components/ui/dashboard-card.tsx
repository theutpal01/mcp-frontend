import React from "react";
import { cn } from "@/lib/utils";

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  gradientBorder?: string; // Custom color stops for outer line track
  glowClass?: string;      // Glow drop-shadow properties
  children: React.ReactNode;
}

export function DashboardCard({ 
  className, 
  glass = false, 
  gradientBorder,
  glowClass,
  children, 
  ...props 
}: DashboardCardProps) {
  
  // Base layout component core logic
  const cardContent = (
    <div
      className={cn(
        "rounded-[22px] p-6 relative overflow-hidden transition-all duration-300 group flex flex-col justify-between w-full h-full",
        
        // Solid deep core backing tint applied specifically to gradient cards
        gradientBorder ? "bg-[#050d1e]/95" : "",
        
        !gradientBorder && !glass && [
          "bg-gradient-to-b from-brand-darkBtn via-background to-transparent",
          "border border-glass-border shadow-md rounded-2xl p-5"
        ],
        
        !gradientBorder && glass && [
          "bg-glass-bg backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)]",
          "border border-glass-border hover:border-brand-blue/30 rounded-2xl p-5"
        ],
        
        className
      )}
      {...props}
    >
      {glass && !gradientBorder && (
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
      )}
      
      <div className="absolute top-0 inset-x-0 h-[40%] bg-gradient-to-b from-brand-blue/5 to-transparent opacity-100 pointer-events-none transition-opacity duration-500 group-hover:from-brand-blue/10" />
      
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );

  // If complex outer gradient track rules are active, layer the card frame wrapper
  if (gradientBorder) {
    return (
      <div className={cn(
        "p-[1.5px] rounded-3xl bg-gradient-to-br", 
        gradientBorder,
        glowClass || "shadow-[0_0_20px_rgba(0,0,0,0.7)]"
      )}>
        {cardContent}
      </div>
    );
  }

  return cardContent;
}