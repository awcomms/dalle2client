<script lang="ts">
	// import { Todo } from '$lib/components';
	import {
		Button,
		ButtonSet,
		InlineLoading,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import Prompt from './Prompt.svelte';
	import axios from 'axios';
	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import { browser } from '$app/environment';
	import { notify } from '$lib/util/notify';
	import { get_openai } from '$lib/openai';
	import { OPENAI_API_KEY } from '$lib/store';
	import type { ImageGenerateParams, ImagesResponse } from 'openai/resources';

	let value = '',
		// auto_download = true,
		previous = '',
		loading = false,
		srcs: ImagesResponse['data'] =
			[],
		n = 1,
		sizes: ImageGenerateParams['size'][] =
			[
				'1024x1024',
				'1792x1024',
				'1024x1792',
				'512x512',
				'256x256'
			],
		size =
			sizes[0],
		open = false;

	export const download_from_url =
		async (
			url: string,
			name: string = `DALLE2 - ${value} - ${new Date().toUTCString()}`
		) => {
			if (!browser) return; // TODO-error
			const a =
				document.createElement('a');
			a.href = await fetch(url)
				.then((r) => r.blob())
				.then((b) =>
					URL.createObjectURL(b)
				);
			a.download = name;
			a.click();
		};

	const _do = async () => {
		loading = true;
		try {
			previous = value;
			const openai = get_openai($OPENAI_API_KEY)
			const r = await openai.images.generate(
				{
					prompt: value,
					n,
					size,
					model: 'dall-e-3',
					quality: 'hd',
					style: 'vivid'
				}
			);
			srcs = r.data;
			console.log(r.data)
			srcs.forEach(async (s) => {
				// if (s.url) await download_from_url(s.url);
			});
		} catch (e) {
			console.error('gen error', e);
			notify({
				kind: 'error',
				title: `An error occured while trying to generating the image${
					n === 1 ? '' : 's'
				}`
			});
		}

		loading = false;
	};
</script>

<!-- <Modal
	bind:open
	passiveModal
	hasForm
	modalHeading="Edit generation prompt"
>
</Modal> -->
<div class="all">
	<Prompt bind:value />
	<!-- <NumberInput
		label="Number of images to generate"
		min={1}
		max={10}
		bind:value={n}
	/> -->
	<Select
		labelText="Number of images to generate"
		bind:selected={n}
	>
		{#each Array(10) as s, i}
			<SelectItem
				value={i + 1}
				text={String(i + 1)}
			/>
		{/each}
	</Select>
	<Select
		labelText="Size"
		bind:selected={size}
	>
		{#each sizes as s}
			<SelectItem
				value={s}
				text={s}
			/>
		{/each}
	</Select>
	<ButtonSet>
		<!-- <Button on:click={() => (open = true)}>Edit</Button> -->
		<Button
			size="small"
			icon={loading
				? InlineLoading
				: Send}
			on:click={_do}>Create</Button
		>
	</ButtonSet>

	<br />
	<p>{previous}</p>

	{#if srcs?.length}
		<div class="imgs">
			{#each srcs as { url: src }}
				{#if src && size}
					<div class="img">
						<img
							alt="last DallE2 generation result"
							{src}
							width={size.substring(
								0,
								size.indexOf('x')
							)}
							height={size.substring(
								0,
								size.indexOf('x')
							)}
						/>
						<!-- <Button
							on:click={() =>
								download_from_url(
									src,
									`DALL·E generation - ${value} - ${new Date().toUTCString()}`
								)}>Download</Button
						> -->
					</div>
				{/if}
			{/each}
		</div>
	{/if}
</div>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
	.imgs
		display: flex
		flex-direction: row
		flex-wrap: wrap
	.img
		width: 10rem
		height: 10rem
	img
		max-inline-size: 100%
		block-size: auto
</style>
