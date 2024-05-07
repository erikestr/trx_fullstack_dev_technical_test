/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'base': '#D0DF00',
        'shade-100': '#B1C200',
        'shade-200': '#93A400',
        'shade-300': '#748600',
        'shade-400': '#566700',
        'shade-500': '#374900',
        'tint-100': '#E0EB33',
        'tint-200': '#F1F466',
        'tint-300': '#FBF8A0',
        'tint-400': '#FCFABF',
        'tint-500': '#FCFCD4',

        'base-gray': '#53565A',
        'gray-shade-100': '#46494C',
        'gray-shade-200': '#383B3E',
        'gray-shade-300': '#2A2D30',
        'gray-shade-400': '#1B1E20',
        'gray-shade-500': '#0D0F11',
        'gray-tint-100': '#63676A',
        'gray-tint-200': '#72767A',
        'gray-tint-300': '#818588',
        'gray-tint-400': '#909597',
        'gray-tint-500': '#9FA2A6',
      }
    },
  },
  plugins: [],
}

