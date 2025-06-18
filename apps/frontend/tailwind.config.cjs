/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}"
      ],
    theme: {
      extend: {
        colors: {
          brand: { DEFAULT: "#000", primary: "#b00020" }
        }
      }
    },
    plugins: [require("@tailwindcss/typography")]
  };
  