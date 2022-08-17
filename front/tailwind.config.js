/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#03989E",
        gray: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
