import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // High-end Neo-Grotesque pairing Helvetica with crisp developer mono
        sans: ["Helvetica", "Arial", "sans-serif"],
        mono: ["JetBrains Mono", "SF Mono", "Menlo", "Courier New", "monospace"],
        hero: ["var(--font-hero)", "sans-serif"],
      },
      colors: {
        background: "#030508", // Absolute midnight black
        brand: {
          yellow: "#FBEB4D", 
          blue: "#007BFF", 
          darkBtn: "#0B182E", 
        },
        glass: {
          bg: "rgba(0, 85, 164, 0.3)",
          border: "rgba(255, 255, 255, 0.06)",
        },
        // Missing semantic status layout keys added here
        status: {
          negative: "#F87171", // Standardized alert/negative state
          neutral: "#6B7280",  // Standardized neutral fallback state
        },
        // Unified UI palette tokens mapping cleanly across typography & indicators
        ui: {
          light: "#D1D5DB",     // Replaces legacy text-gray-300
          primary: "#9CA3AF",   // Replaces legacy text-gray-400
          neutral: "#6B7280",   // Replaces legacy text-gray-500
          muted: "#4B5563",     // Replaces legacy text-gray-600
        }
      },
      
      keyframes: {
        waveUp: {
          "0%, 100%": { transform: "scaleY(1)", filter: "brightness(100%) drop-shadow(0 0 10px rgba(0,123,255,0.2))" },
          "50%": { transform: "scaleY(1.18)", filter: "brightness(140%) drop-shadow(0 0 25px rgba(251,235,77,0.4))" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "0.4" }
        },
        gridDrift: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" }
        }
      },
      animation: {
        'wave-fluid': "waveUp 5s cubic-bezier(0.25, 1, 0.5, 1) infinite",
        'pulse-slow': "pulseGlow 8s ease-in-out infinite",
        'grid-scroll': "gridDrift 20s linear infinite",
      }
    },
  },
  plugins: [],
};
export default config;