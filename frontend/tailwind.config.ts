import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#04060A", // True deep dark background from image
        brand: {
          yellow: "#FBEB4D", 
          blue: "#007BFF", 
          darkBtn: "#0B182E", 
        },
        glass: {
          bg: "rgba(6, 18, 36, 0.4)", // Dark blue transparent tint
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      keyframes: {
        waveUp: {
          "0%, 100%": { transform: "scaleY(1)", brightness: "100%" },
          "50%": { transform: "scaleY(1.15)", brightness: "125%" },
        }
      },
      animation: {
        'wave-slow': "waveUp 6s ease-in-out infinite",
      }
    },
  },
  plugins: [],
};
export default config;