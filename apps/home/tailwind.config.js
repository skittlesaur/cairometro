/** @type {import('tailwindcss').Config} */
/* eslint-disable */
module.exports = {
  content: [
    'pages/**/*.{js,ts,jsx,tsx}', 'components/**/*.{js,ts,jsx,tsx}', 'layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EA3347',
        ring: '#EA3347',
      },
      screens: {
        xl: '1200px',
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('tailwindcss-dir')(),
  ],
}