/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'ghost-purple': '#8B5CF6',
          'ghost-blue': '#3B82F6',
          'ghost-dark': '#1F2937',
        },
        animation: {
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-slow': 'bounce 2s infinite',
        },
        backdropBlur: {
          xs: '2px',
        }
      },
    },
    plugins: [],
  }