<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	let isDarkMode = $state() as boolean;
	let isHidden: boolean = $state(true);

	function toggleMode() {
		setMode(!isDarkMode);
	}

	function setMode(bool: boolean) {
		isDarkMode = bool;

		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}

		localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

		if (window.matchMedia(`(prefers-color-scheme: ${localStorage.getItem('theme')})`).matches) {
			localStorage.removeItem('theme');
		}
	}

	function handleMediaChange(e: MediaQueryListEvent) {
		if (!localStorage.getItem('theme')) {
			setMode(e.matches);
		}
	}

	$effect(() => {
		isDarkMode =
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
		isHidden = false;

		setMode(isDarkMode);

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});
</script>

<svelte:head>
	<script>
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

{#if !isHidden}
	<button
		onclick={toggleMode}
		type="button"
		role="switch"
		aria-checked={isDarkMode}
		aria-label="Toggle {isDarkMode ? 'light' : 'dark'} mode"
		transition:fade={{ delay: 200, duration: 300 }}
		class="hover:rounded-md hover:outline-2 hover:outline-offset-2 hover:outline-emerald-500 focus:rounded-md focus:outline-2 focus:outline-offset-2 focus:outline-emerald-500"
	>
		<Sun class="hidden stroke-zinc-50 dark:block" />
		<Moon class="stroke-zinc-700 dark:hidden" />
	</button>
{/if}
