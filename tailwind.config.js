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
        'white': '#FFFFFF',
        'off-white': '#FAFAFA',
        'charcoal': '#1E1E1E',
        'gray': '#9E9E9E',
        'light-gray': '#E0E0E0',

      },
      fontFamily: {
        'display': ['"Josefin Sans"', 'sans-serif'],
        'body': ['"Rethink Sans"', 'sans-serif'],
      },
      boxShadow: {
        'pixel-sm': '2px 2px 0px 0px #1E1E1E',
      },
    },
  },
  plugins: [],
}
