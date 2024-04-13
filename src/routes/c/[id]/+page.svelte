<script lang="ts">
	import Assistant from '$lib/components/ai_chat/Assistant.svelte';
	import { Button } from 'carbon-components-svelte';
	import axios from 'axios';
	import type { PageData } from './$types';
	import { notify } from '../../../lib/util/notify';
	import { notify_error } from '$lib/util/notify/notify_error';

	export let data: PageData,
		parameters = data.p,
		description = '';

	const save = async () => {
		if (data.user !== data.u) return
		try {
			const res = await axios.put('./');
			notify('Saved');
		} catch (e) {
			notify_error(`save error: ${e}`);
		}
	};
</script>

<Assistant bind:parameters {description} />
{#if data.user === data.u}
	<Button on:click={save}>Save</Button>
{/if}
