/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        // Cyberpunk neon colors
        neon: {
          pink: '#FF2E63',
          blue: '#00FFF5',
          purple: '#9D4EDD',
          yellow: '#FFD300',
        },
        // Dark theme base colors
        cyber: {
          black: '#0A0A0B',
          darker: '#121316',
          dark: '#1A1B1F',
          primary: '#252A34',
          light: '#2E3239',
        },
      },
      boxShadow: {
        'neon-pink': '0 0 5px #FF2E63, 0 0 20px #FF2E63',
        'neon-blue': '0 0 5px #00FFF5, 0 0 20px #00FFF5',
        'neon-purple': '0 0 5px #9D4EDD, 0 0 20px #9D4EDD',
      },
      fontFamily: {
        cyber: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
