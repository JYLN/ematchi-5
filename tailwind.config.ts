import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

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
	},

	plugins: [
		plugin(({ addUtilities, theme, e }) => {
			const plainCssUtils = {
				'.preserve-3d': {
					'transform-style': 'preserve-3d',
					'-webkit-transform-style': 'preserve-3d'
				},
				'.backface-hidden': {
					'backface-visibility': 'hidden',
					'-webkit-backface-visibility': 'hidden'
				}
			};

			const rotateYValues = theme('rotate');
			const rotateYUtils = {};

			for (const key in rotateYValues) {
				rotateYUtils[`.${e(`rotate-y-${key}`)}`] = {
					transform: `rotateY(${rotateYValues[key]})`
				};
			}

			const perspectiveValues = {
				none: 'none',
				xs: '100px',
				sm: '250px',
				md: '500px',
				lg: '1000px',
				xl: '2000px',
				'2xl': '4000px'
			};
			const perspectiveUtils = {};

			for (const key in perspectiveValues) {
				perspectiveUtils[`.${e(`perspective-${key}`)}`] = {
					perspective: perspectiveValues[key]
				};
			}

			addUtilities({ ...plainCssUtils, ...rotateYUtils, ...perspectiveUtils });
		})
	]
} as Config;
