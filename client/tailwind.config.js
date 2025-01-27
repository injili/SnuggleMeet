/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        first: "#F2F4F1",
        second: "#0C36FB",
        third: "#000",
      },
      fontFamily: {
        montserrat: ["Montserrat", "serif"],
        alata: ["Alata", "sans-serif"],
      },
    },
  },
  plugins: [],
};
