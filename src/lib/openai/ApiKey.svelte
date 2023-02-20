<script lang="ts">
	export let open = false;
	import { openai_key } from '$lib/store';
	import {
		Modal,
		TextInput
	} from 'carbon-components-svelte';
</script>

<Modal bind:open hasForm modalHeading="OpenAI API key">
	<TextInput
		labelText="OpenAI API Key"
		bind:value={$openai_key}
	/>
</Modal>
