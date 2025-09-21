module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg))',
        fg: 'rgb(var(--fg))',
        muted: 'rgb(var(--muted))',
        primary: 'rgb(var(--primary))',
        secondary: 'rgb(var(--secondary))',
        accent: 'rgb(var(--accent))',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
    }
  },
  plugins: [],
}
