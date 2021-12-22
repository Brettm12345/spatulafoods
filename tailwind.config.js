const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')
/**
 * @type {import('tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        '2sm': '4px',
      },
      transitionTimingFunction: {
        mantine: 'cubic-bezier(0.64, 0.46, 0, 0.84)',
      },
      colors: colors,
    },
    keyframes: {
      enter: {
        '0%': {transform: 'scale(0.9)', opacity: 0},
        '100%': {transform: 'scale(1)', opacity: 1},
      },
      leave: {
        '0%': {transform: 'scale(1)', opacity: 1},
        '100%': {transform: 'scale(0.9)', opacity: 0},
      },
      'slide-in': {
        '0%': {transform: 'translateY(-100%)'},
        '100%': {transform: 'translateY(0)'},
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@neojp/tailwindcss-important-variant'),
    require('@themesberg/flowbite/plugin'),
    plugin(({matchUtilities, theme}) => {
      matchUtilities(
        {
          size: value => ({
            width: value,
            height: value,
          }),
          'min-size': value => ({
            minWidth: value,
            minHeight: value,
          }),
          'max-size': value => ({
            maxHeight: value,
            maxWidth: value,
          }),
          'force-size': value => ({
            minWidth: value,
            minHeight: value,
            width: value,
            height: value,
            maxHeight: value,
            maxWidth: value,
          }),
        },
        {
          values: theme('width'),
        }
      )
    }),
  ],
}
