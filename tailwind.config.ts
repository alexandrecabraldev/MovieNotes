import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",

        "imageMovie": "url('/assets/cover.png')"
      },
      colors:{
        "inputColor": "#262529",
        "buttonBlack": "#1C1B1E",
        "buttonPink": "#FF859B",
        "textColor": "#F4EDE8",
        "textGray": "#948F99",
        "tagText": "#E5E5E5",
        "tagColor": "#312E38",
        "cardColor": "#272024",
        "textSummary": "#999591",
        "black": "#0D0C0F"
        ,
      }
    }
  },
  plugins: [],
};
export default config;
