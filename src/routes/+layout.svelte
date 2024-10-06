<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>ematchi</title>
</svelte:head>

{@render children()}
