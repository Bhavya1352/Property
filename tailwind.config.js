/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    screens: {
      // Custom breakpoints for all device sizes
      'xs': '320px',   // Small phones: 320px – 375px
      'sm': '376px',   // Large phones: 376px – 480px
      'md': '481px',   // iPads and tablets: 481px – 768px
      'lg': '769px',   // Large tablets: 769px – 1024px
      'xl': '1025px',  // Small laptops: 1025px – 1366px
      '2xl': '1367px', // Large laptops: 1367px – 1600px
      '3xl': '1601px', // Standard desktop: 1601px – 1920px
      '4xl': '1921px', // Large screens: 1921px and up
    },
    extend: {
      colors: {
        // Property Management System Custom Palette
        // Primary Dark - Charcoal Slate
        primary: '#1F2937',
        'primary-light': '#283443',
        // Accent - Muted Sage Green
        accent: '#7C8F63',
        'accent-hover': '#6C8055',
        // Highlight - Warm Sand/Gold
        highlight: '#C7A97A',
        // Text Colors
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        // Background
        background: '#1F2937',
        'bg-card': '#283443',
        // Slate for compatibility
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        glow: '0 0 15px -3px rgba(124, 143, 99, 0.3)',
        'glass-light': '0 8px 32px 0 rgba(31, 41, 55, 0.07)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
