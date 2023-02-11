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
		NumberInput
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { openai } from '$lib/openai';
	import type { CreateCompletionRequest } from 'openai';

	onMount(() => {
		height = `${(window.innerHeight * 79) / 100}px`;
	});

	let parameters: CreateCompletionRequest = {
			model: 'text-davinci-003',
			prompt: ''
		},
		loading = false,
		height = '670px',
		settings_open = false,
		value = '',
		def_open = true,
		definition = '',
		name = 'Character',
		chat = '';

	let ref: HTMLInputElement;

	const keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case 'Enter':
				send();
		}
	};

	const send = () => {
		chat += `\n\nUser: ${value}`;
		get(chat);
	};

	const get = async (v: string) => {
		loading = true;
		if (!v) {
			loading = false;
			return;
		}
		let request = parameters;

		request.prompt = v;
		await openai
			.createCompletion(request)
			.then((r) => {
				chat += `\n\n${name}: ${r.data.choices[0].text}`;
			})
			.finally(() => (loading = false));
	};
</script>

<svelte:window on:keydown={keydown} />

<ButtonSet>
	<Button size="small" on:click={() => (def_open = true)}
		>New definition</Button
	><Button size="small" on:click={() => (def_open = true)}
		>Save</Button
	>
</ButtonSet>
<Modal
	open={true}
	modalHeading="Describe the conversation"
	primaryButtonText="Set"
	secondaryButtonText="Cancel"
	on:click:button--primary={() =>
		(chat = `The following is a ${definition}:`)}
	hasForm
>
	<!-- <TextInput bind:value={name} /> -->
	<TextArea bind:value={definition} />
</Modal>

<Modal
	modalHeading="Settings"
	bind:open={settings_open}
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
	<div class="responses">
		<pre>{chat}</pre>
	</div>

	{#if loading}
		<InlineLoading />
	{/if}

	<div class="input">
		<TextInput bind:ref bind:value />
		<Button
			disabled={loading}
			size="field"
			on:click={send}
			icon={Send}
		/>
		<Button
			size="field"
			on:click={() => (settings_open = true)}
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
