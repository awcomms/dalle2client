<script lang="ts">
	/**
	 * list diaries
	 * add Journal
	 * go to Journal page
	 *
	 */

	import type { Journal, Entry as _Entry } from './types';
	import { entries, journals } from './store';
	import Entry from './Entry.svelte';
	import { v4 } from 'uuid';
	import { getOpenAI } from '$lib/openai';
	import { openai_key } from '$lib/store';
	import ApiKey from '$lib/openai/ApiKey.svelte';
	import { TextInput } from 'carbon-components-svelte';

	export let journal: Journal,
		journal_entries: _Entry[],
		text = '';

	let openai_key_modal_open = false;

	$: openai = getOpenAI($openai_key);

	const window_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				// if (text) create();
		}
	};

	// const create = async () => {
	// 	if (!openai) {
	// 		openai_key_modal_open = true;
	// 		return;
	// 	}
	// 	let id = v4();
	// 	await openai
	// 		.createEmbedding({
	// 			model: 'text-embedding-ada-002',
	// 			input: text
	// 		})
	// 		.then((r) => {
	// 			let entry = {
	// 				id,
	// 				text,
	// 				embedding: r.data.data[0].embedding,
	// 				date: new Date()
	// 			};
	// 			$entries = [...$entries, entry];
	// 			let _j_index = $journals.findIndex(
	// 				(j) => j.id === journal.id
	// 			);
	// 			if (_j_index) {
	// 				let _j = $journals[_j_index];
	// 				_j.entries = [..._j.entries, entry.id];
	// 				$journals[_j_index] = _j;
	// 			}
	// 		});
	// };
</script>

<ApiKey bind:open={openai_key_modal_open} />

<svelte:window on:keydown={window_keydown} />

<h1>Journal: {journal.name}</h1>

<TextInput
	bind:value={text}
	labelText="Add entry to this journal"
/>

{#each journal_entries as entry}
	<Entry {entry} />
{/each}
