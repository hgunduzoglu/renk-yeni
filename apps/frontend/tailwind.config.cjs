/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        'screen-minus-nav': 'calc(100vh - 4rem)' // 4rem = navbar (64 px)
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
