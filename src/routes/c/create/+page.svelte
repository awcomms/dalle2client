<script lang="ts">
	import Assistant from '$lib/components/ai_chat/Assistant.svelte';
	import { Button } from 'carbon-components-svelte';
	import axios from 'axios';
	import { notify } from '../../../lib/util/notify';
	import { notify_error } from '$lib/util/notify/notify_error';

	let parameters = {
		model: 'llama3-70b-8192',
		messages: [{ role: 'system', content: '' }]
	};

	const save = async () => {
		try {
			const res = await axios.put('/c');
			notify('Saved');
		} catch (e) {
			notify_error(`Character save error: ${e}`);
		}
	};
</script>

<Assistant bind:parameters />
<Button on:click={save}>Save</Button>
