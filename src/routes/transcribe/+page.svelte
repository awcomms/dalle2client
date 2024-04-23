<script lang="ts">
	// import { PUBLIC_PYTHON_API_ENDPOINT } from '$env/static/public';
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { download_blob } from '$lib/util';
	// import { transcribe } from '$lib/util/transcribe';
	import axios from 'axios';
	import {
		Button,
		CopyButton,
		InlineLoading,
		RadioButton,
		RadioButtonGroup
	} from 'carbon-components-svelte';
	import type {
		Mode,
		Result as _Result,
		ValidMode
	} from './types';
	import Result from './Result.svelte';

	let text = '',
		file: File,
		history: _Result[] = [],
		show_history = false,
		modes: Mode[] = [
			{
				label:
					"Get the text from the file's audio",
				value: 'text'
			},
			{
				label:
					'Get an SRT (Subtitle) file',
				value: 'srt'
			},
			{
				label:
					'Get the file with subtitles added',
				value: 'subtitle'
			}
		],
		mode: ValidMode = modes[0].value,
		loading = false;

	const act = async (file: File) => {
		loading = true;
		if (!mode)
			return alert(
				'Please select an action'
			);
		const form = new FormData();
		form.append('file', file);
		await axios
			.post(
				"dssdsdfadsdfsasf",
				// PUBLIC_PYTHON_API_ENDPOINT,
				form,
				{
					headers: {
						'Content-Type':
							'multipart/form-data'
					},
					params: {
						mode
					},
					responseType:
						mode === 'text'
							? 'text'
							: 'blob'
				}
			)
			// await transcribe(e.detail[0])
			.then((r) => {
				console.log(r);
				switch (mode) {
					case 'text':
						history = [
							...history,
							{
								name: file.name,
								result_name:
									file.name.replace(
										/\.[^/.]+$/,
										`.txt`
									),
								text: r.data,
								blob: new Blob(
									[r.data],
									{
										type: 'text/plain'
									}
								)
							}
						];
						break;
					case 'srt':
						history = [
							...history,
							{
								name: file.name,
								result_name:
									file.name.replace(
										/\.[^/.]+$/,
										`.srt`
									),
								blob: new Blob(
									[r.data],
									{
										type: 'application/x-subrip'
									}
								)
							}
						];
						break;
					case 'subtitle':
						history = [
							...history,
							{
								name: file.name,
								result_name:
									file.name,
								blob: new Blob(
									[r.data],
									{
										type: file.type
									}
								)
							}
						];
						break;
				}
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				console.log('fin');
				loading = false;
			});
	};
</script>

<div class="column">
	{#if loading}
		<InlineLoading />
	{:else if history.length && history[0]}
		{#if history.length > 1}
			<Button
				on:click={() =>
					(show_history =
						!show_history)}
				>{show_history
					? `Hide this session's history`
					: `Show this session's history`}
			</Button>
		{/if}
		{#if show_history}
			<div class="column">
				{#each history as h}
					<Result entry={h} />
				{/each}
			</div>
		{/if}
		<Result entry={history[0]} />
	{/if}
	
	{#if file}
		<p>Uploaded file: {file.name}</p>
	{/if}
	
	<FileUpload
		label={file ? "Change file" : "Upload file"}
		on:change={({ detail }) => {
			file = detail[0];
		}}
	/>
	
	<RadioButtonGroup
		legendText="Action"
		bind:selected={mode}
	>
		{#each modes as m}
			<RadioButton
				labelText={m.label}
				value={m.value}
			/>
		{/each}
	</RadioButtonGroup>
	
	{#if file}
		<Button
			on:click={async () =>
				await act(file)}
			>Transcribe</Button
		>
	{/if}
</div>

<style lang="scss">
	.column {
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}
</style>
