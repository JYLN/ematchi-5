<script lang="ts">
	import { send } from '$lib/transitions';
	import { cn } from '$lib/utils';
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
		class="relative aspect-square w-full transition-transform duration-500 transform-3d"
		class:rotate-y-180={selected || found}
	>
		<div
			class="absolute flex aspect-square w-full translate-z-0 items-center justify-center rounded-lg bg-zinc-200 will-change-transform backface-hidden dark:bg-zinc-500"
		></div>
		<div
			class={cn(
				'absolute flex aspect-square w-full rotate-y-180 items-center justify-center rounded-lg border-2 border-emerald-500 bg-zinc-50 transition-colors duration-500 will-change-transform backface-hidden dark:bg-zinc-700',
				found && 'border-zinc-200 dark:border-zinc-500'
			)}
		>
			{#if !found}
				<span class="w-1/3" out:send={{ key: `${emoji}:${group}` }}>
					<Twemoji {emoji} />
				</span>
			{/if}
		</div>
	</div>
</button>
