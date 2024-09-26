<script lang="ts">
	import { receive } from '$lib/transitions';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import Twemoji from './Twemoji.svelte';

	interface Props {
		foundPairs: string[];
	}

	let { foundPairs }: Props = $props();
</script>

{#each foundPairs as emoji (emoji)}
	<span
		class="relative aspect-square rounded-lg bg-zinc-200"
		in:fade={{ delay: 500 }}
		animate:flip={{ duration: 200, delay: 500 }}
		class:w-14={foundPairs.length <= 8}
		class:w-12={foundPairs.length > 8 && foundPairs.length <= 18}
		class:w-10={foundPairs.length > 18}
	>
		<span class="absolute aspect-square w-full p-1.5" in:receive={{ key: `${emoji}:a` }}>
			<Twemoji {emoji} />
		</span>
		<span class="absolute aspect-square w-full p-1.5" in:receive={{ key: `${emoji}:b` }}>
			<Twemoji {emoji} />
		</span>
	</span>
{/each}
