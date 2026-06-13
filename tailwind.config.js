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
            50: '#f9f9f9',
            100: '#f1f1f1',
            200: '#e3e3e3',
            300: '#cdcdcd',
            400: '#b3b3b3',
            500: '#999999',
            600: '#7f7f7f',
            700: '#555555',
            800: '#1f1f1f',
            900: '#0a0a0a', // Luxury Matte Black
            950: '#000000', // Pure Black
          },
          gold: {
            50: '#fff5f5',
            100: '#ffe3e3',
            200: '#ffc9c9',
            300: '#ffa8a8',
            400: '#ff8787',
            500: '#c81e1e', // Crimson Accent
            600: '#a61e1e',
            700: '#8b1e1f', // Hexagon Crimson
            800: '#5c1414',
            900: '#370a0d', // Hexagon Dark Shadow
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
