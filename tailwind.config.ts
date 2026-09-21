import type { Config } from "tailwindcss";

const withVar = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "media",
  theme: {
    container: { center: true },
    extend: {
      colors: {
        // Tokens adaptativos (cambian con prefers-color-scheme)
        canvas: withVar("--canvas"),
        "canvas-alt": withVar("--canvas-alt"),
        ink: withVar("--ink"),
        "ink-muted": withVar("--ink-muted"),
        line: withVar("--line"),
        link: withVar("--link"),
        // Tokens fijos
        night: { DEFAULT: "#000000", soft: "#0A0A0A", fg: "#F5F5F7", muted: "#A1A1A6" },
        stone: { DEFAULT: "#B8A99A" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Inter", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
        body: ["1.0625rem", { lineHeight: "1.5" }],
        lead: ["clamp(1.1875rem, 1.6vw, 1.3125rem)", { lineHeight: "1.5" }],
        hero: ["clamp(3rem, 8vw, 7rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        section: ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.06", letterSpacing: "-0.025em" }],
        statement: ["clamp(1.75rem, 4.2vw, 3.5rem)", { lineHeight: "1.18", letterSpacing: "-0.02em" }],
      },
      maxWidth: { content: "1200px" },
      spacing: { nav: "56px" },
      borderRadius: { card: "28px" },
      boxShadow: {
        soft: "0 12px 40px -12px rgb(0 0 0 / 0.12)",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
