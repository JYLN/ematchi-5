<script lang="ts">
	import GridCard from './GridCard.svelte';

	interface Props {
		grid: string[];
		foundPairs: string[];
		onFoundPair(emoji: string): void;
		onMove(): void;
	}

	let { grid, foundPairs, onFoundPair, onMove }: Props = $props();
	let firstIndex: number = $state(-1);
	let secondIndex: number = $state(-1);
	let timeoutId = $state() as ReturnType<typeof setTimeout>;
</script>

{#each grid as emoji, i}
	<GridCard
		{emoji}
		onclick={() => {
			onMove();
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
		group={i === grid.indexOf(emoji) ? 'a' : 'b'}
	/>
{/each}
