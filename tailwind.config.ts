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
      maxWidth: {
        container: '1300px'
      },
      padding: {
        containerDesktop: '30px',
        containerMobile: '20px',
      },
      screens: {
        'm1280': {'max': '1280px'},
        'm1050': {'max': '1050px'},
        'm1150': {'max': '1150px'},
        'm1000': {'max': '1000px'},
        'm900': {'max': '900px'},
        'm700': {'max': '700px'},
        'm650': {'max': '650px'},
        'm600': {'max': '600px'},
        'm550': {'max': '550px'},
        'm500': {'max': '500px'},
        'm480': {'max': '480px'},
        'm450': {'max': '450px'},
        'm400': {'max': '400px'},
        'm350': {'max': '350px'},
        'h550': { 'raw': '(max-height: 550px)' },
      }
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
