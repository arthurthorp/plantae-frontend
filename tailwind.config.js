/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        default: '0.25rem',
      },
      boxShadow: {
        'dark-hover': 'inset 0 9999px 0 0 rgba(0, 0, 0, 0.1)',
        'light-hover': 'inset 0 9999px 0 0 rgba(255, 255, 255, 0.1)',
      },
    },
    colors: {
      transparent: 'transparent',
      brown: '#2B2420',
      orange: '#FF6E2F',
      blue: '#3C91E6',
      green: '#15C768',
      red: '#FF4848',

      white: '#FFFFFF',
      'gray-01': '#F0F0F0',
      'gray-02': '#E0E0E0',
      'gray-03': '#A0A0A0',
      'gray-04': '#808080',
      'gray-05': '#606060',
      black: '#000000',

      'black-translucid': 'rgba(0, 0, 0, 0.50)',
      'orange-translucid': 'rgba(255, 110, 47, 0.15)',
      'blue-translucid': 'rgba(60, 145, 230, 0.15)',
      'green-translucid': 'rgba(21, 199, 104, 0.15)',
      'red-translucid': 'rgba(255, 72, 72, 0.15)',
    },
  },
  plugins: [],
}
