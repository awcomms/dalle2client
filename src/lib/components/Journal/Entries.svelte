<script lang="ts">
	import { getOpenAI } from '$lib/openai';
	import ApiKey from '$lib/openai/ApiKey.svelte';
	import {
		arrayStore,
		objectStore,
		openai_key
	} from '$lib/store';
	import type { Id } from '$lib/types';
	import {
		Column,
		Row,
		TextInput
	} from 'carbon-components-svelte';
	import { v4 } from 'uuid';
	import EntryItem from './EntryItem.svelte';

	export let id: Id;

	$: openai = getOpenAI($openai_key);
	$: can_create = new_name;

	let entries = arrayStore<Id>(id),
		new_name = '',
		openai_key_modal_open = false;

	const window_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				if (can_create) create();
		}
	};

	const create = async () => {
		if (!openai) {
			openai_key_modal_open = true;
			return;
		}
		let id = v4();
		await openai
			.createEmbedding({
				model: 'text-embedding-ada-002',
				input: new_name
			})
			.then((r) => {
				let entry = {
					// id,
					text: '',
					name,
					embedding: r.data.data[0].embedding,
					date: new Date()
				};
				objectStore(id, entry);
				$entries = [...$entries, id];
			});
	};
</script>

<svelte:window on:keydown={window_keydown} />
<ApiKey bind:open={openai_key_modal_open} />

<Row>
	<Column>
		<TextInput
			bind:value={new_name}
			labelText="Add a new entry to this journal"
		/>

		{#each $entries as id}
			<EntryItem {id} />
		{/each}
	</Column>
</Row>
