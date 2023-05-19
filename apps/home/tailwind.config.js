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
                slideUpAndFade: {
                    from: { opacity: 0, transform: 'translateY(2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideRightAndFade: {
                    from: { opacity: 0, transform: 'translateX(-2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
                slideDownAndFade: {
                    from: { opacity: 0, transform: 'translateY(-2px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
                slideLeftAndFade: {
                    from: { opacity: 0, transform: 'translateX(2px)' },
                    to: { opacity: 1, transform: 'translateX(0)' },
                },
            },
            animation: {
                slideDown: 'slideDown 300ms linear',
                slideUp: 'slideUp 300ms linear',
                slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
                slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
        },
    },
    plugins: [require('tailwindcss-dir')()],
}