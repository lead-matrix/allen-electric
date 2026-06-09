/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            50: '#f4f6fa',
            100: '#e8ecf4',
            200: '#cbd6e9',
            300: '#9cb3d8',
            400: '#688bc3',
            500: '#436aa8',
            600: '#32528c',
            700: '#294373',
            800: '#243960',
            900: '#0b1329', // Deep Luxury Navy
            950: '#060a17',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b', // Electric Amber/Gold
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(245, 158, 11, 0.2), 0 0 10px rgba(245, 158, 11, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(245, 158, 11, 0.6), 0 0 30px rgba(245, 158, 11, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
