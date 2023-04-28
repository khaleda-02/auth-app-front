/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': "#FFFFFF",
        'gray-white': "#C5C5C5",
        'gray': "#808080",
        'gray-black': "#525252",
        'black': "#000000",

      }
    },
  },
  plugins: [require("daisyui")],
}