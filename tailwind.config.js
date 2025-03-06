/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "romantic-red": "#FF6B6B",
        "romantic-pink": "#FF9E9E",
        "soft-white": "#F9F9F9",
      },
    },
  },
  plugins: [],
};