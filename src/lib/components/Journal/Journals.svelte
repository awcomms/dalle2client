<script lang="ts">
	export let value = '';

	import { TextInput } from 'carbon-components-svelte';
	import { v4 } from 'uuid';
	import JournalEntry from './JournalEntry.svelte';
	import { journals } from './store';

	const window_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				if (value) create();
		}
	};

	const create = () => {
		// $journals = [
		// 	...$journals,
		// 	{
		// 		id: v4(),
		// 		name: value,
		// 		entries: []
		// 	}
		// ];
	};
</script>

<svelte:window on:keydown={window_keydown} />

<TextInput bind:value labelText="New Entry" />

{#each $journals as id}
	<JournalEntry {id} />
{/each}
