/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        void: '#050505',
        surface: '#0a0a0f',
        glass: 'rgba(255, 255, 255, 0.03)',
        accent: {
          DEFAULT: '#3b82f6',
          cyan: '#22d3ee',
          purple: '#a855f7',
          electric: '#6366f1',
        },
      },
      animation: {
        aurora: 'aurora 20s ease infinite',
        float: 'float 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        nodeDrift: 'nodeDrift 8s ease-in-out infinite',
        linePulse: 'linePulse 4s ease-in-out infinite',
        lineFlow: 'lineFlow 2.5s ease-in-out infinite',
        particleDrift: 'particleDrift 12s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        nodeDrift: {
          '0%, 100%': { transform: 'translate(0px, 0px)' },
          '33%': { transform: 'translate(2px, -3px)' },
          '66%': { transform: 'translate(-2px, 2px)' },
        },
        linePulse: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.55' },
        },
        lineFlow: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        particleDrift: {
          '0%, 100%': { transform: 'translate(0, 0)', opacity: '0.15' },
          '50%': { transform: 'translate(6px, -8px)', opacity: '0.45' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
