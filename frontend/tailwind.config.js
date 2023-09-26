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
        online: "var(--online)",
      },
    },
  },
  plugins: [],
};
