import type { Config } from "tailwindcss";

// Tailwind scans these files for class names, so any utility you type
// in a .tsx file below will be included in the final CSS bundle.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Custom brand palette – used across hero, buttons and accents.
      colors: {
        cinema: {
          bg: "#0b0b12",       // near-black background
          panel: "#151521",    // slightly lighter card surface
          gold: "#e5b53a",     // marquee-yellow accent
          rose: "#ff5470",     // ticket-red accent
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
