/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'airost-primary': '#3498db',
        'airost-secondary': '#2ecc71',
        'airost-accent': '#e74c3c'
      }
    }
  },
  plugins: []
}
