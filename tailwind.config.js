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
        'off-white': '#faf9f7',
        //'off-white': '#faf8f5',
        'charcoal': '#2c2c2c',
        'medium-gray': '#6b6b6b',
        'light-gray': '#e5e5e5',
      },
      fontFamily: {
        'display': ['"Bricolage Grotesque"', 'sans-serif'],
        //'display': ['"Cormorant Garamond"', 'serif'],
        'body': ['"Rethink Sans"', 'sans-serif'],
        //'body': ['"Crimson Pro"', 'serif'],
      },
    },
  },
  plugins: [],
}
