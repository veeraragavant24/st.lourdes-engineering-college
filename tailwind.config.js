/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#650F24',
          50: '#F9EEF1',
          100: '#F0DCE3',
          200: '#E0B0C0',
          300: '#C97A93',
          400: '#A04564',
          500: '#7A2540',
          600: '#650F24',
          700: '#530C1E',
          800: '#390713',
          900: '#27050D',
        },
        gold: {
          DEFAULT: '#D4AF5A',
          50: '#FBF5E5',
          100: '#F6D982',
          200: '#EFC95E',
          300: '#D4AF5A',
          400: '#B8934A',
          500: '#9A7A3C',
          600: '#7C6230',
          700: '#5E4A24',
          800: '#403218',
          900: '#221A0C',
        },
        ivory: '#FFF8EC',
        charcoal: '#242124',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'fade-in-up': 'fadeInUp 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
