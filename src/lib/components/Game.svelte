<script lang="ts">
	import { levels, type Level } from '$lib/levels';
	import { shuffle } from '$lib/utils';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import Info from './Info.svelte';

	const level = levels[0];

	let size = $state<number>(level.size);
	let grid = $state<string[]>(createGrid(level));
	let foundPairs = $state<string[]>([]);
	let currentMatches = $derived<number>(foundPairs.length);
	let totalMatches = $derived<number>(level.size ** 2 / 2);
	let totalMoves = $state<number>(0);
	let remaining = $state<number>(level.duration);
	let duration = $state<number>(level.duration);
	let playing = $state<boolean>(false);

	function createGrid({ emojis, size }: Level) {
		const copy = emojis.slice();
		const pairs = new Array(size ** 2 / 2);

		for (let i = 0; i < pairs.length; i++) {
			const index = ~~(Math.random() * copy.length);
			pairs[i] = copy.splice(index, 1)[0];
		}

		return shuffle([...pairs, ...pairs]);
	}

	function countdown() {
		const start = Date.now();
		const remainingAtStart = remaining;

		function loop() {
			if (!playing) return;

			requestAnimationFrame(loop);

			remaining = remainingAtStart - (Date.now() - start);

			if (remaining <= 0) {
				playing = false;
			}
		}

		loop();
	}

	function onFoundPair(emoji: string) {
		foundPairs.push(emoji);
	}

	function onMove() {
		totalMoves++;
	}
</script>

<main class="flex h-full flex-col items-center justify-center" style="--size: {size}">
	<section
		class="grid h-24 w-[30rem] grid-cols-2 grid-rows-[75%_1fr] gap-2 font-poppins 2xl:w-[40rem]"
	>
		<Info {currentMatches} {totalMatches} {totalMoves} {remaining} {duration} />
	</section>

	<section
		class="grid aspect-square w-[30rem] grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-1.5 2xl:w-[40rem]"
	>
		<Grid {grid} {foundPairs} {onFoundPair} {onMove} />
	</section>

	<!-- TODO: Add found pairs display -->
	<section
		class="flex min-h-20 w-[30rem] flex-wrap items-center justify-center gap-1 py-2 transition-height duration-200 ease-in-out 2xl:w-[40rem]"
	>
		<Found {foundPairs} />
	</section>
</main>
