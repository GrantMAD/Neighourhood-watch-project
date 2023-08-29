/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        "max-height": "max-height",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
