<script lang="ts">
	import {
		arrayStore,
		objectStore
	} from '$lib/store';
	import type { Id } from '$lib/types';
	import {
		Column,
		Row,
		TextInput
	} from 'carbon-components-svelte';
	import axios from 'axios';
	import { v4 } from 'uuid';
	import List from '$lib/components/List.svelte';
	import EntryItem from './EntryItem.svelte';
	import { post } from '$lib/fetch';

	export let id: Id,
		openai_key_modal_open = false;
	$: console.log(id);

	$: can_create = new_name;

	let entries = arrayStore<Id>(id),
		new_name = '';

	const window_keydown = (
		e: KeyboardEvent
	) => {
		switch (e.key) {
			case 'Enter':
				if (can_create) create();
		}
	};

	const create = async () => {
		let new_id = v4();
		let new_date = new Date();
		let new_text = '';
		let entry = {
			text: new_text,
			name: new_name,
			date: new_date,
			entries: v4()
		};
		await axios
			.post('/openai/embeddings', {
				model:
					'text-embedding-ada-002',
				input: `Date: ${new_date.toUTCString()}\nName: ${new_name}\nText: ${new_text}`
			})
			.then(async (values) => {
				console.log(values);
				await post(
					'/embedding/add',
					{
						namespace: 'entries',
						vectors: [
							{
								id: new_id,
								values,
								metadata: {
									parent: [id]
								}
							}
						]
					}
				)
					.then((r) =>
						console.log(
							'add embedding res',
							r
						)
					)
					.catch((e) =>
						alert(
							`error adding embedding for new entry: ${e}`
						)
					);
			})
			.catch((e) => {
				switch (e) {
					case '401':
						openai_key_modal_open =
							true;
						break;
					default:
						alert(
							`error getting embedding for new entry: ${e}`
						);
				}
			});
		objectStore(new_id, entry); //TODO-refactor?
		$entries = [...$entries, new_id];
		new_name = '';
	};
</script>

<svelte:window
	on:keydown={window_keydown}
/>

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
