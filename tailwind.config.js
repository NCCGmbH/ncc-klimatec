/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{astro,js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        turquoise: '#1e40af',        // z. B. bg-primary
        accent: '#f43f5e',         // z. B. text-accent
        turquoise: {
          light: '#d8faf2',
          medium: '#20e1b4',      // z. B. text-brand
          dark: '#0d5645',
        },
      },
      animation: {
        rainbow: 'rainbow 2s linear infinite',
      },
      keyframes: {
        rainbow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
};
