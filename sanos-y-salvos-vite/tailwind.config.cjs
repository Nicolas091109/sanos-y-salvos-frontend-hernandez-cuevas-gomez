module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'portal-bg': '#0a0f1a',
        'mint': '#5dca8e',
        'brand-green': {
          DEFAULT: '#2A7A5E',
          dark: '#1a6843',
          light: '#d4eddf',
        },
        'brand-amber': {
          DEFAULT: '#f5c842',
          light: '#fff4e0',
          dark: '#b87c14',
        },
        'brand-blue': {
          DEFAULT: '#2462a8',
          light: '#e4f0ff',
        },
        'brand-gray': {
          light: '#f9fafb',
        }
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'dmsans': ['"DM Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
