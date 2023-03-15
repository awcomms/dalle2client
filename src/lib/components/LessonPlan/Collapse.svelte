<script lang="ts">
	export let name = '',
		open = false;

	import CaretUp from 'carbon-icons-svelte/lib/CaretUp.svelte';
	import CaretDown from 'carbon-icons-svelte/lib/CaretDown.svelte';
	import { Button } from 'carbon-components-svelte';
</script>

<div class="same-line">
	<slot name="head-before" />
	<Button
		size="small"
		on:click={() => (open = !open)}
		class="same-line"
	>
		<div class="in_button">
			{#if open}
	<CaretUp />
			{:else}
	<CaretDown />
			{/if}
			<p>{name}</p>
		</div>
	</Button>
	<slot name="head-after" />
</div>

{#if open}
	<div class="slot">
		<slot name="content" />
	</div>
{/if}

<style lang="sass">
	.in_button
		display: flex
		flex-direction: row
		column-gap: 1rem
		align-items: center
	.same-line
		display: flex
		flex-direction: row
		align-items: center
	.slot
		padding-left: 1rem
</style>
