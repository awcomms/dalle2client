<script lang="ts">
	import { download_blob, average } from '$lib/util';
	import type { Entry, Options as _Options } from './types';
	import FileImage from './Image.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Button } from 'carbon-components-svelte';
	import JSZip from 'jszip';
	import { scale, get_filter_type } from 'scale-image';
	import { dev } from '$app/environment';
	import Options from './Options.svelte';

	let entries: Entry[] = [],
		next_id: number = 0,
		options: _Options = {
			width: 1,
			height: 1,
			exact: true,
			extension: '',
			filter_type: 'Nearest',
			bytes: new Uint8Array()
		},
		edit_for_all = false;

	const scale_all = () => {
		let all = entries.map((e) => {
			let _e = e;
			_e.options = options;
			_e.options.bytes = e.options.bytes;
			return _e;
		});
		act(all);
	};

	const get_res = (e: Entry): [Blob, string] => {
		if (!e.result) throw null;
		let blob_options = {};
		if (e.result.mime_type) {
			blob_options.mime_type = e.result.mime_type;
		}
		let extension = e.result.extension || e.options.extension;
		return [new Blob([e.result.bytes], blob_options), extension];
	};

	const act = async (entries: Entry[]) => {
		if (!entries.length) return;
		let date = new Date().toUTCString();

		entries.forEach((e) => {
			try {
				let filter_type;
				try {
					filter_type = get_filter_type(e.options.filter_type);
				} catch (error) {
					e.error = { error, date: new Date() };
					console.log(error);
					return;
				}
				e.result = scale(
					e.options.width,
					e.options.height,
					e.options.exact,
					e.options.bytes,
					e.options.extension,
					filter_type
				);
			} catch (error) {
				e.error = { error, date: new Date() };
				console.error(error);
			}
		});
		let to_download = entries.filter((e) => e.result);
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
			download_blob(blob, `${e.file.name} - resize - ${date}.${extension}`);
		}
	};

	const del = (id: number) => {
		entries = entries.filter((e) => e.id !== id);
	};

	const change = ({ detail: files }: { detail: FileList }) => {
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
						extension: file.name.substring(ext_dot_index + 1),
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

{#if entries.length}
	<Button on:click={() => (edit_for_all = !edit_for_all)}>Edit for all</Button>
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
		<FileImage on:delete={({ detail: id }) => del(id)} bind:entry />
	{/each}
</div>

{#if entries.length}
	<Button on:click={() => act(entries)}>Resize</Button>
{/if}

<style lang="sass">
	.entries
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>
