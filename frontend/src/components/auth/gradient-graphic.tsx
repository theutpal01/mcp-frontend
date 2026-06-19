import React from "react";

export function GradientGraphic() {
  // Correct progression mirroring the image: starts lower, peaks at bar 4, slopes down smoothly to the right
  const bars = [
    { height: "h-[45%]", delay: "0.1s", duration: "5.0s" },
    { height: "h-[52%]", delay: "0.4s", duration: "5.8s" },
    { height: "h-[60%]", delay: "0.7s", duration: "5.2s" },
    { height: "h-[68%]", delay: "0.2s", duration: "6.5s" }, // True Peak (Bar 4)
    { height: "h-[58%]", delay: "0.9s", duration: "5.4s" },
    { height: "h-[50%]", delay: "1.3s", duration: "6.0s" },
    { height: "h-[42%]", delay: "0.5s", duration: "4.8s" },
    { height: "h-[35%]", delay: "1.1s", duration: "6.2s" },
    { height: "h-[28%]", delay: "0.3s", duration: "5.1s" },
    { height: "h-[22%]", delay: "0.8s", duration: "5.6s" },
  ];

  return (
    <div className="absolute bottom-0 inset-x-0 h-[65%] px-8 pb-0 flex items-end justify-between overflow-hidden rounded-b-3xl pointer-events-none">
      {/* Background glow to smoothly blend the yellow base */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-brand-yellow/10 blur-md" />

      {/* Clean Flex container - no layout conflicts */}
      <div className="w-full h-full flex items-end">
        {bars.map((bar, index) => (
          <div
            key={index}
            style={{
              animationDelay: bar.delay,
              animationDuration: bar.duration,
            }}
            className={`
              flex-1 rounded-t-xl animate-wave-slow origin-bottom will-change-transform
              bg-gradient-to-t from-brand-yellow via-brand-blue to-transparent
              ${bar.height}
            `}
          />
        ))}
      </div>
    </div>
  );
}