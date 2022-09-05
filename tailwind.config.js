/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        amazon_blue: {
          light: "#232f3e",
          DEFAULT: "#131921"
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}