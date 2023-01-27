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

	import {
		Row,
		Button,
		ImageLoader,
		InlineLoading,
		InlineNotification
	} from 'carbon-components-svelte';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { Entry } from './types';
	import { onMount, createEventDispatcher } from 'svelte';
	import Options from './Options.svelte';
	import { create_blob } from '$lib/util';
	import { scale, parse_res } from '$lib/util/image/scale';
	import { Error } from 'carbon-icons-svelte';

	const dispatch = createEventDispatcher();

	const clear_error = () => {
		entry.error = undefined;
	};

	let open = true,
		thumbnail: string;

	onMount(() => {
		const img = new Image();
		img.src = window.URL.createObjectURL(entry.file);

		img.onload = () => {
			entry.options.width = img.naturalWidth;
			entry.options.height = img.naturalHeight;
			entry.width = entry.options.width;
			entry.height = entry.options.height;

			dispatch('img', [entry.width, entry.height]);

			entry.ratio =
				entry.options.width / entry.options.height;
		};

		const reader = new FileReader();
		reader.readAsArrayBuffer(entry.file);
		reader.onload = () => {
			if (!reader.result) return;
			if (typeof reader.result === 'string') {
				console.error(
					'reader.result is a string not an arraybuffer'
				);
				return;
			}
			entry.options.bytes = new Uint8Array(reader.result);

			scale({
				...entry.options,
				width: 48,
				height: 48
			}).then((res) => {
				let [bytes, _, type] = parse_res(res);
				let blob = create_blob(bytes, type);
				thumbnail = window.URL.createObjectURL(blob);
			});
		};
	});
</script>

<div class="entry">
	{#if entry.error}
		<InlineNotification
			kind="error"
			title={entry.error.error}
			subtitle={entry.error.date.toUTCString()}
		/>
	{/if}
	<div class="left">
		<Row>
			<div class="img">
				<ImageLoader src={thumbnail} alt="thumbnail for {entry.file.name}">
					<svelte:fragment slot="loading">
						<InlineLoading />
					</svelte:fragment>
					<svelte:fragment slot="error">
						<Error />
					</svelte:fragment>
				</ImageLoader>
				<!-- <img src={thumbnail} alt="" width="48" height="48" /> -->
			</div>
			<Button
				size="small"
				kind="ghost"
				on:click={() => (open = !open)}
				>{entry.file.name}</Button
			>
			<Button
				iconDescription="delete"
				on:click={() => dispatch('delete', entry.id)}
				icon={TrashCan}
			/>
		</Row>
	</div>
	{#if open}
		<Options
			on:input={clear_error}
			bind:options={entry.options}
			width={entry.width}
			height={entry.height}
			ratio={entry.ratio}
		/>
	{/if}
</div>

<style lang="sass">
	.left
		padding-left: 1rem
	.img
		max-block-size: 100%
		inline-size: auto
		display: flex
		align-items: center
		justify-content: center
	.entry
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
