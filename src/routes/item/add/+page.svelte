<script lang="ts">
	import type { SetTitleOptions, Item } from '$lib/types';
	import { Tags } from '$lib/components/Tag';
	import EditableList from '$lib/components/EditableList.svelte';
	import { Row, Column, TextInput, Button } from 'carbon-components-svelte';
	import { req } from '$lib/util';

	let options: SetTitleOptions = {
		name: '',
		tags: [],
	};

	let book_authors: Array<Item> = [];

	let types = { book: false}

	const save = async() => {
		console.log(await req({Item: {New: {options}}}, true))
	};
</script>

<Row noGutter>
	<Column>
		<Tags bind:tags={options.tags} />

		<TextInput labelText="name" bind:value={options.name} />

		<Button on:click={save}>Save</Button>
	</Column>
</Row>
