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
		Row,
		Column,
		ComboBox,
		Truncate
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { getOpenAI } from '$lib/openai';
	import { chats, descriptions } from './store';
	// import { encode } from 'gpt-3-encoder';
	import type { CreateCompletionRequest } from 'openai';
	import { download_blob } from '$lib/util';
	import { openai_key } from '$lib/store';
	import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import type { Chat } from './types';
	import { v4 } from "uuid";
	import ApiKey from '$lib/openai/ApiKey.svelte';

	$: openai = getOpenAI($openai_key)

	$: update_chat({
		id,
		chat,
		name,
		description,
		parameters
	});

	onMount(() => {
		height = `${(window.innerHeight * 79) / 100}px`;
	});

	let loading = false,
		// id: number = 1,
		id = v4(),
		height = '670px',
		openai_key_modal_open = false,
		parameters_open = false,
		description_open = true,
		chat_container: HTMLElement,
		value = '',
		user = 'You',
		description = '',
		name = 'Character',
		parameters: CreateCompletionRequest = {
			model: 'text-davinci-003',
			temperature: 1,
			top_p: 1,
			presence_penalty: 0,
			frequency_penalty: 0
		},
		chat = '';

	let ref: HTMLTextAreaElement;

	const keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				send();
		}
	};

	const update_chat = (c: Chat) => {
		let index = $chats.findIndex((c) => c.id === id);
		if (index > -1) {
			$chats[index] = c;
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

	const set_description = () => {
		chat = `Consider an entity, hereby referred to as ${name}, with the following description: ${description}.\n\nThe following is a conversation between ${name} and an entity referred to as ${user}.`;
		if (!$descriptions.find(d => d.text !== description))
			$descriptions = [...$descriptions, {id: v4(), name, text: description}];
		description_open = false;
	};

	const delete_chat = (id: string) => {
		$chats = $chats.filter((c) => c.id !== id);
	};

	const send = async () => {
		loading = true;
		if (!value) {
			loading = false;
			return;
		}
		if (!openai) {
			loading = false
			openai_key_modal_open = true
			return
		}
		let request = parameters;

		request.prompt = `${chat}\n\n${user}: ${value}\n\n${name}: `;
		let l = await fetch('/token_count', {
			method: 'POST',
			body: request.prompt
		}).then(async (r) => await r.text());
		request.max_tokens = 4096 - Number(l);
		console.log('request', request);
		await openai
			.createCompletion(request)
			.then((r) => {
				chat = `${request.prompt}${r.data.choices[0].text}`;
				chat_container.scrollTop =
					chat_container.scrollHeight;
				value = '';
			})
			.catch((e) => console.log(e))
			.finally(() => (loading = false));
	};
</script>

<svelte:window on:keydown={keydown} />

<ApiKey require bind:open={openai_key_modal_open} />

<Modal
	bind:open={description_open}
	modalHeading="Describe the conversation partner"
	primaryButtonText="Set"
	secondaryButtonText="Cancel"
	on:click:button--primary={set_description}
	hasForm
>
	<TextInput
		labelText="Give the conversation partner a name"
		bind:value={name}
	/>
	<!-- <ComboBox
		titleText="Load previous chat"
		items={$chats.map((c) => ({
			id: c.id,
			text: `${c.name}: ${c.description}`
		}))}
		let:item
		on:select={({ detail }) => {
			let c = $chats.find(
				(_c) => (_c.id = detail.selectedId)
			);
			if (c) {
				({ description, chat, name, parameters } = c);
				description_open = false;
			}
		}}
	>
		<div class="description_option">
			<Truncate>{item.text}</Truncate>
			<Button
				size="small"
				on:click={() => delete_chat(item.id)}
				icon={TrashCan}
				iconDescription="Delete this chat from local storage"
			/>
		</div>
	</ComboBox> -->
	<TextArea
		labelText="Describe the partner"
		bind:value={description}
	/>
	<ComboBox
		titleText="Select a previously used description"
		items={$descriptions}
		let:item
		on:select={({ detail }) =>
			(description = detail.selectedItem.text)}
	>
		<div class="description_option">
			<Truncate>{item.text}</Truncate>
			<!-- <Button
					size="small"
					on:click={() => delete_chat(item.text)}
					icon={TrashCan}
					iconDescription="Delete this description from local storage"
				/> -->
		</div>
	</ComboBox>
</Modal>

<Modal
	modalHeading="Parameters"
	bind:open={parameters_open}
	hasForm
	passiveModal
>
	<NumberInput
		label="temperature"
		min={0}
		max={2}
		hideSteppers
		bind:value={parameters.temperature}
	/>
	<NumberInput
		label="top_p"
		min={0}
		max={2}
		hideSteppers
		bind:value={parameters.top_p}
	/>
	<NumberInput
		label="frequency_penalty"
		min={-2.0}
		max={2.0}
		hideSteppers
		bind:value={parameters.frequency_penalty}
	/>
	<NumberInput
		label="presence_penalty"
		min={-2.0}
		max={2.0}
		hideSteppers
		bind:value={parameters.presence_penalty}
	/>
</Modal>

<Row>
	<Column>
		<div style={`height: ${height}`} class="all">
			<ButtonSet>
				<Button
					size="small"
					on:click={() => (description_open = true)}
					>Edit description</Button
				><Button
					size="small"
					on:click={() => (parameters_open = true)}
					>Edit Parameters</Button
				><Button size="small" on:click={save}>Save</Button>
			</ButtonSet>
			<div bind:this={chat_container} class="chat_container">
				<pre class="chat">{chat}</pre>
			</div>
			{#if loading}
				<InlineLoading />
			{/if}
			<div class="input">
				<TextArea cols={1} bind:ref bind:value />
				<Button
					disabled={loading || !value || !description}
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
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/colors'
	.description_option
		display: flex
		flex-direction: row
	.all
		display: flex
		flex-direction: column
		row-gap: .37rem
	.input
		display: flex
		flex-grow: 0
		flex-direction: row
	.chat_container
		display: flex
		flex-grow: 2
		flex-direction: column
		height: 100%
		width: 100%
		overflow-y: scroll
		row-gap: .37rem
	.chat, .chat_container
		white-space: pre-wrap
	.chat_container::-webkit-scrollbar
		background-color: colors.$gray-100
		width: .7rem
	.chat_container::-webkit-scrollbar-thumb
		background-color: colors.$gray-80
	.chat_container::-webkit-scrollbar-corner, .chat_container::-webkit-scrollbar:horizontal
		display: none
</style>
