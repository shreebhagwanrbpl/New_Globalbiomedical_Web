import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        spice: {
          // 🤍 Royal Warm Ivory — Base light page & section background
          ivory: {
            DEFAULT: '#FBF8F3',
            50: '#FFFFFF',
            100: '#FBF8F3',
            200: '#F7EFE3',
            300: '#EFE3D0',
          },
          lightcream: '#FBF8F3',
          
          // 🧱 Rich Terracotta Crimson — Primary CTA, highlights, prices
          terracotta: {
            DEFAULT: '#B93826',
            50: '#FEF3F2',
            100: '#F8E6DA', // Soft Peach Cream tint
            200: '#F3C7BE',
            300: '#E99789',
            400: '#DC6855',
            500: '#B93826',
            600: '#A22F1E',
            700: '#872618',
            800: '#6E1F14',
            900: '#4F160E',
          },
          // Backward-compatible alias for primary red -> terracotta
          red: {
            DEFAULT: '#B93826',
            50: '#FEF3F2',
            100: '#F8E6DA',
            200: '#F3C7BE',
            300: '#E99789',
            400: '#DC6855',
            500: '#B93826',
            600: '#A22F1E',
            700: '#872618',
            800: '#6E1F14',
            900: '#4F160E',
          },
          deepred: {
            DEFAULT: '#872618',
            light: '#A22F1E',
            dark: '#6E1F14',
          },
          burgundy: {
            DEFAULT: '#6E1F14',
            light: '#872618',
            dark: '#4F160E',
          },

          // 🟡 Turmeric Gold — Best seller, stars, warm accents
          turmeric: {
            DEFAULT: '#D97706',
            50: '#FEFCE8',
            100: '#FEF9C3',
            200: '#FEF08A',
            300: '#FDE047',
            400: '#F59E0B',
            500: '#D97706',
            600: '#B45309',
            700: '#92400E',
            800: '#78350F',
          },
          orange: {
            DEFAULT: '#D97706',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },

          // 🌿 Cardamom Green — Announcement bar, organic purity, light green footer & accents
          cardamom: {
            DEFAULT: '#2D6A4F',
            50: '#F2F8F4', // Fresh light green tint
            100: '#EFF6F2', // Soft light green footer background
            200: '#D4E8DC', // Delicate light green border
            300: '#95D5B2',
            400: '#52B788',
            500: '#40916C',
            600: '#2D6A4F',
            700: '#1B4332',
            800: '#081C15',
          },
          lightgreen: {
            DEFAULT: '#EFF6F2',
            light: '#F5FAF7',
            border: '#D4E8DC',
          },
          green: {
            DEFAULT: '#2D6A4F',
            50: '#F2F8F4',
            100: '#EFF6F2',
            200: '#D4E8DC',
            300: '#95D5B2',
            400: '#52B788',
            500: '#40916C',
            600: '#2D6A4F',
            700: '#1B4332',
            800: '#081C15',
          },

          // 🤎 Espresso Brown — Dark text, icons, headings (NO pure black)
          espresso: {
            DEFAULT: '#3B2A24',
            light: '#4D3830',
            dark: '#2B1D19',
          },
          coffee: {
            DEFAULT: '#3B2A24',
            light: '#4D3830',
            dark: '#2B1D19',
          },
          cocoa: {
            DEFAULT: '#3B2A24',
            light: '#4D3830',
            dark: '#2B1D19',
          },

          // 🟤 Warm Sand — Secondary section & card bg
          sand: {
            DEFAULT: '#F3EBDD',
            50: '#FAF6F0',
            100: '#F3EBDD',
            200: '#EADBC6',
            300: '#DFC8AB',
          },
          cream: {
            DEFAULT: '#F3EBDD',
            50: '#FBF8F3',
            100: '#F8E6DA', // Soft Peach Cream
            200: '#F3EBDD',
            300: '#EADBC6',
          },
          beige: {
            DEFAULT: '#F3EBDD',
            50: '#FAF6F0',
            100: '#F3EBDD',
            200: '#EADBC6',
            300: '#DFC8AB',
          },

          // 🌸 Soft Peach Cream — Promo strips, badges, discount chips
          peach: {
            DEFAULT: '#F8E6DA',
            50: '#FFF5F0',
            100: '#F8E6DA',
            200: '#F2D2C0',
          },

          // ⚪ Pure White
          white: '#FFFFFF',

          // 🩶 Warm Taupe — Muted text, subtitles, strikethrough price
          taupe: '#75665E',
          muted: '#75665E',

          // 🟫 Soft Beige Border — Dividers, inputs, subtle card borders
          border: '#E7D9C8',

          // Functional tokens
          success: '#2D6A4F',
          error: '#B93826',
          warning: '#D97706',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      borderRadius: {
        'spice-input': '10px',
        'spice-button': '12px',
        'spice-card': '18px',
        'spice-section': '24px',
      },
      boxShadow: {
        'warm-xs': '0 1px 2px 0 rgba(59, 42, 36, 0.04)',
        'warm-sm': '0 2px 4px 0 rgba(59, 42, 36, 0.05), 0 1px 2px 0 rgba(59, 42, 36, 0.03)',
        'warm-md': '0 4px 8px -1px rgba(59, 42, 36, 0.07), 0 2px 4px -2px rgba(59, 42, 36, 0.03)',
        'warm-lg': '0 12px 20px -3px rgba(59, 42, 36, 0.08), 0 4px 6px -4px rgba(59, 42, 36, 0.02)',
        'warm-xl': '0 20px 25px -5px rgba(59, 42, 36, 0.10), 0 8px 10px -6px rgba(59, 42, 36, 0.04)',
        'warm-glow': '0 0 20px rgba(217, 119, 6, 0.15)',
        'terracotta-glow': '0 0 20px rgba(185, 56, 38, 0.18)',
        'cardamom-glow': '0 0 20px rgba(45, 106, 79, 0.15)',
      },
      maxWidth: {
        '8xl': '88rem', // 1408px
      },
    },
  },
  plugins: [],
};

export default config;
