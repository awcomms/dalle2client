<script lang="ts">
	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import {
		Button,
		InlineLoading,
		TextInput,
		TextArea,
		Modal,
		ButtonSet,
		NumberInput,
		Select,
		SelectItem
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { openai } from '$lib/openai';
	import { chats, definitions } from './store';
	import type { CreateCompletionRequest } from 'openai';
	import { download_blob } from '$lib/util';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';

	$: update_chat(chat);

	onMount(() => {
		height = `${(window.innerHeight * 79) / 100}px`;
	});

	let loading = false,
		id: number = $chats.reduce((a, b) => Math.max(a, b.id), 1),
		height = '670px',
		parameters_open = false,
		definition_open = true,
		value = '',
		user = 'Actor2',
		definition = '',
		name = 'Character',
		suffix = `\n\n${user}: `,
		prefix = `\n\n${name}: `,
		parameters: CreateCompletionRequest = {
			model: 'text-davinci-003',
			prompt: ''
		},
		chat = '';

	let ref: HTMLInputElement;

	const keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				send();
		}
	};

	const update_chat = (c: string) => {
		let _c = $chats.find((c) => c.id === id);
		if (_c) {
			_c.chat = c
		}
	};

	// const send = () => {
	// 	chat += `${value}`;
	// 	get(chat);
	// };

	const save = () => {
		let blob = new Blob([chat], { type: 'text/text' });
		download_blob(
			blob,
			`AI partner chat - ${name} - ${new Date().toUTCString()}`
		);
	};

	const set_definition = () => {
		chat = `Consider ${name} with the following description:\n\n${definition}.\n\nThe following is a conversation between ${name} and ${user}`;
		$definitions = [...$definitions, definition];
		definition_open = false;
	};

	const delete_definition = (d: string) => {
		$definitions = $definitions.filter((_d) => _d !== d);
	};

	const send = async () => {
		loading = true;
		if (!value) {
			loading = false;
			return;
		}
		let request = parameters;

		request.prompt = `${chat}${suffix}${value}${prefix}`;
		console.log(request.prompt);
		await openai
			.createCompletion(request)
			.then((r) => {
				console.log(r.data.choices[0].text);
				chat += `${r.data.choices[0].text}`;
			})
			.finally(() => (loading = false));
	};
</script>

<svelte:window on:keydown={keydown} />

<Modal
	bind:open={definition_open}
	modalHeading="Describe the conversation partner"
	primaryButtonText="Set"
	secondaryButtonText="Cancel"
	on:click:button--primary={set_definition}
	hasForm
>
	<!-- <TextInput bind:value={name} /> -->
	<Select
		labelText="Select a previously used definition"
		bind:selected={definition}
	>
		{#each $definitions as d}
			<SelectItem text={d} value={d} />
			<Button
				on:click={() => delete_definition(d)}
				icon={TrashCan}
				iconDescription="Delete this description from local storage"
			/>
		{/each}
	</Select>
	<TextArea bind:value={definition} />
</Modal>

<Modal
	modalHeading="Parameters"
	bind:open={parameters_open}
	hasForm
	passiveModal
>
	<NumberInput
		min={0}
		max={1}
		bind:value={parameters.temperature}
	/>
	<NumberInput
		min={0}
		max={1}
		bind:value={parameters.top_p}
	/>
</Modal>

<div style={`height: ${height}`} class="all">
	<ButtonSet>
		<Button
			size="small"
			on:click={() => (definition_open = true)}
			>Edit definition</Button
		><Button
			size="small"
			on:click={() => (parameters_open = true)}
			>Edit Parameters</Button
		><Button size="small" on:click={save}>Save</Button>
	</ButtonSet>
	<div class="responses">
		<pre>{chat}</pre>
	</div>

	{#if loading}
		<InlineLoading />
	{/if}

	<div class="input">
		<TextInput bind:ref bind:value />
		<Button
			disabled={loading || !value || !definition}
			size="field"
			on:click={send}
			icon={Send}
		/>
		<Button
			size="field"
			on:click={() => (parameters_open = true)}
			icon={Settings}
		/>
		<!-- </Form> -->
	</div>
</div>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: .37rem
	.input
		display: flex
		flex-grow: 0
		flex-direction: row
	.responses
		display: flex
		flex-grow: 2
		flex-direction: column
		height: 100%
		overflow-y: scroll
		row-gap: .37rem
</style>
