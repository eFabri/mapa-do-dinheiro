/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#0B0E13",
          800: "#0E1116",
          700: "#13171E",
          600: "#161A20",
          500: "#1B2029",
        },
        bone: {
          50: "#F4F1EA",
          100: "#E8E3D6",
          200: "#C9C3B4",
          300: "#8E8A80",
        },
        gold: {
          300: "#E4C590",
          400: "#D4B077",
          500: "#C9A86A",
          600: "#A98A4D",
          700: "#7A6235",
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.15)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2.8s linear infinite',
        pulseGold: 'pulseGold 2.4s ease-in-out infinite',
        drift: 'drift 6s ease-in-out infinite',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,168,106,0.25), 0 10px 40px -10px rgba(201,168,106,0.35)',
        inset: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
    },
  },
  plugins: [],
};
