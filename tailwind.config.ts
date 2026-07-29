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
        rose: { DEFAULT: "#F43F5E", light: "#FF6B8A" },
        cream: "#FEFCF8",
        mint: "#06D6A0",
        sky: "#87CEEB",
        ink: "#1A1A1A",
        "text-secondary": "#6B6B6B",
        "text-muted": "#A0A0A0",
        gold: "#D7A623",
        "surface-dark": "#2C2C2C",
      },
      borderRadius: {
        card: "12px",
      },
      height: {
        btn: "52px",
      },
      minHeight: {
        tap: "44px",
      },
      minWidth: {
        tap: "44px",
      },
      spacing: {
        screen: "20px",
      },
      keyframes: {
        "cloud-drift": {
          "0%, 100%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-8px)" },
          "75%": { transform: "translateX(8px)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.15)", opacity: "0.7" },
        },
      },
      animation: {
        "cloud-drift": "cloud-drift 6s ease-in-out infinite",
        "cloud-drift-slow": "cloud-drift 8s ease-in-out infinite reverse",
        shake: "shake 0.4s ease-in-out",
        pulse: "pulse 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
