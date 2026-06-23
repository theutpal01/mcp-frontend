"use client";

import { toast as nativeToast } from "sonner";
import React from "react";

export type ToastType = "info" | "success" | "error" | "protocol";
export type ToastPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

interface CustomToastProps {
  id: string | number;
  type: ToastType;
  title: string;
  message?: string;
}

// --- HIGH-FIDELITY DESIGN SPEC COMPONENT INTERNALS ---
const ToastCard = ({ id, type, title, message }: CustomToastProps) => {
  const themeMap = {
    info: {
      border: "border-[#007BFF]/30",
      accent: "bg-[#007BFF]",
      glow: "shadow-[0_0_25px_rgba(0,123,255,0.12)]",
      icon: (
        <svg className="h-4 w-4 text-[#007BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    success: {
      border: "border-[#FBEB4D]/30",
      accent: "bg-[#FBEB4D]",
      glow: "shadow-[0_0_25px_rgba(251,235,77,0.12)]",
      icon: (
        <svg className="h-4 w-4 text-[#FBEB4D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    error: {
      border: "border-[#F87171]/30",
      accent: "bg-[#F87171]",
      glow: "shadow-[0_0_25px_rgba(248,113,113,0.12)]",
      icon: (
        <svg className="h-4 w-4 text-[#F87171]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    protocol: {
      border: "border-[#007BFF]/40",
      accent: "bg-gradient-to-r from-[#007BFF] to-[#FBEB4D]",
      glow: "shadow-[0_0_30px_rgba(0,123,255,0.16)]",
      icon: (
        <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 002-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    }
  };

  const currentTheme = themeMap[type];

  return (
    <div
      className={`
        pointer-events-auto relative overflow-hidden flex items-start gap-3.5 p-4 rounded-xl text-left
        w-[calc(100vw-32px)] sm:w-[380px] border bg-[#0B182E]/95 backdrop-blur-xl
        ${currentTheme.border} ${currentTheme.glow}
      `}
      style={{
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.03), 0 4px 20px rgba(0,0,0,0.55)`
      }}
    >
      {/* High-Contrast Left Accent Strip */}
      <div className={`absolute top-0 left-0 bottom-0 w-[3.5px] ${currentTheme.accent}`} />

      {/* Vector Shield Container */}
      <div className="flex-shrink-0 mt-[1px] p-2 rounded-lg bg-black/40 border border-white/[0.04] shadow-inner">
        {currentTheme.icon}
      </div>

      {/* Core Typographic Payload */}
      <div className="flex-1 space-y-1.5 pr-3 min-w-0">
        <h4 className="text-sm font-bold tracking-tight text-[#D1D5DB] font-sans leading-none select-none">
          {title}
        </h4>
        {message && (
          <p className="text-[11px] font-medium text-[#9CA3AF] font-mono leading-relaxed tracking-tight break-words select-text selection:bg-[#007BFF]/30">
            {message}
          </p>
        )}
      </div>

      {/* Minimal Manual Dismiss Node */}
      <button
        onClick={() => nativeToast.dismiss(id)}
        aria-label="Dismiss Notification"
        className="flex-shrink-0 text-[#6B7280] hover:text-[#D1D5DB] p-1 rounded-md hover:bg-white/[0.04] transition-colors duration-150 mt-[1px]"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

// --- BATTLE-TESTED EXPORTED HOOK INTERFACE ---
export function useToast() {
  const triggerCustomToast = (
    type: ToastType,
    title: string,
    message?: string,
    position: ToastPosition = "bottom-right",
    duration: number = 4000
  ) => {
    nativeToast.custom(
      (id) => React.createElement(ToastCard, { id, type, title, message }),
      { position, duration }
    );
  };

  return {
    info: (title: string, message?: string, position?: ToastPosition, duration?: number) =>
      triggerCustomToast("info", title, message, position, duration),
    success: (title: string, message?: string, position?: ToastPosition, duration?: number) =>
      triggerCustomToast("success", title, message, position, duration),
    error: (title: string, message?: string, position?: ToastPosition, duration?: number) =>
      triggerCustomToast("error", title, message, position, duration),
    protocol: (title: string, message?: string, position?: ToastPosition, duration?: number) =>
      triggerCustomToast("protocol", title, message, position, duration),
    dismissAll: () => nativeToast.dismiss(),
  };
}