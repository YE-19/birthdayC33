/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mauve: {
          DEFAULT: '#ea85a0',
          dark: '#9c2d52',
        },
        cream: {
          DEFAULT: '#fff5f7',
        },
        blush: '#fcdbe4',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        script: ['"Alex Brush"', 'cursive'],
        hand: ['"Caveat"', 'cursive'],
        letter: ['"EB Garamond"', 'serif'],
      },
      boxShadow: {
        polaroid: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}