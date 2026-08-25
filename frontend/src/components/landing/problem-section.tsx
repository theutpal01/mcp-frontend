// components/landing/problem-section.tsx
"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function ProblemSection() {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Confusing Tools

  const problems = [
    {
      id: 0,
      title: "Messy API",
      desc: "Undocumented endpoints, nested data. Raw and unstructured",
      icon: (
        <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#FBEB4D]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#FBEB4D]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M 15 45 L 85 45 C 87 45, 88 47, 88 50 L 85 85 C 85 88, 83 90, 80 90 L 20 90 C 17 90, 15 88, 15 85 L 12 50 C 12 47, 13 45, 15 45 Z" fill="#FBEB4D" />
          <rect x="25" y="15" width="8" height="35" rx="2" transform="rotate(-20 25 15)" fill="#FBEB4D" />
          <rect x="18" y="12" width="22" height="10" rx="3" transform="rotate(-20 25 15)" fill="#FBEB4D" />
          <rect x="47" y="15" width="6" height="35" rx="2" fill="#FBEB4D" />
          <rect x="45" y="32" width="10" height="14" rx="2" fill="#FBEB4D" />
          <rect x="65" y="15" width="8" height="35" rx="2" transform="rotate(25 65 15)" fill="#FBEB4D" />
          <circle cx="68" cy="18" r="10" fill="#FBEB4D" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Agent Failure",
      desc: "Model cannot resolve calls, errors persist. Goal aborted.",
      icon: (
        <svg className="w-20 h-20 sm:w-24 sm:h-24 text-[#FBEB4D]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="30" y="15" width="55" height="50" rx="4" fill="#041630" stroke="#0070f3" strokeWidth="2" />
          <line x1="30" y1="25" x2="85" y2="25" stroke="#0070f3" strokeWidth="2" />
          <rect x="15" y="30" width="60" height="55" rx="4" fill="#041630" stroke="#FBEB4D" strokeWidth="2.5" />
          <line x1="15" y1="42" x2="75" y2="42" stroke="#FBEB4D" strokeWidth="2.5" />
          <rect x="25" y="50" width="40" height="22" rx="3" fill="none" stroke="#FBEB4D" strokeWidth="2" />
          <text x="45" y="65" textAnchor="middle" fill="#FBEB4D" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
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

  // Define translation factor based on active card for smooth slide transition
  const getTranslateX = () => {
    // Centers the active index card smoothly
    return -(activeIndex - 1) * 33.333;
  };

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none w-full overflow-hidden">
      {/* Section Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-[#FBEB4D] tracking-widest uppercase font-sans text-center mb-10">
        The Problem
      </h2>

      {/* Problem Cards Carousel with Arrow Navigation */}
      <div className="relative flex items-center justify-between gap-2 sm:gap-6 w-full max-w-6xl mx-auto">
        
        {/* Left Carousel Arrow */}
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-transparent text-[#FBEB4D] hover:scale-110 active:scale-95 transition cursor-pointer shrink-0 z-20"
          title="Previous"
        >
          <ArrowLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBEB4D]" />
        </button>

        {/* Carousel Viewport Container */}
        <div className="overflow-hidden flex-1 w-full py-4">
          {/* Sliding Track with transform translateX transition */}
          <div
            className="flex w-[300%] md:w-full transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(${getTranslateX()}%)`,
            }}
          >
            {problems.map((card, idx) => {
              const isSelected = activeIndex === idx;
              return (
                <div
                  key={card.id}
                  onClick={() => setActiveIndex(idx)}
                  className="w-1/3 px-3 shrink-0 box-border transition-all duration-300"
                >
                  <div
                    className={`flex flex-col items-center justify-between text-center p-6 sm:p-8 rounded-3xl h-full transition-all duration-300 ${
                      isSelected
                        ? "bg-[#04142d] border-2 border-[#FBEB4D] shadow-[0_0_30px_rgba(251,235,77,0.25)] scale-105 opacity-100"
                        : "bg-[#041630]/35 border border-blue-900/30 opacity-60 hover:opacity-85 scale-95"
                    }`}
                  >
                    <h3 className="text-lg font-bold text-[#FBEB4D] font-sans mb-4">
                      {card.title}
                    </h3>

                    <div className={`my-4 flex items-center justify-center h-28 transition-transform duration-300 ${isSelected ? "scale-110" : "scale-95 opacity-80"}`}>
                      {card.icon}
                    </div>

                    <p className="text-gray-200 text-xs sm:text-sm font-sans leading-relaxed mt-4">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Carousel Arrow */}
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-transparent text-[#FBEB4D] hover:scale-110 active:scale-95 transition cursor-pointer shrink-0 z-20"
          title="Next"
        >
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#FBEB4D]" />
        </button>

      </div>
    </section>
  );
}
