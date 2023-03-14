<script lang="ts">
	export let messages: ChatCompletionRequestMessage[] =
			[],
		content = '',
		name = 'Partner',
		name_label = 'Name',
		parameters:
			| CreateChatCompletionRequest
			| CreateCompletionRequest,
		chat_container: HTMLElement,
		hide_edit_button = false,
		disable_name_edit = false,
		disable_description_edit = false,
		description = '',
		description_open = false,
		description_label =
			'Description',
		description_heading =
			'Conversation Partner Settings',
		description_error_text =
			'You may not send messages without setting description',
		allow_without_description =
			false,
		content_error = false,
		content_error_text =
			'You may not send an empty message',
		loading = false;

	import axios from 'axios';
	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Edit from 'carbon-icons-svelte/lib/Edit.svelte';
	import Download from 'carbon-icons-svelte/lib/Download.svelte';
	import {
		Button,
		InlineLoading,
		TextInput,
		TextArea,
		Modal,
		NumberInput,
		Row,
		Column,
		Toggle
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest,
		CreateCompletionRequest
	} from 'openai';
	import { booleanStore } from '$lib/store';
	import Message from './Message.svelte';
	import Record from '../Record.svelte';
	import { createEventDispatcher } from 'svelte';
	import Transcribe from './Transcribe.svelte';

	const dispatch =
		createEventDispatcher();

	$: can_send =
		!loading &&
		content &&
		(allow_without_description ||
			(!allow_without_description &&
				messages.find(
					(m) => m.role === 'system'
				)));

	onMount(() => {
		height = `${
			(window.innerHeight * 79) / 100
		}px`;
	});

	let height = '670px',
		description_error = false,
		parameters_open = false,
		submit_on_enter = booleanStore(
			'submit-on-enter',
			false
		),
		ref: HTMLTextAreaElement;

	const keydown = (
		e: KeyboardEvent
	) => {
		switch (e.key) {
			case 'Enter':
				if (
					can_send &&
					document &&
					document.activeElement ===
						ref
				) {
					if (e.ctrlKey) {
						send();
					} else if (
						submit_on_enter
					) {
						send();
					}
				}
		}
	};

	const save = () =>
		dispatch('save');

	const send = async () => {
		if (
			!allow_without_description &&
			!description
		) {
			description_error = true;
			description_open = true;
			return;
		} else if (!content) {
			content_error = true;
		}
		dispatch('send', content);
	};
</script>

<svelte:window
	on:keydown={keydown}
/>

<Modal
	bind:open={description_open}
	modalHeading={description_heading}
	primaryButtonText="Set"
	secondaryButtonText="Cancel"
	shouldSubmitOnEnter={false}
	on:click:button--primary={() => {
		messages = [
			...messages,
			{
				role: 'system',
				content: description
			}
		];
		description_open = false;
	}}
	hasForm
>
	<div class="in_modal">
		<TextInput
			labelText={name_label}
			disabled={disable_name_edit}
			bind:value={name}
		/>
		<TextArea
			labelText={description_label}
			invalid={description_error}
			disabled={disable_description_edit}
			invalidText={description_error_text}
			on:input={() =>
				(description_error = false)}
			bind:value={description}
		/>
	</div>
</Modal>

<Modal
	modalHeading="Settings"
	bind:open={parameters_open}
	hasForm
	passiveModal
>
	<div class="in_modal">
		<div>
			<p>
				OpenAI Completions Parameters
			</p>
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
		</div>
		<div>
			<p>Options</p>
			<Toggle
				bind:toggled={$submit_on_enter}
				labelText="Submit on Enter"
			/>
		</div>
	</div>
</Modal>

<Row>
	<Column>
		<div
			style={`height: ${height}`}
			class="all"
		>
			<div
				bind:this={chat_container}
				class="chat_container"
			>
				{#each messages as message}
					<Message {message} />
				{/each}
			</div>
			{#if loading}
				<InlineLoading />
			{/if}
			<div class="input">
				<TextArea
					on:keydown={(e) => {
						if (
							e.key === 'Enter' &&
							submit_on_enter
						)
							e.preventDefault();
					}}
					invalid={content_error}
					invalidText={content_error_text}
					on:input={() =>
						(content_error = false)}
					rows={1}
					bind:ref
					bind:value={content}
				/>
				<Button
					disabled={!can_send}
					size="field"
					on:click={send}
					iconDescription={'Send'}
					icon={Send}
				/>
				<Transcribe
					on:text={({ detail }) =>
						(content += detail)}
				/>
				<Button
					size="field"
					on:click={() =>
						(parameters_open = true)}
					iconDescription="Settings"
					icon={Settings}
				/>{#if !hide_edit_button}
					<Button
						size="field"
						on:click={() =>
							(description_open = true)}
						iconDescription="Edit"
						icon={Edit}
					/>
				{/if}<Button
					size="field"
					on:click={save}
					iconDescription="Download chat"
					icon={Download}
				/>
			</div>
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/colors'
	.in_modal
		display: flex
		flex-direction: column
		row-gap: 1.369rem
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
		row-gap: 1rem
		white-space: pre-wrap
	.chat_container::-webkit-scrollbar
		background-color: colors.$gray-100
		width: .7rem
	.chat_container::-webkit-scrollbar-thumb
		background-color: colors.$gray-80
	.chat_container::-webkit-scrollbar-corner, .chat_container::-webkit-scrollbar:horizontal
		display: none
</style>
