<script lang="ts">
	import { LoadingButton } from '$lib/components';
	import { req } from '$lib/util';
	import { Button, InlineLoading, TextInput } from 'carbon-components-svelte';

	let value = '', loading=false;
	let response = '';
	const get = async () => {
		loading = true
		req<string>({ OpenAI: { Completion: value } })
			.then((r) => (response = r))
			.catch(() => alert('an error occured'))
			.finally(() => loading = false);
	};
</script>

<TextInput bind:value />
<LoadingButton disable {loading} on:click={get}>Do</LoadingButton>
{#if response}
	<p>{response}</p>
{/if}

