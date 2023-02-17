<script lang="ts">
	// import { Todo } from '$lib/components';
	import {
		Link,
		TextInput,
		Button,
		ButtonSet,
		InlineLoading,
		Modal,
		NumberInput,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import Prompt from './Prompt.svelte';
	import { openai } from '$lib/openai';
	import type {
		CreateImageRequestSizeEnum,
		ImagesResponseDataInner
	} from 'openai';
	import { browser } from '$app/environment';

	let value = '',
		auto_download = true,
		previous = '',
		loading = false,
		src = '',
		srcs: ImagesResponseDataInner[] = [],
		n = 1,
		sizes: CreateImageRequestSizeEnum[] = [
			'1024x1024',
			'512x512',
			'256x256'
		],
		size: CreateImageRequestSizeEnum = sizes[0],
		open = false;

	export const download_from_url = (
		url: string,
		name: string = `DALLE2 result - ${value} - ${new Date().toUTCString()}`
	) => {
		if (!browser) return; // TODO-error
		const a = document.createElement('a');
		a.href = url;
		a.download = name;
		// a.click();
	};

	const _do = async () => {
		loading = true;
		previous = value;
		await openai
			.createImage({ prompt: value, n, size })
			.then((r) => {
				srcs = r.data.data;
				srcs.forEach((s) => {
					if (s.url) download_from_url(s.url);
				});
			})
			.catch(() => alert('error generating image'))
			.finally(() => (loading = false));
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
	<NumberInput
		label="Number of images to generate"
		min={1}
		max={10}
		bind:value={n}
	/>
	<Select labelText="Size" bind:selected={size}>
		{#each sizes as s}
			<SelectItem value={s} text={s} />
		{/each}
	</Select>
	<ButtonSet>
		<!-- <Button on:click={() => (open = true)}>Edit</Button> -->
		<Button size="small" on:click={_do}>Submit</Button>
	</ButtonSet>
	
	<br />
	<p>{previous}</p>
	{#if loading}
		<InlineLoading />
	{/if}
	
	{#if srcs?.length}
		<div class="imgs">
			{#each srcs as { url: src }}
				<div class="img">
					<img
						alt="last DallE2 generation result"
						{src}
						width={size.substring(0, size.indexOf('x'))}
						height={size.substring(0, size.indexOf('x'))}
					/>
				</div>
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
