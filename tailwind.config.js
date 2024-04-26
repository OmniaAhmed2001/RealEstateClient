/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttons: '#FFB534',
        hovers: '#FFCB74',
        backgr: '#FDF5E8',
      },
      opacity: {
        '40': '0.4',
        '20': '0.2',
      },
    },
  },
  plugins: [],
};
