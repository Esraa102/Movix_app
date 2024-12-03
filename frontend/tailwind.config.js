/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pink: "#da2f68",
        orange: "#f89e00",
      },
    },
  },
  plugins: [],
};
