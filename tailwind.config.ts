// ─── Tailwind CSS Configuration ───
// Configures: content paths, theme extensions (fonts, colors, animations, shadows),
// and the tailwindcss-animate plugin.
// Colors reference CSS variables from index.css for theming support.

import type { Config } from "tailwindcss";

export default {
  // Enable class-based dark mode (theme applied via CSS class on <html>)
  darkMode: ["class"],

  // Files to scan for Tailwind utility class usage
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],

  prefix: "", // No class name prefix

  theme: {
  	// Container defaults: centered, padded, max-width at 2xl breakpoint
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		// ─── Font Families ───
  		fontFamily: {
  			sans: [
  				'Inter', 'ui-sans-serif', 'system-ui', '-apple-system',
  				'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue',
  				'Arial', 'Noto Sans', 'sans-serif'
  			],
  			mono: [
  				'Space Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo',
  				'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'
  			],
  			serif: [
  				'Lora', 'ui-serif', 'Georgia', 'Cambria',
  				'Times New Roman', 'Times', 'serif'
  			]
  		},

  		// ─── Semantic Colors ───
  		// All colors reference CSS variables from index.css for theme switching
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},

  		// ─── Border Radius ───
  		// References the --radius CSS variable for consistent rounding
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},

  		// ─── Keyframe Animations ───
  		keyframes: {
  			// Accordion expand/collapse (used by Radix UI)
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			// Floating/bobbing animation (used for decorative elements)
			float: {
				'0%, 100%': { transform: 'translateY(0)' },
				'50%': { transform: 'translateY(-10px)' }
			},
			// Slow clockwise spin (used for orbit rings around profile image)
			'spin-slow': {
				from: { transform: 'rotate(0deg)' },
				to: { transform: 'rotate(360deg)' }
			},
			// Slow counter-clockwise spin (used for inner orbit ring)
			'spin-slow-reverse': {
				from: { transform: 'rotate(360deg)' },
				to: { transform: 'rotate(0deg)' }
			},
			// Button click feedback animation (scale down → bounce up → settle)
			'bounce-click': {
				'0%': { transform: 'scale(1)' },
				'40%': { transform: 'scale(0.92)' },
				'70%': { transform: 'scale(1.05)' },
				'100%': { transform: 'scale(1)' }
			}
		},

		// ─── Animation Utilities ───
		// Maps keyframes to Tailwind animation classes (e.g., animate-float)
		animation: {
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			float: 'float 6s ease-in-out infinite',
			'spin-slow': 'spin-slow 20s linear infinite', // 20s full rotation
			'spin-slow-reverse': 'spin-slow-reverse 15s linear infinite', // 15s reverse rotation
			'bounce-click': 'bounce-click 0.35s ease-out' // Button click feedback
		},

  		// ─── Box Shadows ───
  		// References CSS variables from index.css for consistent shadows
  		boxShadow: {
  			'2xs': 'var(--shadow-2xs)',
  			xs: 'var(--shadow-xs)',
  			sm: 'var(--shadow-sm)',
  			md: 'var(--shadow-md)',
  			lg: 'var(--shadow-lg)',
  			xl: 'var(--shadow-xl)',
  			'2xl': 'var(--shadow-2xl)'
  		}
  	}
  },

  // Plugins
  plugins: [require("tailwindcss-animate")], // Enables additional animation utilities
} satisfies Config;
