<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		emoji: string;
		class?: HTMLImageElement['className'];
	}

	let { emoji, class: className }: Props = $props();
	let emojiSrc: string = $state('');

	function getEmojiUnicode(emoji: string) {
		return [...emoji].map((char) => char.codePointAt(0)!.toString(16)).join('-');
	}

	$effect(() => {
		emojiSrc = `/twemoji/${getEmojiUnicode(emoji)}.svg`;
	});
</script>

<img class={cn('pointer-events-none', className)} alt={emoji} src={emojiSrc} />
