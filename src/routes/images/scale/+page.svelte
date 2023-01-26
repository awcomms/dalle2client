<script lang="ts">
	import {
		download_blob,
		average,
		create_blob
	} from '$lib/util';
	import type { Entry } from './types';
	import type { Options as _Options } from '$lib/util/image/scale';
	import FileImage from './Image.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import {
		Row,
		Column,
		Button,
		InlineLoading
	} from 'carbon-components-svelte';
	import JSZip from 'jszip';
	import { parse_res, scale } from '$lib/util/image/scale';
	import Options from './Options.svelte';

	let entries: Entry[] = [],
		next_id = 0,
		scaling = false,
		options: _Options = {
			width: 1,
			height: 1,
			exact: true,
			extension: '',
			filter_type: 'Nearest',
			bytes: new Uint8Array()
		},
		edit_for_all = false;

	const scale_all = async () => {
		let all = entries.map((e) => {
			let _e = e;
			_e.options = options;
			_e.options.bytes = e.options.bytes;
			return _e;
		});
		await act(all);
	};

	const get_res = (e: Entry): [Blob, string] => {
		if (!e.result) throw null;
		let [bytes, extension, type] = parse_res(e.result);
		return [
			create_blob(bytes, type),
			extension || e.options.extension
		];
	};

	const act = async (entries: Entry[]) => {
		scaling = true;
		if (!entries.length) return;
		let date = new Date().toUTCString();

		let to_download: Entry[] = [];

		for (let e of entries) {
			await scale(e.options)
				.then((r) => {
					e.result = r;
					to_download.push(e);
				})
				.catch((error) => {
					e.error = { error, date: new Date() };
					console.error(error);
				});
		}
		to_download = to_download.filter((e) => e.result);

		// let to_download = entries
		// 	.map((e) => {
		// 		return await scale(e.options)
		// 			.then((r) => {
		// 				e.result = r;
		// 				return e;
		// 			})
		// 			.catch((error) => {
		// 				e.error = { error, date: new Date() };
		// 				console.error(error);
		// 			});
		// 	})
		// 	.filter((e) => e && e.result);
		let zip = new JSZip();
		if (to_download.length > 1) {
			to_download.forEach((e) => {
				let [b, extension] = get_res(e);
				zip.file(`${e.name}.${extension}`, b);
			});
			zip.generateAsync({ type: 'blob' }).then((blob) => {
				download_blob(blob, `resize - ${date}.zip`);
			});
		} else {
			let e = to_download[0];
			if (!e) return;
			let [blob, extension] = get_res(e);
			download_blob(
				blob,
				`${e.file.name} - resize - ${date}.${extension}`
			);
		}
		scaling = false;
	};

	const del = (id: number) => {
		entries = entries.filter((e) => e.id !== id);
	};

	const change = ({
		detail: files
	}: {
		detail: FileList;
	}) => {
		console.log(files.length);
		for (let file of files) {
			let ext_dot_index = file.name.lastIndexOf('.');
			entries = [
				...entries,
				{
					id: next_id,
					name: file.name.substring(0, ext_dot_index),
					size: file.size,
					ratio: 1,
					width: 1,
					height: 1,
					file,
					options: {
						exact: false,
						width: 1,
						height: 1,
						extension: file.name.substring(
							ext_dot_index + 1
						),
						bytes: new Uint8Array(),
						filter_type: 'Nearest'
					}
				}
			];
			++next_id;
		}
		options.width = average(entries.map((e) => e.width));
		options.height = average(entries.map((e) => e.height));
		options.extension = entries[0].options.extension;
	};
</script>

<FileUpload on:change={change} multiple />

<div class="all">
	{#if entries.length > 2}
		<Button on:click={() => (edit_for_all = !edit_for_all)}
			>Edit options for all</Button
		>
	{/if}

	{#if edit_for_all && entries.length}
		<Options
			bind:options
			width={options.width}
			height={options.height}
			ratio={options.width / options.height}
		/>
		<Button on:click={scale_all}>Scale All</Button>
	{/if}

	<div class="entries">
		{#each entries as entry}
			<Row>
				<Column>
					<FileImage
						on:delete={({ detail: id }) => del(id)}
						bind:entry
					/>
				</Column>
			</Row>
		{/each}
	</div>

	{#if entries.length}
		<Button disabled={scaling} on:click={() => act(entries)}
			>Resize</Button
		>
		{#if scaling}
			<InlineLoading />
		{/if}
	{/if}
</div>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
	.entries
		display: flex
		flex-direction: column
		row-gap: 2rem
</style>
