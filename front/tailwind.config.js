/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#03989E",
        gray: "#F5F5F5",
        emas: "#FFD700",
        perak: "#C0C0C0",
        perunggu: "#CD7F32",
      },
    },
  },
  plugins: [],
};
