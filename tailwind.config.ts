import type { Config } from 'tailwindcss';

/**
 * v2 palette.
 *
 * Six named roles, each expanded into a ramp so surfaces, borders, and text
 * can be tuned without inventing ad-hoc hexes. The step carrying the approved
 * brand hex is marked; everything else is derived from it.
 */
const pine = {
  50: '#F0F5F1',
  100: '#DCE8E0',
  200: '#B7D0BF',
  300: '#8AB197',
  400: '#5C8F70',
  500: '#3D7052',
  600: '#2D573F',
  700: '#22422F',
  800: '#173324',
  900: '#0E2A1F', // pine-deep — primary dark surface / hero background
  950: '#081A13',
};

const ridge = {
  50: '#F1F6F9',
  100: '#DDEAF1',
  200: '#BAD5E3',
  300: '#8FB9CF',
  400: '#5E96B4',
  500: '#3C7899',
  600: '#2C5F7C', // ridge-blue — links, section accents
  700: '#254E66',
  800: '#1E3D50',
  900: '#17303F',
};

const ocean = {
  50: '#F0F8F7',
  100: '#DAEEEB',
  200: '#B4DDD8',
  300: '#89C6BF',
  400: '#5FA8A0', // ocean-glass — interactive accent, focus states
  500: '#478B84',
  600: '#38706B',
  700: '#2E5A56',
  800: '#264745',
  900: '#1F3A38',
};

const granite = {
  50: '#F6F7F7',
  100: '#E9EBEB',
  200: '#D2D6D6',
  300: '#B0B7B7',
  400: '#889191',
  500: '#6A7373',
  600: '#525B5B',
  700: '#3D4849', // granite — body text on light surfaces
  800: '#2E3738',
  900: '#232A2B',
};

const birch = {
  50: '#FAF9F4',
  100: '#F2EFE6', // birch — light surfaces
  200: '#E6E1D2',
  300: '#D5CEBA',
  400: '#BDB49B',
  500: '#A29881',
};

const ember = {
  50: '#FDF5F0',
  100: '#F9E5D9',
  200: '#F1C8AE',
  300: '#E5A57C',
  400: '#D78855',
  500: '#C96E3B', // ember — the one action colour
  600: '#AC5A2E',
  700: '#8B4724',
  800: '#6E381E',
  900: '#5A2F1B',
};

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        pine,
        ridge,
        ocean,
        granite,
        birch,
        ember,
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      keyframes: {
        // Scroll affordance under the hero. transform + opacity only.
        'topo-cue': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.55' },
          '50%': { transform: 'translateY(4px)', opacity: '1' },
        },
      },
      animation: {
        'topo-cue': 'topo-cue 2.6s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // v1 static tile, still used by the ring and case-study page headers.
        // Superseded by <TopographicContours /> in the rest-of-site pass.
        topographic:
          "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%230E2A1F\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
      },
    },
  },
  plugins: [],
} satisfies Config;
