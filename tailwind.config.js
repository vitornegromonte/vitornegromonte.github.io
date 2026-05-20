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
        'bauhaus-red': '#E53935',
        'bauhaus-blue': '#1E88E5',
        'bauhaus-yellow': '#FDD835',
      },
      fontFamily: {
        'display': ['"Josefin Sans"', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
