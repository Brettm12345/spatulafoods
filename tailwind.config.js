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
        },
        {
          values: theme('width'),
        }
      )
      matchUtilities(
        {
          'min-size': value => ({
            minWidth: value,
            minHeight: value,
          }),
        },
        {
          values: theme('width'),
        }
      )
      matchUtilities(
        {
          'max-size': value => ({
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
