<script lang="ts">
	export let data;
	fetch = data.fetch;

	import { download_blob } from '$lib/util';
	import type { Entry, Resized } from './types';
	import FileImage from './Image.svelte';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { Button } from 'carbon-components-svelte';
	import JSZip from 'jszip';
	import { scale, get_filter_type, FilterType } from 'si';

	let entries: Entry[] = [],
		next_id: number = 0;

	const act = async () => {
		if (!entries.length) return;
		let date = new Date().toUTCString();
		console.log(entries.length);

		entries.forEach((e) => {
			try {
				let filter_type;
				try {
					filter_type = get_filter_type(e.options.filter_type);
				} catch (error) {
					console.log(error);
					return
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
				console.error(error);
			}
		});
		console.log('done');
		let zip = new JSZip();
		if (entries.length > 1) {
			let extension = e.result.extension || e.options.extension;
			entries.forEach((e) => {
				if (!e.result) return;
				let blob_options = {};
				if (e.result.mime_type) {
					blob_options.mime_type = e.result.mime_type;
				}
				zip.file(e.file.name, new Blob([e.result.bytes], blob_options));
			});
			zip.generateAsync({ type: 'blob' }).then((blob) => {
				download_blob(blob, `resize - ${date}.zip.${extension}`);
			});
		} else {
			let entry = entries[0];
			if (!entry.result) return;
			console.log(entry.result);
			console.log(entry.options.bytes);
			console.log(entry.result.bytes);
			console.log(entry.options.bytes === entry.result.bytes);
			let blob_options = {};
			if (entry.result.mime_type) {
				blob_options.mime_type = entry.result.mime_type;
			}
			let extension = entry.result.extension; //|| entry.options.extension
			download_blob(
				new Blob([entry.result.bytes], blob_options),
				`${entries[0].file.name} - resize - ${date}.${extension}`
			);
		}
	};

	const del = (id: number) => {
		console.log(id);
		entries = entries.filter((e) => e.id !== id);
	};

	const change = ({ detail: files }: { detail: FileList }) => {
		for (let file of files) {
			entries = [
				...entries,
				{
					id: next_id,
					size: file.size,
					file,
					options: {
						exact: false,
						width: 0,
						height: 0,
						extension: file.name.substring(file.name.lastIndexOf('.') + 1),
						bytes: new Uint8Array(),
						filter_type: 'Nearest'
					}
				}
			];
			++next_id;
		}
	};
</script>

<FileUpload on:change={change} multiple />

{#each entries as entry}
	<FileImage on:delete={({ detail: id }) => del(id)} bind:entry />
{/each}

{#if entries.length}
	<Button on:click={act}>Resize</Button>
{/if}
