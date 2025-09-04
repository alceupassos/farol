
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        medical: {
          light: '#E6F7FF',
          DEFAULT: '#3DA5D9',
          dark: '#1F6C8C',
          accent: '#7FDBDA'
        },
        health: {
          green: '#4CAF50',
          yellow: '#FFC107',
          red: '#F44336'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' }
        },
        'slide-up': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          from: { transform: 'translateY(-10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' }
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'scale-in': {
          from: { transform: 'scale(0.95)', opacity: '0' },
          to: { transform: 'scale(1)', opacity: '1' }
        },
        'blur-in': {
          from: { filter: 'blur(4px)', opacity: '0' },
          to: { filter: 'blur(0)', opacity: '1' }
        },
        // Advanced Button Animations
        'buttonPulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 0 0 hsl(var(--primary) / 0.7)'
          },
          '50%': { 
            transform: 'scale(1.02)',
            boxShadow: '0 0 0 8px hsl(var(--primary) / 0)'
          }
        },
        'glowPulse': {
          '0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
          '100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' }
        },
        'buttonBounce': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0,0,0)' },
          '40%, 43%': { transform: 'translate3d(0,-8px,0)' },
          '70%': { transform: 'translate3d(0,-4px,0)' },
          '90%': { transform: 'translate3d(0,-2px,0)' }
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'breathe': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-out': 'fade-out 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'scale-in': 'scale-in 0.3s ease-out',
        'blur-in': 'blur-in 0.5s ease-out',
        // Enhanced Button Animations
        'button-pulse': 'buttonPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
        'button-bounce': 'buttonBounce 0.6s ease',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'breathe': 'breathe 2s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['SF Pro Display', 'Inter', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.05)',
        'glass-sm': '0 2px 12px rgba(0, 0, 0, 0.05)',
        'glass-hover': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)'
      },
      backdropFilter: {
        'glass': 'blur(16px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
