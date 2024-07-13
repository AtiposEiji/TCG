/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        'regal-blue': '#243c5a',
        'white': '#ffffff',
        'primary-100': '#382bf0',
        'primary-200': '#5e43f3',
        'primary-300': '#7a5af5',
        'primary-400': '#9171f8',
        'primary-500': '#a688fa',
        'primary-600': '#ba9ffb',
        'surface-100': '#121212',
        'surface-200': '#282828',
        'surface-300': '#3f3f3f',
        'surface-400': '#575757',
        'surface-500': '#717171',
        'surface-600': '#8b8b8b',
        'surface-mixed-100': '#1a1625',
        'surface-mixed-200': '#2f2b3a',
        'surface-mixed-300': '#46424f',
        'surface-mixed-400': '#5e5a66',
        'surface-mixed-500': '#76737e',
        'surface-mixed-600': '#908d96'
      },
    },
  },
  plugins: [],
}

