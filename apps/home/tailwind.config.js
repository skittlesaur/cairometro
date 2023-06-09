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
                moveDotVertical: {
                    '0%': { top: '100%', opacity: 1 },
                    '100%': { top: '0%', opacity: 0 },
                },
                moveDotHorizontal: {
                    '0%': { left: '100%', opacity: 1 },
                    '100%': { right: '0%', opacity: 1 },
                },
            },
            animation: {
                moveDotVertical1: 'moveDotVertical 5s infinite',
                moveDotVertical2: 'moveDotVertical 20s infinite',
                moveDotVertical3: 'moveDotVertical 15s infinite',
                moveDotVertical4: 'moveDotVertical 30s infinite',
                moveDotVertical5: 'moveDotVertical 12s infinite',
                moveDotVertical6: 'moveDotVertical 6s infinite',
                moveDotVertical7: 'moveDotVertical 8s infinite',
                moveDotHorizontal1: 'moveDotHorizontal 5s infinite',
                moveDotHorizontal2: 'moveDotHorizontal 20s infinite',
                moveDotHorizontal3: 'moveDotHorizontal 15s infinite',
                moveDotHorizontal4: 'moveDotHorizontal 30s infinite',
                moveDotHorizontal5: 'moveDotHorizontal 12s infinite',
                moveDotHorizontal6: 'moveDotHorizontal 6s infinite',
                moveDotHorizontal7: 'moveDotHorizontal 8s infinite',
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