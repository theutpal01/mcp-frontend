// components/landing/score-simulator.tsx
"use client";

import React from "react";

const CENTER = { x: 322.5, y: 324.5 };

export function ScoreSimulator({ score = "41" }: { score?: string }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 select-none">
      {/* layout box stays the exact original size — scaling happens visually only,
          via transform, so it never pushes surrounding grid items */}
      <div className="w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center overflow-visible">
        <svg
          className="w-64 h-64 sm:w-72 sm:h-72 scale-125"
          width="646"
          height="657"
          viewBox="0 0 646 657"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_di_388_939)">
            <path
              d="M334.219 592.738C189.382 599.057 66.7287 484.082 60.2657 335.934C53.8027 187.787 165.977 62.5671 310.814 56.2485C455.651 49.9299 578.304 164.905 584.767 313.052C591.23 461.2 479.056 586.42 334.219 592.738Z"
              fill="url(#paint0_radial_388_939)"
              fillOpacity="0.7"
              shapeRendering="crispEdges"
            />
          </g>

          {/* score text, kept on top of the sphere */}
          <text
            x={CENTER.x}
            y={CENTER.y + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="800"
            fontSize="160"
            fill="#FBEB4D"
            opacity="0.35"
            style={{ filter: "blur(10px)" }}
          >
            {score}
          </text>
          <text
            x={CENTER.x}
            y={CENTER.y + 12}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="800"
            fontSize="160"
            fill="#FBEB4D"
            opacity="0.6"
          >
            {score}
          </text>

          <defs>
            <filter
              id="filter0_di_388_939"
              x="0"
              y="0"
              width="645.033"
              height="656.987"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="30" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0.333333 0 0 0 0 0.643137 0 0 0 0.7 0"
              />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_388_939" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_388_939" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dx="20" dy="25" />
              <feGaussianBlur stdDeviation="17.5" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_388_939" />
            </filter>
            <radialGradient
              id="paint0_radial_388_939"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(353.712 452.024) rotate(-141.553) scale(334.947 342.603)"
            >
              <stop offset="0.221154" stopColor="#A8D1F8" />
              <stop offset="0.686263" stopColor="#0166C3" />
              <stop offset="1" stopColor="#024A9B" stopOpacity="0.7" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <p className="text-[#00bfff] text-sm sm:text-base font-medium font-sans tracking-wide text-center">
        Before Optimization
      </p>
    </div>
  );
}