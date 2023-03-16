<script lang="ts">
	export let name = '',
		disabled = false,
		open = false;

	import CaretUp from 'carbon-icons-svelte/lib/CaretUp.svelte';
	import CaretDown from 'carbon-icons-svelte/lib/CaretDown.svelte';
	import {
		Accordion,
		AccordionItem,
		Button,
		Row
	} from 'carbon-components-svelte';
</script>

<div class="same-line">
	<!-- <Button
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
	</Button> -->
</div>

<!-- {#if open}
	<div class="slot">
		<slot name="content" />
	</div>
{/if} -->

	<slot name="head-before" />
<!-- <div class="same-line"> -->
	<AccordionItem
		bind:open
		bind:disabled
		title={name}
	>
		<div class="slot">
			<slot name="content" />
		</div>
	</AccordionItem>
<!-- </div>	 -->
	<slot name="head-after" />

<style lang="sass">
	@use '@carbon/layout'
	// .in_button
	// 	display: flex
	// 	flex-direction: row
	// 	column-gap: 1rem
	// 	align-items: center
	.same-line
		display: flex
		flex-direction: row
		align-items: center
		padding-bottom: layout.$spacing-03
	.slot
		padding-left: 1rem
</style>
