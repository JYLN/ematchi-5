<script lang="ts">
	import '@fontsource/poppins';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>ematchi</title>
</svelte:head>

{@render children()}
