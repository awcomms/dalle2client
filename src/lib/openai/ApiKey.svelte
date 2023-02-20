<script lang="ts">
	export let open = false,
		require = false;
	import { openai_key } from '$lib/store';
	import {
		Modal,
		TextInput
	} from 'carbon-components-svelte';

	// if (require) while (!$openai_key) open = true
</script>

<Modal
	primaryButtonText="Save"
	secondaryButtonText="Cancel"
	on:click:button--primary={() => (open = false)}
	on:click:button--secondary={() => (open = false)}
	bind:open
	hasForm
	modalHeading="OpenAI API key"
>
	<TextInput
		labelText="OpenAI API Key"
		bind:value={$openai_key}
	/>
</Modal>
