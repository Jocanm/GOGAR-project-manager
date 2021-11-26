const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      // Build your palette here
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.gray,
      red: colors.red,
      blue: colors.blue,
      yellow: colors.yellow,
      amber: colors.amber,
      blueGray: colors.blueGray,
      coolGray: colors.coolGray,
      trueGray: colors.trueGray,
      warmGray: colors.warmGray,
      orange: colors.orange,
      purple: colors.purple,
      lime: colors.lime,
      emerald: colors.emerald,
      teal: colors.teal,
      // cyan: colors.cyan,
      sky: colors.sky,
      white: colors.white,
      indigo: colors.indigo,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      custom:{
        first:'#082032',
        second:'#2C394B',
        third:"#334756",
        fourth:'#FF4C29',
        five:"#f57a62"
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      textColor: ['disabled']
    },
  },
  plugins: [],
}