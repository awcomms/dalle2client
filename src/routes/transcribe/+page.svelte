<script lang="ts">
	import FileUpload from '$lib/components/FileUpload.svelte';
	// import { transcribe } from '$lib/util/transcribe';
	import axios from 'axios';
	import { CopyButton } from 'carbon-components-svelte';

	let text = '',
		loading = false;

	const act = async (
		e: CustomEvent
	) => {
		loading = true;
		const form = new FormData();
		form.append('file', e.detail[0]);
		await axios
			.post(
				'http://localhost:3000',
				// 'https://transcribe-eosin.vercel.app',
				form,
				{
					headers: {
						'Content-Type':
							'multipart/form-data'
					},
					params: {
						mode: 'text'
					}
				}
			)
			// await transcribe(e.detail[0])
			.then((r) => {
				console.log(r);
				text = r.data;
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				console.log('fin')
				loading = false;
			});
	};
</script>

{#if loading}
	<p>loading...</p>
{:else}
	<div>
		{text}
		<CopyButton {text} />
	</div>
{/if}

<FileUpload on:change={act} />
