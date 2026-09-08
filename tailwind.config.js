/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rb: {
          dark: '#030b17',
          navy: '#051329',
          surface: '#091c38',
          card: '#0e2447',
          border: 'rgba(255, 255, 255, 0.1)',
          borderActive: '#e00034',
          red: '#e00034',
          crimson: '#ff003c',
          yellow: '#ffd100',
          gold: '#ffb800',
          blue: '#0066cc',
          sky: '#00a3ff',
          silver: '#e2e8f0',
          muted: '#8da2b8',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'rb-red': '0 0 25px -4px rgba(224, 0, 52, 0.45)',
        'rb-yellow': '0 0 25px -4px rgba(255, 209, 0, 0.4)',
        'rb-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
        'rb-glow': '0 0 35px -5px rgba(224, 0, 52, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'race-pulse': 'racePulse 2s ease-in-out infinite',
      },
      keyframes: {
        racePulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
