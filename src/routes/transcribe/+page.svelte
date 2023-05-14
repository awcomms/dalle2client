<script lang="ts">
	import FileUpload from '$lib/components/FileUpload.svelte';
	import { transcribe } from '$lib/util/transcribe';

	let result = '',
		loading = false;

	const act = async (
		e: CustomEvent
	) => {
		loading = true;
		await transcribe(e.detail[0])
			.then((r) => {
				result = r;
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				loading = false;
			});
	};
</script>

{#if loading}
	<p>loading...</p>
{:else}
	<p>{result}</p>
{/if}

<FileUpload on:change={act} />
