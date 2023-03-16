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
		<div class="card_inner">
			<p class="name">{name}</p>
			<p class="value">{value}</p>
		</div>
	</div>
{/if}

<style lang="sass">
	@use '@carbon/colors'
	@use '@carbon/themes'
	@use '@carbon/type'
	@use '@carbon/layout'

	.card
		display: flex
		flex-direction: column
		justify-content: center
		background-color: colors.$gray-90
		height: layout.$spacing-10
		padding: .8125rem layout.$spacing-05

	.card_inner
		display: flex
		flex-direction: column

	.name
		@include type.type-style('label-01')
		color: themes.$text-secondary
		padding-bottom: layout.$spacing-02

	.value
		@include type.type-style('body-compact-01')
</style>
