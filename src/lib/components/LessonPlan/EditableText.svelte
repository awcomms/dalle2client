<script>
	export let name = '',
		editing = false,
		value = '';

	import { TextInput } from 'carbon-components-svelte';
</script>

{#if editing}
	<TextInput
		size="sm"
		labelText={name}
		bind:value
	/>
{:else}
	<p>{name}: {value}</p>
{/if}