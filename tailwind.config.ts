import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#f2f2f2',
        darkBg: '#0d0d0d',
        primary: '#1d633e',
        primaryHover: '#174f31',

        secondary: '#d7dfdb',
        secondaryHover: '#c6d2cc',

        darkSecondary: '#222a26',
        darkSecondaryHover: '#2d3933',

        accent: '#517b65',
        darkAccent: '#a3c2b2',

        blackHover: '#252525',
        whiteHover: '#EEEEEE',
      },
      width: {
        container: '1300px',
      },
      padding: {
        containerDesktop: '30px',
        containerMobile: '20px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
