import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Tinted neutrals (toward teal hue ~195). Never pure black/white.
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        veil: "var(--veil)",
        line: "var(--line)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        subtle: "var(--subtle)",
        // Brand
        teal: "var(--teal)",
        aqua: "var(--aqua)",
        "deep-teal": "var(--deep-teal)",
        "deep-teal-2": "var(--deep-teal-2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Editorial scale, ratio ~1.28
        "display-2xl": ["clamp(3.4rem, 9vw, 8.5rem)", { lineHeight: "0.94", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.8rem, 6.5vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.2rem, 4.6vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 3.2vw, 2.75rem)", { lineHeight: "1.08", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        prose: "68ch",
        shell: "82rem",
      },
      spacing: {
        section: "clamp(6rem, 12vw, 13rem)",
      },
      borderRadius: {
        media: "1.25rem",
        pill: "999px",
      },
      transitionTimingFunction: {
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "400": "400ms",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee-x 42s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
