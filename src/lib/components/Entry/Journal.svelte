<script lang="ts">
	import type { Journal } from './types';
	import { objectStore } from '$lib/store';
	import ApiKey from '$lib/openai/ApiKey.svelte';
	import type { Id } from '$lib/types';
	import Entries from './Entries.svelte';

	export let id: Id;

	let journal = objectStore<Journal | null>(id, null); //TODO-syntax
	let openai_key_modal_open = false;
</script>

<ApiKey bind:open={openai_key_modal_open} />

{#if $journal}
	<h1>Journal: {$journal.name}</h1>

	<Entries id={$journal.entries} />
{/if}
