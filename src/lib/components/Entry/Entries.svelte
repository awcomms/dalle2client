<script lang="ts">
	import { arrayStore, objectStore } from '$lib/store';
	import type { Id } from '$lib/types';
	import {
		Column,
		Row,
		TextInput
	} from 'carbon-components-svelte';
	import { v4 } from 'uuid';
	import List from '$lib/components/List.svelte';
	import EntryItem from './EntryItem.svelte';

	export let id: Id;
	$: console.log(id);

	$: can_create = new_name;

	let entries = arrayStore<Id>(id),
		new_name = '';

	console.log($entries)

	const window_keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				if (can_create) create();
		}
	};

	const create = async () => {
		let new_id = v4();
		let entry = {
			text: '',
			name: new_name,
			date: new Date(),
			entries: v4()
		};
		objectStore(new_id, entry); //TODO-refactor?
		$entries = [...$entries, new_id];
		console.log($entries);
	};
</script>

<svelte:window on:keydown={window_keydown} />

<Row>
	<Column>
		<TextInput
			bind:value={new_name}
			labelText="Add new entry"
		/>

		<List items={$entries}>
			<svelte:fragment let:item={id}>
				<EntryItem {id} />
			</svelte:fragment>
		</List>

		<!-- {#each $entries as id}
			<EntryItem {id} />
		{/each} -->
	</Column>
</Row>
