/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: "#3D6390",
        background: "#F3F5F7",
        secondary: "#4a5565",
        dark: "#242424",
        gray: "#C3C3C3",
        white: "#FFF",
        red: "#D45353"
      },
    },
  },
  plugins: [],
};
