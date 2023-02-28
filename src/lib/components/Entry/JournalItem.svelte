<script lang="ts">
	import { objectStore } from '$lib/store';
	import { Link } from 'carbon-components-svelte';
	import Jounal from './Journal.svelte';
	import type { Journal as _Journal } from './types';

	export let id: string;
	let journal = objectStore<_Journal | null>(id, null)
</script>

{#if $journal}
	<div>
	    <Link href="/journals/{id}">{$journal.name}</Link>
	</div>
{/if}
