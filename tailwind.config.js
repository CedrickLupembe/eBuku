/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Circular: ["Circular"],
        sans: ["Circular", "sans-serif"],
      },
      minHeight: {
        80: "80px",
        150: "150px",
      },
      maxHeight: {
        350: "350px",
      },
      gridAutoRows: {
        "1fr": "minmax(0, 1fr)",
      },
    },
  },
  plugins: [],
};
