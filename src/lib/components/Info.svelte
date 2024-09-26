<script lang="ts">
	import ProgressBar from './ProgressBar.svelte';

	interface Props {
		currentMatches: number;
		totalMatches: number;
		totalMoves: number;
		remaining: number;
		duration: number;
	}

	let { currentMatches, totalMatches, totalMoves, remaining, duration }: Props = $props();
</script>

<!-- Pairs Matched -->
<article class="rounded-lg bg-zinc-200 p-4 text-zinc-500 dark:bg-zinc-500 dark:text-zinc-200">
	<ProgressBar
		value={currentMatches}
		max={totalMatches}
		class="mb-1"
		bgColor="bg-zinc-300 dark:bg-zinc-600"
		fgColor="bg-zinc-600 dark:bg-zinc-300"
		tweened
	/>
	<div class="flex items-end justify-between">
		<h2>Pairs Matched</h2>
		<span class="text-xl font-bold">
			<span class="text-2xl">{currentMatches}</span> / {totalMatches}
		</span>
	</div>
</article>

<!-- Total Moves -->
<article class="rounded-lg bg-zinc-200 p-4 text-zinc-500 dark:bg-zinc-500 dark:text-zinc-200">
	<div class="mb-1 h-2"></div>
	<div class="flex items-end justify-between">
		<h2>Total Moves</h2>
		<span class="text-2xl font-bold">{totalMoves}</span>
	</div>
</article>

<!-- Countdown -->
<div class="col-span-2">
	<ProgressBar
		value={remaining}
		max={duration}
		bgColor="bg-zinc-200 dark:bg-zinc-500"
		fgColor="bg-zinc-500 dark:bg-zinc-300"
	/>
</div>
