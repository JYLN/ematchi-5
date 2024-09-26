<script lang="ts">
	import { levels, type Level } from '$lib/levels';
	import { shuffle } from '$lib/utils';
	import Grid from './Grid.svelte';

	const level = levels[0];

	let size = $state<number>(4);
	let grid = $state<string[]>(createGrid(level));
	let foundPairs = $state<string[]>([]);

	function createGrid({ emojis, size }: Level) {
		const copy = emojis.slice();
		const pairs = new Array(size ** 2 / 2);

		for (let i = 0; i < pairs.length; i++) {
			const index = ~~(Math.random() * copy.length);
			pairs[i] = copy.splice(index, 1)[0];
		}

		return shuffle([...pairs, ...pairs]);
	}

	function onFoundPair(emoji: string) {
		foundPairs.push(emoji);
	}
</script>

<main class="flex h-full flex-col items-center justify-center" style="--size: {size}">
	<!-- TODO: Add game info (pairs/moves/countdown) -->

	<section
		class="grid aspect-square w-[30rem] grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-1.5 2xl:w-[40rem]"
	>
		<Grid {grid} {onFoundPair} {foundPairs} />
	</section>

	<!-- TODO: Add found pairs display -->
</main>
