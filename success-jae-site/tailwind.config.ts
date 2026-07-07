import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				ink: {
					950: '#050507',
					900: '#0a0a0f',
					800: '#101018',
					700: '#16161f',
					600: '#1e1e2a',
				},
				gold: {
					300: '#f3d9a4',
					400: '#e8c37a',
					500: '#d4a94e',
					600: '#b58a35',
				},
				electric: {
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
				},
			},
			fontFamily: {
				display: [
					'"Space Grotesk"',
					'"Avenir Next"',
					'Futura',
					'"Segoe UI"',
					'system-ui',
					'sans-serif',
				],
				sans: [
					'Inter',
					'"SF Pro Text"',
					'"Segoe UI"',
					'system-ui',
					'-apple-system',
					'sans-serif',
				],
			},
			animation: {
				marquee: 'marquee 48s linear infinite',
				'marquee-reverse': 'marquee-reverse 56s linear infinite',
				'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				float: 'float 7s ease-in-out infinite',
				'float-delayed': 'float 8s ease-in-out 1.5s infinite',
				fadeIn: 'fadeIn 0.6s ease-out both',
				success: 'success 1s ease-in-out infinite',
			},
			keyframes: {
				marquee: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
				'marquee-reverse': {
					'0%': { transform: 'translateX(-50%)' },
					'100%': { transform: 'translateX(0)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-14px)' },
				},
				fadeIn: {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				success: {
					'0%, 100%': { backgroundColor: '#16a34a' },
					'50%': { backgroundColor: '#22c55e' },
				},
			},
		},
	},
	plugins: [],
};

export default config;
