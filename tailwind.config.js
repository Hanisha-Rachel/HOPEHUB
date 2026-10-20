/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hope-teal': {
          DEFAULT: '#0F766E',
          50: '#F0FDFA',
          100: '#E6F4F1',
          200: '#99F6E4',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          dark: '#0A534E'
        },
        'hope-orange': {
          DEFAULT: '#FF8A3D',
          hover: '#F27A2B',
          light: '#FFF0E6',
          dark: '#E06A1C'
        },
        'hope-coral': {
          DEFAULT: '#FF6B6B',
          light: '#FFEAE8',
          dark: '#E85050'
        },
        'hope-cream': '#FFF8F1',
        'hope-charcoal': {
          DEFAULT: '#263238',
          light: '#37474F',
          muted: '#546E7A'
        },
        'hope-light-teal': '#E6F4F1'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'Outfit', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 118, 110, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -4px rgba(38, 50, 56, 0.08), 0 4px 10px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 40px -8px rgba(15, 118, 110, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.06)'
      }
    },
  },
  plugins: [],
}
