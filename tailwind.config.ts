import type { Config } from 'tailwindcss';

/**
 * Obsidian design system.
 *
 * One dark ground, soft white type, cobalt used sparingly as a signal rather
 * than a decoration. Every surface is a tint of the ground plus a hairline —
 * there are no white cards anywhere.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#08080B',
          deep: '#050507',
          raised: '#0E0E13',
          panel: '#12121A',
          edge: '#1B1B24',
          line: '#26262F',
        },
        /* Soft white — never pure #fff, which glares against true black. */
        chalk: {
          DEFAULT: '#F2F3F5',
          soft: '#D8DAE0',
          muted: '#9C9FA9',
          faint: '#6B6E78',
          ghost: '#43454E',
        },
        cobalt: {
          DEFAULT: '#2F5EF0',
          bright: '#4C7BFF',
          light: '#8CAAFF',
          deep: '#1A3AAE',
          ink: '#0A1533',
        },
        /* Confirmation only — never decoration. A form that has actually sent
           is the one moment the palette is allowed to leave cobalt. */
        success: {
          DEFAULT: '#12A870',
          bright: '#1BC583',
          light: '#6EE7B7',
        },
      },
      fontFamily: {
        display: ['"Archivo"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.032em',
        wide2: '0.15em',
        wide3: '0.26em',
      },
      maxWidth: { shell: '1520px', reading: '58ch' },
      transitionTimingFunction: {
        /* One easing curve for the whole site. */
        cine: 'cubic-bezier(0.16, 1, 0.3, 1)',
        cineIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
      transitionDuration: { 400: '400ms', 600: '600ms', 900: '900ms', 1200: '1200ms' },
      boxShadow: {
        drop: '0 40px 120px -50px rgba(0,0,0,0.95)',
        cobalt: '0 20px 70px -28px rgba(47,94,240,0.65)',
        inset: 'inset 0 1px 0 0 rgba(255,255,255,0.07)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
        breathe: {
          '0%,100%': { opacity: '0.35' },
          '50%': { opacity: '0.7' },
        },
      },
      animation: {
        drift: 'drift 9s cubic-bezier(0.16,1,0.3,1) infinite',
        scan: 'scan 7s linear infinite',
        breathe: 'breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
