/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',  "./src/**/*.{html,js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#00d4ff', // Custom Midnight Blue Color
      },
    },
  },
  plugins: [],
}

