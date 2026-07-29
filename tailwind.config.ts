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
        rose: { DEFAULT: "#D23F5A", light: "#E8687D" },
        mint: "#7DBE9F",
        sky: "#6DA8FD",
        cream: "#FFF4E3",
        ink: "#2A2A2A",
        slate: "#9ABF98",
        "card-bg": "#FEFCF7",
        "card-border": "#E5DFD3",
        gold: "#D7A623",
        purple: "#8A5CF6",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
