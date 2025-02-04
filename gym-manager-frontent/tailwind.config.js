/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        granate: '#670d10',
        deep_blau: '#092756',

        blau_clar: '#6eb6de',

        primary: '#6eb6de',
        secondary: '6eb6de'
      },
    },
  },
  plugins: [],
}