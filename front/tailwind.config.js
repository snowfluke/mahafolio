/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito"],
      },
      colors: {
        green: "#007D84",
        gray: "#F5F5F5",
        emas: "#FFD700",
        perak: "#C0C0C0",
        perunggu: "#CD7F32",
      },
    },
  },
  plugins: [],
};
