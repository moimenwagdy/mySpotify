/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#1c1818",
        simiDark: "#948c84",
        secondryColor: "#8c8c94",
        simiLight: "#a49b9c",
        light: "#d4ccc4",
        lightGreen: "#8bfa37",
        darkGreen: "#61b025",
      },
      backgroundImage: {
        smImg: "url('../../images/sm.jpg')",
        mdImg: "url('./images/md.jpg')",
        lgImg: "url('./images/wide2.jpg')",
      },
      fontFamily: {
        rubik: "Rubik",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
