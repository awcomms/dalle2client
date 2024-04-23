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
	import FileUpload from '../FileUpload.svelte';
	import { onMount } from 'svelte';
	import { get_openai } from '$lib/openai';
	import { OPENAI_API_KEY } from '$lib/store';
	import type { ImageEditParams, ImagesResponse } from 'openai/resources/images.mjs';

	onMount(() => {
		let l = canvas.getContext('2d');
		if (l) ctx = l;

		ctx.fillStyle = 'rgba(0,0,0,0)';

		canvas.onmousedown = (e) => {
			drawing = true;
			ctx.beginPath();
		};

		canvas.onmousemove = (e) => {
			if (drawing) {
				ctx.lineTo(
					e.offsetX,
					e.offsetY
				);
				ctx.stroke();
			}
		};

		canvas.onmouseup = (e) => {
			if (drawing) {
				ctx.lineTo(
					e.offsetX,
					e.offsetY
				);
				ctx.stroke();
				ctx.closePath();
				drawing = false;
			}
		};

		canvas.onmouseout = (e) => {
			drawing = false;
		};
	});

	let value = '',
		image: File,
		canvas: HTMLCanvasElement,
		img: HTMLImageElement,
		drawing = false,
		mask_image,
		ctx: CanvasRenderingContext2D,
		// auto_download = true,
		previous = '',
		loading = false,
		srcs: ImagesResponse['data'] = [],
		n = 1,
		sizes: ImageEditParams['size'][] = [
			'1024x1024',
			'512x512',
			'256x256'
		],
		size = sizes[0],
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
		try {
			loading = true;
			previous = value;
			ctx.fill();
			const openai = get_openai(
				$OPENAI_API_KEY
			);
			const canvas_blob: Blob = await new Promise((resolve, reject) => {
				canvas.toBlob(blob => {
					if (blob){ resolve(blob)} else {reject(new Error('Converting mask canvas to file failed'))}
				}, 'image/png')
			})
			const res = await openai.images.edit(
				{
					image,
					mask: new File([canvas_blob], 'mask', {type: 'image/png'}),
					n,
					size,
					prompt: value
				}
			);
			srcs = res.data;
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

	const use_image = ({ detail }: {detail: File[]}) => {
		image = detail[0];
		img.src =
			window.URL.createObjectURL(
				image
			);
		img.onload = (e) => {
			canvas.width =
				img.naturalWidth;
			canvas.height =
				img.naturalHeight;
		};
	};
</script>

<canvas bind:this={canvas}></canvas>

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
			on:click={_do}>Edit</Button
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

	<FileUpload
		label="Upload image to edit"
		on:change={use_image}
	/>

	<div class="draw_mask">
		<img
			class="draw"
			bind:this={img}
			alt="Uploaded to be edited"
		/>
		<canvas
			class="draw"
			bind:this={canvas}
		/>
	</div>
</div>

<style lang="sass">
    .draw_mask
        position: relative
    .draw
        position: absolute
        top: 0
        bottom: 0
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
