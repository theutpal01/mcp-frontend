"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-[2px]",
    md: "w-6 h-6 border-[2.5px]",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={cn(
        "rounded-full border-brand-blue/20 border-t-brand-blue animate-spin",
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingOverlayProps {
  message?: string;
}

export function LoadingOverlay({ message = "Loading..." }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#030914]/80 backdrop-blur-sm rounded-[22px] z-50 gap-3">
      <LoadingSpinner size="lg" />
      <span className="text-sm font-mono text-blue-400/70 tracking-tight">{message}</span>
    </div>
  );
}