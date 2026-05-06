/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'pw-bg': '#ffffff',
				'pw-text': '#1a1a1a',
				'pw-text-soft': '#6b6b6b',
				'pw-border': '#ececec',
				'pw-accent': '#0a0a0a',
				'pw-accent-soft': '#ff7a1a',
				'pw-pill': '#f7f7f7',
				'pw-section-bg': '#f8f7f4',
				'pw-dark-bg': '#050505',
				'pw-dark-card': '#0e0e0e',
			},
			fontFamily: {
				sans: ['Pretendard', 'system-ui', 'sans-serif'],
			},
			spacing: {
				'section-mobile': '80px',  // py-20
				'section-tablet': '112px', // py-28
				'section-desktop': '144px', // py-36
			},
		},
	},
	plugins: [],
}
