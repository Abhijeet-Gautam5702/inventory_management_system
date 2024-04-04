/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#004aad",
        secondary: "#84b8ff",
        tertiary: "#d9f1ff",
        light: "#ecf8ff",
        white: "#ffffff",
        black: "#000000",
        pGreen: "#008431",
        sGreen: "#1cc259",
        lGreen: "#adfaca",
        yellow: "#fdac4d",
        red: "#ff3030",
      },
      fontFamily: {
        head: ["Alice", "sans-serif"],
        primary: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
