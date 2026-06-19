import React from "react";

interface GradientGraphicProps {
  views?: "phone" | "desktop";
  position?: "top" | "bottom";
  isReversed?: boolean;
}

export function GradientGraphic({ views = "desktop", position = "bottom", isReversed = false }: GradientGraphicProps) {
  // Base progression (peaks at bar 4, trails off to the right)
  const baseBars = [
    { height: "h-[45%]", delay: "0.1s", duration: "5.0s" },
    { height: "h-[52%]", delay: "0.4s", duration: "5.8s" },
    { height: "h-[60%]", delay: "0.7s", duration: "5.2s" },
    { height: "h-[68%]", delay: "0.2s", duration: "6.5s" }, 
    { height: "h-[58%]", delay: "0.9s", duration: "5.4s" },
    { height: "h-[50%]", delay: "1.3s", duration: "6.0s" },
    { height: "h-[42%]", delay: "0.5s", duration: "4.8s" },
    { height: "h-[35%]", delay: "1.1s", duration: "6.2s" },
    { height: "h-[28%]", delay: "0.3s", duration: "5.1s" },
    { height: "h-[22%]", delay: "0.8s", duration: "5.6s" },
  ];

  // Mirror the array horizontally if isReversed is true
  const bars = isReversed ? (views === "desktop") ? [...baseBars].reverse() : [...baseBars].slice(1, 7).reverse() : baseBars;
  const isTop = position === "top";

  return (
    <div className={`absolute inset-x-0 overflow-hidden pointer-events-none ${
      isTop ? "top-0 h-[45%] pt-0 items-start rounded-t-3xl" : "bottom-0 h-[65%] pb-0 items-end rounded-b-3xl"
    }`}>
      {/* Glow blending plate */}
      <div className={`absolute inset-x-0 h-12 bg-brand-yellow/10 blur-md ${isTop ? "top-0" : "bottom-0"}`} />

      {/* Unified container controlling layout direction based on top/bottom position */}
      <div className={`w-full h-full flex ${isTop ? "items-start" : "items-end"}`}>
        {bars.map((bar, index) => (
          <div
            key={index}
            style={{
              animationDelay: bar.delay,
              animationDuration: bar.duration,
            }}
            className={`
              flex-1 animate-wave-slow will-change-transform
              ${isTop ? "origin-top bg-gradient-to-b" : "origin-bottom bg-gradient-to-t"}
              from-brand-yellow via-brand-blue to-transparent
              ${bar.height}
            `}
          />
        ))}
      </div>
    </div>
  );
}