// tailwind.config.js
module.exports = {
  darkmode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll-left 30s linear infinite',
        float: 'float 3s ease-in-out infinite', // 👈 add this
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        float: { // 👈 new keyframes
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
