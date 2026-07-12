
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '24px',
    },
    extend: {
      colors: {
        'bg': '#08090B',
        'bg-elevated': '#0E1013',
        'panel': '#111318',
        'border': 'rgba(255, 255, 255, 0.08)',
        'border-strong': 'rgba(255, 255, 255, 0.16)',
        'text': '#F2F3F5',
        'text-muted': '#8A8F98',
        'text-faint': '#52565D',
        'accent': '#FFFFFF',
        'success': '#4ADE80',
        'error': '#F87171',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '20px',
      },
      screens: {
        'lg-breakpoint': '900px',
        'md-breakpoint': '860px',
      },
    },
  },
  plugins: [],
}
export default config
