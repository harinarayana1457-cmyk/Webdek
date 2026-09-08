/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
          surface: '#ffffff',
          card: 'rgba(255, 255, 255, 0.92)',
          border: '#e2e8f0',
        },
        brand: {
          blue: '#2563eb',
          indigo: '#4f46e5',
          cyan: '#0284c7',
          emerald: '#059669',
          amber: '#d97706',
          rose: '#e11d48',
          purple: '#7c3aed',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'soft-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 16px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)',
        'soft-xl': '0 20px 40px -8px rgba(15, 23, 42, 0.12), 0 6px 12px -4px rgba(15, 23, 42, 0.04)',
        'glow-blue': '0 0 20px -3px rgba(37, 99, 235, 0.25)',
        'glow-indigo': '0 0 20px -3px rgba(79, 70, 229, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
