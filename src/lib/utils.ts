import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function shuffle<T>(array: T[]) {
	let i = array.length;

	while (i--) {
		const j = ~~(Math.random() * i--);
		const temp = array[i];

		array[i] = array[j];
		array[j] = temp;
	}

	return array;
}
