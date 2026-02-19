/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#fdfbf7',
        //'off-white': '#faf8f5',
        'charcoal': '#2c2c2c',
        'medium-gray': '#6b6b6b',
        'light-gray': '#e5e5e5',
      },
      fontFamily: {
        'display': ['"Bricolage Grotesque"', 'sans-serif'],
        'body': ['"Rethink Sans"', 'sans-serif'],
      },
      boxShadow: {
        'pixel': '4px 4px 0px 0px #2c2c2c',
        'pixel-sm': '2px 2px 0px 0px #2c2c2c',
        'pixel-hover': '6px 6px 0px 0px #2c2c2c',
      },
    },
  },
  plugins: [],
}
