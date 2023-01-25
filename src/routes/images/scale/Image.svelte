<script lang="ts">
	/**
	 * option: guess extension
	 * switch: open - to show details
	 * option: keep proportion
	 * option: exact
	 */
	export let entry: Entry;

	import { Button, NumberInput, Select, SelectItem } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { Entry } from './types';
	import { onMount, createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const base_width = entry.options.width;
	const base_height = entry.options.height;

	$: change_by_factor(factor)

	let filter_types = ['Nearest', 'Triangle', 'CatmullRom', 'Gaussian', 'Lanczos3'],
		open = false, factor = 1;

	const change_by_factor = (f: number) => {
		entry.options.width = base_width * f;
		entry.options.height = base_height * f;
	}

	onMount(() => {
		const img = new Image();
		img.src = window.URL.createObjectURL(entry.file);

		img.onload = () => {
			entry.options.width = img.naturalWidth;
			entry.options.height = img.naturalHeight;
			console.log(entry.options.width, entry.options.height);
		};

		const reader = new FileReader();
		reader.readAsArrayBuffer(entry.file);
		reader.onload = () => {
			if (!reader.result) return;
			if (typeof reader.result === 'string') {
				console.log('reader.result is a string not an arraybuffer');
				return;
			}
			entry.options.bytes = new Uint8Array(reader.result);
		};
	});
</script>

{#if entry.options}
	<div class="entry">
		<div class="line">
			<Button size="small" kind="ghost" on:click={() => (open = !open)}>{entry.file.name}</Button>
			<Button
				iconDescription="delete"
				on:click={() => dispatch('delete', entry.id)}
				icon={TrashCan}
			/>
		</div>
		{#if open}
			<div class="details">
				<p>{entry.options.extension}</p>
				<p>{entry.size} bytes</p>
				<NumberInput size="sm" label="factor" bind:value={factor} />
				<NumberInput size="sm" label="width" bind:value={entry.options.width} />
				<NumberInput size="sm" label="height" bind:value={entry.options.height} />
				<Select bind:selected={entry.options.filter_type}>
					{#each filter_types as ft}
						<SelectItem value={ft} text={ft} />
					{/each}
				</Select>
			</div>
		{/if}
	</div>
{/if}

<style lang="sass">
	.details
		margin-left: 0.37rem
	.entry
		display: flex
		flex-direction: column
		row-gap: .37rem
</style>
