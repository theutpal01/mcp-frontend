// components/landing/problem-section.tsx
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Confusing Tools
  const [isDesktop, setIsDesktop] = useState(false);

  // Figma: cards render fully side-by-side from md breakpoint up (no slide transform).
  // Below md, only one card fits comfortably, so we keep a 1-up sliding carousel there.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const problems = [
    {
      id: 0,
      title: "Messy API",
      desc: "Undocumented endpoints, nested data. Raw and unstructured",
      icon: (
        <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#D9D94D]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 20 45 C 10 20, 50 10, 40 40 C 30 70, 70 80, 80 50 C 90 20, 50 30, 30 50 C 10 70, 60 90, 80 40 L 88 45" />
          <rect x="15" y="40" width="8" height="12" rx="2" fill="currentColor" />
          <rect x="83" y="40" width="8" height="12" rx="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      id: 1,
      title: "Confusing Tools",
      desc: "Vague descriptions, unclear functionality. Agent gets stuck.",
      icon: (
        <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 100 100" fill="#D9D94D">
          <path d="M 15 45 L 85 45 C 87 45, 88 47, 88 50 L 85 85 C 85 88, 83 90, 80 90 L 20 90 C 17 90, 15 88, 15 85 L 12 50 C 12 47, 13 45, 15 45 Z" fill="#D9D94D" />
          <rect x="25" y="15" width="8" height="35" rx="2" transform="rotate(-20 25 15)" fill="#D9D94D" />
          <rect x="18" y="12" width="22" height="10" rx="3" transform="rotate(-20 25 15)" fill="#D9D94D" />
          <rect x="47" y="15" width="6" height="35" rx="2" fill="#D9D94D" />
          <rect x="45" y="32" width="10" height="14" rx="2" fill="#D9D94D" />
          <rect x="65" y="15" width="8" height="35" rx="2" transform="rotate(25 65 15)" fill="#D9D94D" />
          <circle cx="68" cy="18" r="10" fill="#D9D94D" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Agent Failure",
      desc: "Model cannot resolve calls, errors persist. Goal aborted.",
      icon: (
        <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="30" y="15" width="55" height="50" rx="4" fill="#041630" stroke="#0070f3" strokeWidth="2" />
          <line x1="30" y1="25" x2="85" y2="25" stroke="#0070f3" strokeWidth="2" />
          <rect x="15" y="30" width="60" height="55" rx="4" fill="#041630" stroke="#D9D94D" strokeWidth="2.5" />
          <line x1="15" y1="42" x2="75" y2="42" stroke="#D9D94D" strokeWidth="2.5" />
          <rect x="25" y="50" width="40" height="22" rx="3" fill="none" stroke="#D9D94D" strokeWidth="2" />
          <text x="45" y="65" textAnchor="middle" fill="#D9D94D" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
            ERROR
          </text>
        </svg>
      ),
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? problems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === problems.length - 1 ? 0 : prev + 1));
  };

  // Only slide on mobile (single card in view). Desktop shows all 3 cards statically,
  // matching the Figma "final" reference — highlighting is done via border/opacity, not position.
  const trackWidth = isDesktop ? "100%" : `${problems.length * 100}%`;
  const trackTransform = isDesktop
    ? "translateX(0%)"
    : `translateX(-${activeIndex * (100 / problems.length)}%)`;

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full overflow-hidden">
      {/* Section Title */}
      <h2
        className="text-center mb-10 uppercase"
        style={{
          fontFamily: "'Conthrax', 'Helvetica Neue', Arial, sans-serif",
          fontWeight: 600,
          letterSpacing: "0.05em",
          color: "#D9D94D",
          fontSize: "clamp(1.75rem, 1rem + 3.2vw, 3.75rem)", // ~28px mobile -> 60px desktop (Figma spec)
          lineHeight: 1,
        }}
      >
        The Problem
      </h2>

      {/* Problem Cards Carousel with Arrow Navigation */}
      <div className="relative flex items-center justify-between gap-2 sm:gap-6 w-full max-w-6xl mx-auto">

        {/* Left Carousel Arrow */}
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-transparent text-[#D9D94D] hover:scale-110 active:scale-95 transition cursor-pointer shrink-0 z-20"
          title="Previous"
          aria-label="Previous problem"
        >
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {/* Carousel Viewport Container */}
        <div className="overflow-hidden flex-1 w-full py-4">
          {/* Sliding Track (mobile only — static 3-up on desktop) */}
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              width: trackWidth,
              transform: trackTransform,
            }}
          >
            {problems.map((card, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  style={{ width: `${100 / problems.length}%` }}
                  className="px-2 sm:px-3 shrink-0 box-border transition-all duration-300 cursor-pointer"
                >
                  {/* Gradient/solid border wrapper (Figma: 2px border, gradient #D9D94D -> #666666, 40px radius) */}
                                  <div
                    className="relative rounded-[40px] h-full transition-all duration-300"
                    style={{ backgroundColor: "rgba(0, 85, 164, 0.2)" }} // Figma: #0055A4 @ 20%
                  >
                    <div
                      className="pointer-events-none absolute inset-0 rounded-[40px]"
                      style={{
                        padding: "2px",
                        background: isSelected
                          ? "#D9D94D"
                          : "linear-gradient(135deg, #D9D94D 0%, #666666 100%)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                    />
                    <div
                      className={`relative flex flex-col items-center justify-between text-center rounded-[40px] h-full p-6 sm:p-8 transition-all duration-300 ${
                        isSelected ? "opacity-100 scale-[1.02]" : "opacity-60 hover:opacity-85 scale-95"
                      }`}
                    >
                      <h3
                        className="mb-4"
                        style={{
                          fontFamily: "'Helvetica Neue', Arial, sans-serif",
                          fontWeight: 700,
                          color: "rgba(217, 217, 77, 0.7)", // Figma: #D9D94D @ 70%
                          fontSize: "clamp(1.05rem, 0.6rem + 1.8vw, 2rem)", // scaled from 64px ref
                          lineHeight: 1.1,
                        }}
                      >
                        {card.title}
                      </h3>

                      <div
                        className={`my-4 flex items-center justify-center h-24 sm:h-28 transition-transform duration-300 ${
                          isSelected ? "scale-110" : "scale-95 opacity-80"
                        }`}
                      >
                        {card.icon}
                      </div>

                      <p
                        className="mt-4 leading-relaxed"
                        style={{
                          fontFamily: "'Helvetica Neue', Arial, sans-serif",
                          fontWeight: 500,
                          color: "#0276E2",
                          fontSize: "clamp(0.78rem, 0.55rem + 0.9vw, 1.1rem)", // scaled from 50px ref
                        }}
                      >
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Carousel Arrow */}
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-transparent text-[#D9D94D] hover:scale-110 active:scale-95 transition cursor-pointer shrink-0 z-20"
          title="Next"
          aria-label="Next problem"
        >
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

      </div>
    </section>
  );
}