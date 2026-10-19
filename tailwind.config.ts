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
        // Modern Clinical & Biomedical Design System
        medical: {
          crimson: '#DC2626',
          darkred: '#B91C1C',
          sapphire: '#0284C7',
          navy: '#0F172A',
          slate: '#1E293B',
          frost: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#64748B',
        },
        // Backward-compatible token mappings to prevent breakage in existing components
        spice: {
          // 🤍 Clean Clinical White / Ice background
          ivory: {
            DEFAULT: '#FFFFFF',
            50: '#FFFFFF',
            100: '#F8FAFC',
            200: '#F1F5F9',
            300: '#E2E8F0',
          },
          lightcream: '#F8FAFC',

          // 🔴 Brand Crimson Red (Matches "HR Human Biomedicals" logo)
          terracotta: {
            DEFAULT: '#DC2626',
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#DC2626',
            600: '#B91C1C',
            700: '#991B1B',
            800: '#7F1D1D',
            900: '#450A0A',
          },
          red: {
            DEFAULT: '#DC2626',
            50: '#FEF2F2',
            100: '#FEE2E2',
            200: '#FECACA',
            300: '#FCA5A5',
            400: '#F87171',
            500: '#DC2626',
            600: '#B91C1C',
            700: '#991B1B',
            800: '#7F1D1D',
            900: '#450A0A',
          },
          deepred: {
            DEFAULT: '#B91C1C',
            light: '#DC2626',
            dark: '#991B1B',
          },
          burgundy: {
            DEFAULT: '#991B1B',
            light: '#B91C1C',
            dark: '#7F1D1D',
          },

          // 🟡 Clinical Amber / Gold for Ratings & Accents
          turmeric: {
            DEFAULT: '#F59E0B',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
          },
          orange: {
            DEFAULT: '#F59E0B',
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
          },

          // 🔵 Clinical Sky / Sapphire Blue for diagnostic trust, verified badges
          cardamom: {
            DEFAULT: '#0284C7',
            50: '#F0F9FF',
            100: '#E0F2FE',
            200: '#BAE6FD',
            300: '#7DD3FC',
            400: '#38BDF8',
            500: '#0EA5E9',
            600: '#0284C7',
            700: '#0369A1',
            800: '#075985',
            900: '#0C4A6E',
          },
          lightgreen: {
            DEFAULT: '#F0FDF4',
            light: '#DCFCE7',
            border: '#BBF7D0',
          },
          green: {
            DEFAULT: '#16A34A',
            50: '#F0FDF4',
            100: '#DCFCE7',
            200: '#BBF7D0',
            300: '#86EFAC',
            400: '#4ADE80',
            500: '#22C55E',
            600: '#16A34A',
            700: '#15803D',
            800: '#166534',
          },

          // 🏢 Deep Clinical Navy / Slate — Modern, crisp, authoritative text
          espresso: {
            DEFAULT: '#0F172A', // Slate 900
            light: '#1E293B',   // Slate 800
            dark: '#020617',    // Slate 950
          },
          coffee: {
            DEFAULT: '#0F172A',
            light: '#1E293B',
            dark: '#020617',
          },
          cocoa: {
            DEFAULT: '#0F172A',
            light: '#1E293B',
            dark: '#020617',
          },

          // ❄️ Soft Slate / Frost for cards and secondary sections
          sand: {
            DEFAULT: '#F1F5F9',
            50: '#F8FAFC',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
          },
          cream: {
            DEFAULT: '#F8FAFC',
            50: '#FFFFFF',
            100: '#FEF2F2',
            200: '#F1F5F9',
            300: '#E2E8F0',
          },
          beige: {
            DEFAULT: '#F8FAFC',
            50: '#FFFFFF',
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
          },

          // 🌸 Soft Red Tint for alert badges and highlights
          peach: {
            DEFAULT: '#FEF2F2',
            50: '#FFF5F5',
            100: '#FEE2E2',
            200: '#FECACA',
          },

          // ⚪ Pure White
          white: '#FFFFFF',

          // 🩶 Clean Professional Slate — Secondary text, descriptions
          taupe: '#475569', // Slate 600
          muted: '#64748B', // Slate 500

          // 🔲 Clean Slate Border
          border: '#E2E8F0',

          // Functional tokens
          success: '#16A34A',
          error: '#DC2626',
          warning: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'], // Maps serif to sleek modern sans-serif
        display: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'spice-input': '8px',
        'spice-button': '10px',
        'spice-card': '16px',
        'spice-section': '20px',
      },
      boxShadow: {
        'warm-xs': '0 1px 2px 0 rgba(15, 23, 42, 0.05)',
        'warm-sm': '0 1px 3px 0 rgba(15, 23, 42, 0.08), 0 1px 2px -1px rgba(15, 23, 42, 0.08)',
        'warm-md': '0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.06)',
        'warm-lg': '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)',
        'warm-xl': '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
        'warm-glow': '0 0 20px rgba(2, 132, 199, 0.15)',
        'terracotta-glow': '0 0 20px rgba(220, 38, 38, 0.20)',
        'cardamom-glow': '0 0 20px rgba(2, 132, 199, 0.18)',
      },
      maxWidth: {
        '8xl': '88rem', // 1408px
      },
    },
  },
  plugins: [],
};

export default config;
