
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
				},
				// Inferno theme colors
				inferno: {
					50: '#FEF2F2',
					100: '#FEE2E2',
					200: '#FECACA',
					300: '#FCA5A5',
					400: '#F87171',
					500: '#EF4444',
					600: '#DC2626',
					700: '#B91C1C',
					800: '#991B1B',
					900: '#7F1D1D',
					950: '#450A0A'
				},
				volcanic: {
					50: '#18181B',
					100: '#27272A',
					200: '#3F3F46',
					300: '#52525B',
					400: '#71717A',
					500: '#A1A1AA',
					600: '#D4D4D8',
					700: '#E4E4E7',
					800: '#F4F4F5',
					900: '#FAFAFA',
					950: '#FFFFFF'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'flame-flicker': {
					'0%, 100%': {
						transform: 'scaleY(1) scaleX(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scaleY(1.1) scaleX(0.9)',
						opacity: '0.8'
					}
				},
				'ember-float': {
					'0%': {
						transform: 'translateY(100vh) rotate(0deg)',
						opacity: '0'
					},
					'10%': {
						opacity: '1'
					},
					'90%': {
						opacity: '1'
					},
					'100%': {
						transform: 'translateY(-10vh) rotate(360deg)',
						opacity: '0'
					}
				},
				'lava-flow': {
					'0%': {
						backgroundPosition: '0% 50%'
					},
					'50%': {
						backgroundPosition: '100% 50%'
					},
					'100%': {
						backgroundPosition: '0% 50%'
					}
				},
				'glow-pulse': {
					'0%, 100%': {
						boxShadow: '0 0 5px #EF4444, 0 0 10px #EF4444, 0 0 15px #EF4444'
					},
					'50%': {
						boxShadow: '0 0 10px #DC2626, 0 0 20px #DC2626, 0 0 30px #DC2626'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'flame-flicker': 'flame-flicker 3s ease-in-out infinite',
				'ember-float': 'ember-float 8s linear infinite',
				'lava-flow': 'lava-flow 6s ease-in-out infinite',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite'
			},
			backgroundImage: {
				'volcanic-gradient': 'linear-gradient(135deg, #450A0A 0%, #7F1D1D 25%, #991B1B 50%, #7F1D1D 75%, #450A0A 100%)',
				'lava-flow': 'linear-gradient(45deg, #DC2626, #EF4444, #F97316, #EF4444, #DC2626)',
				'ember-gradient': 'radial-gradient(circle, #F97316 0%, #DC2626 50%, transparent 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
