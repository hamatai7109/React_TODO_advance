/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { max: "560px" },
      md: { max: "768px" },
      tb: { max: "960px" },
    },
  },
  plugins: [],
};
