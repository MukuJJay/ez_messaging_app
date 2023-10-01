/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "var(--primaryColor)",
        secondaryColor: "var(--secondaryColor)",
        tertiaryColor: "var(--tertiaryColor)",
        dangerColor: "var(--dangerColor)",
        darkestPrimaryColor: "var(--darkestPrimaryColor)",
        darkestPrimaryColorHover: "var(--darkestPrimaryColorHover)",
        online: "var(--online)",
      },
    },
    screens: {
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xlm: { min: "1281px" },
      lgm: { min: "1025px" },
      mdm: { min: "769px" },
      smm: { min: "641px" },
    },
  },
  plugins: [],
};
