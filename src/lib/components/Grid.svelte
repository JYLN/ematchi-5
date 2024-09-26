<script lang="ts">
	import GridCard from './GridCard.svelte';

	interface Props {
		grid: string[];
		onFoundPair(emoji: string): void;
		foundPairs: string[];
	}

	let { grid, onFoundPair, foundPairs }: Props = $props();
	let firstIndex = $state<number>(-1);
	let secondIndex = $state<number>(-1);
	let timeoutId = $state<ReturnType<typeof setTimeout>>();
</script>

{#each grid as emoji, i}
	<GridCard
		{emoji}
		onclick={() => {
			if (firstIndex > -1 && secondIndex > -1) {
				clearTimeout(timeoutId);
				firstIndex = i;
				secondIndex = -1;
			} else if (firstIndex > -1) {
				secondIndex = i;

				if (grid[firstIndex] === grid[secondIndex]) {
					onFoundPair(grid[firstIndex]);
				} else {
					timeoutId = setTimeout(() => {
						firstIndex = secondIndex = -1;
					}, 1000);
				}
			} else {
				firstIndex = i;
			}
		}}
		selected={firstIndex === i || secondIndex === i}
		found={foundPairs.includes(emoji)}
	/>
{/each}
