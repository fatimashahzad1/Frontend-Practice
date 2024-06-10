import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx,scss}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryBlue: "#1565d8",
        primaryGrey: "#8692a6",
        hoverBlue: "#F5F9FF",
      },
      boxShadow: {
        custom: "0 2px 14px 1px rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
