<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import { fade, scale } from 'svelte/transition';

	let { children }: { children: Snippet } = $props();
</script>

<aside
	class="fixed left-0 top-0 z-50 grid h-full w-full place-items-center text-center font-poppins text-zinc-600 backdrop-blur transition-all dark:text-zinc-50"
	transition:fade={{ duration: 200 }}
>
	<div class="relative" transition:scale={{ start: 0.9, duration: 400, easing: cubicOut }}>
		{@render children()}
	</div>
</aside>
