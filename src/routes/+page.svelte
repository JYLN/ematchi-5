<script lang="ts">
	import Game from '$lib/components/Game.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
	import { levels } from '$lib/levels';
	import { confetti } from '@neoconfetti/svelte';

	let gameState: 'waiting' | 'playing' | 'paused' | 'lost' | 'won' = $state('waiting');
	let gameInstance: ReturnType<typeof Game>;

	function onPlay() {
		gameState = 'playing';
	}

	function onPause() {
		gameState = 'paused';
	}

	function onWin() {
		gameState = 'won';
	}

	function onLose() {
		gameState = 'lost';
	}
</script>

<div class="absolute right-0 top-0 z-50 p-4">
	<ThemeButton />
</div>

<Game bind:this={gameInstance} {onPlay} {onPause} {onWin} {onLose} />

{#if gameState !== 'playing'}
	<Modal>
		<header class="mb-8">
			<h1 class="text-9xl">e<span class="text-emerald-500">match</span>i</h1>
			<p class="text-3xl">the Svelte matching game</p>
		</header>

		{#if gameState === 'won'}
			<div
				class="absolute -top-56 left-1/2"
				use:confetti={{
					stageHeight: innerHeight,
					stageWidth: innerWidth,
					particleShape: 'rectangles',
					colors: [
						'var(--confetti-1)',
						'var(--confetti-2)',
						'var(--confetti-3)',
						'var(--confetti-4)',
						'var(--confetti-5)'
					]
				}}
			></div>
		{/if}

		<div class="mb-2">
			{#if gameState === 'won' || gameState === 'lost'}
				<p>you {gameState}! play again?</p>
			{:else if gameState === 'paused'}
				<p>game paused</p>
			{:else}
				<p>choose a level:</p>
			{/if}
		</div>

		<div class="flex justify-center gap-1">
			{#if gameState === 'paused'}
				<button
					onclick={() => gameInstance.resume()}
					class="rounded-lg bg-emerald-500 p-4 text-zinc-50"
				>
					resume
				</button>
				<button
					onclick={() => (gameState = 'waiting')}
					class="rounded-lg bg-emerald-500 p-4 text-zinc-50"
				>
					quit
				</button>
			{:else}
				{#each levels as level}
					<button
						onclick={() => {
							gameInstance.start(level);
						}}
						class="rounded-lg bg-emerald-500 p-4 text-zinc-50"
					>
						{level.label}
					</button>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}
