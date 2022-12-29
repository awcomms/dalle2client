<script lang="ts">
	import { req } from '$lib/util';
	import { Todo } from '$lib/components';
	import { Link, TextInput, Button, ButtonSet, InlineLoading, Modal } from 'carbon-components-svelte';
	import Prompt from './Prompt.svelte';

	let value = '',
		previous = '',
		loading = false,
		src = '',
		open = false;

	const _do = async () => {
		loading = true;
		previous = value;
		await req<string>({OpenAI: { DALLE2: value }})
			.then((r) => (src = r))
			.catch(() => alert('error generating image'))
			.finally(() => (loading = false));
	};
</script>

<Modal bind:open passiveModal hasForm modalHeading="Edit generation prompt">
	<Prompt bind:value />
</Modal>
<p>{value}</p>
<ButtonSet>
	<Button on:click={() => (open = true)}>Edit</Button>
	<Button on:click={_do}>Do</Button>
</ButtonSet>

<br />
<p>{previous}</p>
{#if loading}
	<InlineLoading />
{:else if src}
	<img alt="last DallE2 generation result" {src} width="1024" height="1024" />
{/if}

<style lang="sass">
	img
		max-inline-size: 100%
		block-size: auto
</style>
