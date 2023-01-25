<script lang="ts">
	/**
	 * option: guess extension
	 * switch: open - to show details
	 * option: keep proportion
	 * option: exact
	 *
	 * on wf or hf change, change other by other * ratio
	 * button for both height and width to ratio to other
	 */
	export let entry: Entry;

	import { Button, ToastNotification } from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { Entry } from './types';
	import { onMount, createEventDispatcher } from 'svelte';
	import Options from './Options.svelte';

	const dispatch = createEventDispatcher();

	const clear_error = () => {
		entry.error = undefined;
	};

	let open = false;

	onMount(() => {
		const img = new Image();
		img.src = window.URL.createObjectURL(entry.file);

		img.onload = () => {
			entry.options.width = img.naturalWidth;
			entry.options.height = img.naturalHeight;
			entry.width = entry.options.width;
			entry.height = entry.options.height;

			dispatch('img', [entry.width, entry.height])

			entry.ratio = entry.options.width / entry.options.height;
		};

		const reader = new FileReader();
		reader.readAsArrayBuffer(entry.file);
		reader.onload = () => {
			if (!reader.result) return;
			if (typeof reader.result === 'string') {
				console.error('reader.result is a string not an arraybuffer');
				return;
			}
			entry.options.bytes = new Uint8Array(reader.result);
		};
	});
</script>

<div>
	{#if entry.error}
		<ToastNotification
			fullWidth
			kind="error"
			title={entry.error.error}
			caption={entry.error.date.toUTCString()}
		/>
	{/if}

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
				<Options
					on:input={clear_error}
					bind:options={entry.options}
					width={entry.width}
					height={entry.height}
					ratio={entry.ratio}
				/>
			</div>
		{/if}
	</div>
</div>

<style lang="sass">
	.details
		margin-left: 0.37rem
	.entry
		display: flex
		flex-direction: column
		row-gap: .37rem
</style>
