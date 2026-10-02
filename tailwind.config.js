/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        pastel: {
          lavender: '#c084fc',
          purple: '#a855f7',
          mint: '#6ee7b7',
          emerald: '#34d399',
          sky: '#38bdf8',
          blue: '#60a5fa',
          rose: '#f472b6',
          pink: '#ec4899',
          peach: '#f97316',
          indigo: '#818cf8',
        },
        charcoal: {
          950: '#08090e',
          900: '#0f111a',
          850: '#151824',
          800: '#1b1f2e',
          700: '#282d40',
          600: '#3f4660',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
