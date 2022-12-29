<script lang="ts">
	import { LoadingButton } from '$lib/components';
	import { req } from '$lib/util';
	import { Button, InlineLoading, TextInput } from 'carbon-components-svelte';

	let value = '',
		loading = false,
		responses: string[] = [];
	const get = async () => {
		loading = true;
		req<string>({ OpenAI: { Completion: value } })
			.then((r) => {
				responses.push(r);
				responses = responses;
			})
			.catch((e) => {
				console.log(e);
				alert('an error occured');
			})
			.finally(() => (loading = false));
	};
</script>

<TextInput bind:value />
<LoadingButton disable {loading} on:click={get}>Do</LoadingButton>
{#if responses.length > 1}
	<div class="all">
		{#each responses as response}
			<p>{response}</p>
		{/each}
	</div>
{/if}

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: .37rem
</style>