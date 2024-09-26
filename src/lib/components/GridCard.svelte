<script lang="ts">
	import { send } from '$lib/transitions';
	import Twemoji from './Twemoji.svelte';

	interface Props {
		emoji: string;
		onclick: () => void;
		selected: boolean;
		found: boolean;
		group: 'a' | 'b';
	}

	let { emoji, onclick, selected, found, group }: Props = $props();
</script>

<button
	class="aspect-square w-full disabled:cursor-not-allowed"
	{onclick}
	disabled={selected || found}
>
	<div
		class="relative aspect-square w-full transition-transform duration-500 preserve-3d"
		class:rotate-y-180={selected || found}
	>
		<div
			class="absolute flex aspect-square w-full items-center justify-center rounded-xl bg-zinc-200 backface-hidden"
		></div>
		<div
			class="absolute flex aspect-square w-full items-center justify-center rounded-xl border-2 border-emerald-500 bg-zinc-50 transition-colors duration-500 backface-hidden rotate-y-180"
			class:border-zinc-200={found}
		>
			{#if !found}
				<span class="w-1/3" out:send={{ key: `${emoji}:${group}` }}>
					<Twemoji {emoji} />
				</span>
			{/if}
		</div>
	</div>
</button>
