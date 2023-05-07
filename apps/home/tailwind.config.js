/** @type {import('tailwindcss').Config} */
/* eslint-disable */
module.exports = {
  content: [
    'pages/**/*.{js,ts,jsx,tsx}',
    'components/**/*.{js,ts,jsx,tsx}',
    'layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#EA3347',
        ring: '#EA3347',
        'link-text': 'rgba(234, 51, 71, 1)',
      },
      screens: {
        xl: '1200px',
      },
      fontFamily: {
        sans: ['Inter', '"IBM Plex Sans Arabic"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        slideDown: {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        slideDown: 'slideDown 300ms linear',
        slideUp: 'slideUp 300ms linear',
      },
    },
  },
  plugins: [require('tailwindcss-dir')()],
}
