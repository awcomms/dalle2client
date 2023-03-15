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
	<div class="card">
		<p class="name">{name}</p>
		<p class="value">{value}</p>
	</div>
{/if}

<style lang="sass">
	@use '@carbon/colors'

	.card
		display: flex
		flex-direction: column
		row-gap: 0.111rem
		background-color: colors.$gray-90
		padding: 1rem

	.name

</style>