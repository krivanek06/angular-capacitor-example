/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true, // to overwride angular material
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    fontFamily: {
      sans: ["sans-serif", "Poppins"],
      serif: ["sans-serif", "Poppins"],
    },
  },
  plugins: [],
};
