/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        fdf5e8: "#FDF5E8",
        ffb534: "#FFB534",
        ffcb74: "#FFCB74",
        "64748b": "#64748B",
        ffffff: "#FFFFFF",
        "7c7872": "#7C7872",
        ffc45d: "#FFC45D",
        fefbf6: "#FEFBF6",
        ff9a62: "#FF9A62",
        filter: "#E5E5E5",
        searchInput: "#f5f5f5",
        card: "#fff2dc",
      },
      padding: {
        custom: "0.125rem",
        buttons: "#FFB534",
        hovers: "#FFCB74",
        backgr: "#FDF5E8",
      },
      opacity: {
        40: "0.4",
        20: "0.2",
      },
      
    },
  },
  plugins: [],
};
