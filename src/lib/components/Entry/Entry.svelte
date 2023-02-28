<script lang="ts">
	import { objectStore } from '$lib/store';
	import type { Id } from '$lib/types';
	import Entries from './Entries.svelte';
	import type { Entry } from './types';

	export let id: Id;
	console.log(id)

	$: entry = objectStore<Entry | null>(id, null);
</script>

{#if $entry}
	<h1>{$entry.name}</h1>

	<Entries id={$entry.entries} />
{:else}
	<h1>Error: Entry not available</h1>
{/if}
