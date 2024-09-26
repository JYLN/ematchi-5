<script lang="ts">
	import { type Level } from '$lib/levels';
	import { shuffle } from '$lib/utils';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import Info from './Info.svelte';

	interface Props {
		onPlay(): void;
		onPause(): void;
		onWin(): void;
		onLose(): void;
	}

	let { onPlay, onPause, onWin, onLose }: Props = $props();
	let size = $state<number>(0);
	let grid = $state<string[]>([]);
	let foundPairs = $state<string[]>([]);
	let currentMatches = $derived<number>(foundPairs.length);
	let totalMatches = $derived<number>(size ** 2 / 2);
	let totalMoves = $state<number>(0);
	let remaining = $state<number>(0);
	let duration = $state<number>(0);
	let playing = $state<boolean>(false);
	let showInfo = $state<boolean>(false);

	export function start(level: Level) {
		size = level.size;
		remaining = duration = level.duration;
		grid = createGrid(level);
		foundPairs = [];
		totalMoves = 0;

		resume();
	}

	export function resume() {
		playing = true;
		showInfo = true;
		countdown();

		onPlay();
	}

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
				showInfo = false;
				onLose();
			}
		}

		loop();
	}

	function onFoundPair(emoji: string) {
		foundPairs.push(emoji);

		if (foundPairs.length === totalMatches) {
			playing = false;
			setTimeout(() => {
				showInfo = false;
				onWin();
			}, 1500);
		}
	}

	function onMove() {
		totalMoves++;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (playing && event.key === 'Escape') {
			playing = false;
			onPause();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<main class="flex h-full flex-col items-center justify-center" style="--size: {size}">
	<section
		class="grid h-24 w-[30rem] grid-cols-2 grid-rows-[75%_1fr] gap-2 font-poppins 2xl:w-[40rem]"
	>
		{#if showInfo}
			<Info {currentMatches} {totalMatches} {totalMoves} {remaining} {duration} />
		{/if}
	</section>

	<section
		class="grid aspect-square w-[30rem] grid-cols-[repeat(var(--size),1fr)] grid-rows-[repeat(var(--size),1fr)] gap-1.5 2xl:w-[40rem]"
	>
		<Grid {grid} {foundPairs} {onFoundPair} {onMove} />
	</section>

	<section
		class="flex min-h-20 w-[30rem] flex-wrap items-center justify-center gap-1 py-2 transition-height duration-200 ease-in-out 2xl:w-[40rem]"
	>
		<Found {foundPairs} />
	</section>
</main>

{#if playing}
	<footer class="absolute bottom-0 w-full pb-2 text-center">
		<span class="text-xs text-zinc-700 dark:text-zinc-50">
			Press
			<kbd
				class="inline-flex items-center justify-center rounded-md border border-zinc-500 bg-zinc-50 px-1 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-600 dark:text-zinc-50"
				>Esc</kbd
			>
			to pause
		</span>
	</footer>
{/if}
