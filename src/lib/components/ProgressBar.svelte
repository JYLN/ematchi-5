<script lang="ts">
	import { cn } from '$lib/utils';
	import { tweened } from 'svelte/motion';

	interface Props {
		value: number;
		max: number;
		class?: HTMLDivElement['className'];
		bgColor: string;
		fgColor: string;
		tweened?: boolean;
	}

	let { value, max, class: className, bgColor, fgColor, tweened: checkTweened }: Props = $props();
	let tweenedValue = tweened(value, {
		delay: 200,
		duration: 300
	});

	$effect(() => {
		if (checkTweened) {
			tweenedValue.set(value / max);
		}
	});
</script>

<div
	class={cn('flex h-2 w-full overflow-hidden rounded-full', bgColor, className)}
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin="0"
	aria-valuemax={max}
>
	<div
		class={cn('flex flex-col justify-center overflow-hidden rounded-full', fgColor)}
		style="width: {(checkTweened ? $tweenedValue : value / max) * 100}%"
	></div>
</div>
