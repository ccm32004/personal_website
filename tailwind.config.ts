import type { Config } from 'tailwindcss';

const config: Config = {
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
        'cyber-black': '#0D0D0D',
        'cyber-dark': '#1A1A1A',
        'cyber-darker': '#141414',
        'cyber-primary': '#1A1A1A',
        'neon-blue': '#00FFF5',
        'neon-purple': '#BB80FF',
      },
      fontFamily: {
        cyber: ['var(--font-orbitron)'],
      },
      textShadow: {
        'glow-blue': '0 0 10px #00FFF5',
        'glow-purple': '0 0 10px #BB80FF',
      },
    },
  },
  plugins: [],
};

export default config;
