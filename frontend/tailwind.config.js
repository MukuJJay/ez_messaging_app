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
      xlm: { min: "1280px" },
      lgm: { min: "1024px" },
      mdm: { min: "768px" },
      smm: { min: "640px" },
    },
  },
  plugins: [],
};
