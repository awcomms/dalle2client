<script lang="ts">
	interface Item {
		id: number;
		value: string;
	}
	export let name: string = '',
		editing = false,
		items: Array<Item> = [];

	let current_id = 0;

	const id = () => {
		++current_id;
		return current_id;
	};

	let open = false;

	export let button_kind:
		| 'ghost'
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'danger'
		| 'danger-tertiary'
		| 'danger-ghost'
		| undefined = 'ghost';

	import Add from 'carbon-icons-svelte/lib/Add.svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import { Collapse } from '$lib/components/LessonPlan';
	import {
		Row,
		Column,
		TextInput,
		Button
	} from 'carbon-components-svelte';

	const add = () => {
		console.log(current_id);
		items.push({
			id: id(),
			value: ''
		});
		console.log(current_id, items);
		items = items;
		open = true;
	};

	const del = (id: number) => {
		items = items.filter(
			(l) => l.id !== id
		);
		if (items.length === 0)
			open = false;
	};
</script>

<Collapse bind:open {name}>
	<div slot="head-before">
		{#if editing}
			<Button
				kind={button_kind}
				size="small"
				on:click={add}
				icon={Add}
			/>
		{/if}
	</div>
	<div slot="content">
		{#if items.length === 0}
			<p class="item">No items</p>
		{:else}
			<div class="items">
				{#each items as { value, id } (id)}
					<div class="item">
						<Row>
							{#if editing}
								<TextInput
									bind:value
									labelText="{name} {id}"
								/>
								<Button
									kind={button_kind}
									size="field"
									on:click={() =>
										del(id)}
									icon={TrashCan}
								/>
							{:else}
								<p
									class="style"
								>
									{value}
								</p>
							{/if}
						</Row>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</Collapse>

<style lang="sass">
	@use '@carbon/colors'
	.items
		padding: .3rem 0
		display: flex
		flex-direction: column
		row-gap: .3rem
	.style
		background-color: colors.$gray-70
		padding: .3rem
		max-width: 100%
		// overflow-wrap: anywhere
		word-break: break-all
	.item
		margin-left: 3rem
</style>
