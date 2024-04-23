<script lang="ts">
	import Assistant from '$lib/components/ai_chat/Assistant.svelte';
	import { Button } from 'carbon-components-svelte';
	import axios from 'axios';
	import { notify } from '$lib/util/notify';
	import { notify_error } from '$lib/util/notify/notify_error';
	import { createEventDispatcher } from 'svelte';
	import { type ChatCompletionCreateParamsNonStreaming } from 'groq-sdk/resources/chat/completions.mjs';
	import { page } from '$app/stores';

	const dispatch = createEventDispatcher();

	export let parameters: ChatCompletionCreateParamsNonStreaming,
        u: string;

	const save = async () => {
		if ($page.data.user !== u) return;
		try {
			const res = await axios.put('./');
			notify('Saved');
			dispatch('save');
		} catch (e) {
			notify_error(`save error: ${e}`);
		}
	};
</script>

<Assistant bind:parameters />
{#if $page.data.user === $page.data.u}
	<Button on:click={save}>Save</Button>
{/if}
