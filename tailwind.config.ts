import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',

	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				poppins: ['Poppins', 'sans-serif']
			},
			transitionProperty: {
				height: 'height'
			}
		}
	}
} as Config;
