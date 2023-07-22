<script lang="ts">
	import {
		arrayStore,
		objectStore,
	} from '$lib/store';

	import { TextInput } from 'carbon-components-svelte';
	import { v4 } from 'uuid';
	import JournalEntry from './JournalItem.svelte';
	import { journals_id } from './store';
	import type { Entry, Journal } from './types';
	import { typeStore } from '$lib/util/store';

	const window_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				console.log('e')
				if (name) create();
		}
	};

	let journals = arrayStore<string>($journals_id),
		name: string = '';

	const create = () => {
		console.log('s')
		let id = v4();
		let entries = v4();
		arrayStore<Entry>('entries', entries);
		typeStore<Journal>('journal?', id, {
			name,
			entries
		});
		$journals = [...$journals, id]
	};
</script>

<svelte:window on:keydown={window_keydown} />

<TextInput bind:value={name} labelText="New Journal" />

{#each $journals as id}
	<JournalEntry {id} />
{/each}
