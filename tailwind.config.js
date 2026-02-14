/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "900px",
      lg: "1200px",
      xl: "1536px",
    },
    extend: {},
  },
  plugins: [],
};
