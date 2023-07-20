<script lang="ts">
	export let messages: ChatCompletionRequestMessage[] =
			[],
		content = '',
		name = 'Partner',
		name_label = 'Name',
		parameters: CreateChatCompletionRequest =
			{
				model: 'gpt-4-0613',
				temperature: 1,
				top_p: 1,
				messages: [],
				presence_penalty: 0,
				frequency_penalty: 0
			},
		send_function:
			| (() => Promise<void>)
			| null = null,
		chat_container: HTMLElement | null =
			null,
		clear_modal = false,
		hide_settings_button = false,
		disable_name_edit = false,
		disable_description_edit = false,
		description = '',
		settings_open = false,
		description_label =
			'Description',
		settings_heading =
			'Conversation Partner Settings',
		description_error_text =
			'You may not send messages without setting description',
		allow_without_content = false,
		allow_without_description =
			false,
		content_error = false,
		content_error_text =
			'You may not send an empty message',
		loading = false;

	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
	import Download from 'carbon-icons-svelte/lib/Download.svelte';
	import Clean from 'carbon-icons-svelte/lib/Clean.svelte';
	import {
		Button,
		InlineLoading,
		TextInput,
		TextArea,
		Modal,
		NumberInput,
		Row,
		Column,
		Toggle,

		ButtonSet

	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest,
	} from 'openai';
	import { booleanStore } from '$lib/store';
	import Message from './Message.svelte';
	import { createEventDispatcher } from 'svelte';
	import Transcribe from './Transcribe.svelte';
	import { v4 } from 'uuid';

	const dispatch =
		createEventDispatcher();

	$: can_send = !loading;

	onMount(() => {
		height = `${
			(window.innerHeight * 79) / 100
		}px`;
	});

	let height = '670px',
		// id = v4(),
		description_error = false,
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

	const send = async () => {
		if (
			!(
				allow_without_description ||
				(!allow_without_description &&
					messages.find(
						(m) =>
							m.role === 'system'
					))
			)
		) {
			dispatch(
				'send_attempt_without_description'
			);
			description_error = true;
			return;
		} else if (
			!allow_without_content &&
			!content
		) {
			content_error = true;
			return;
		}
		if (send_function)
			send_function().then(() => {
				if (chat_container)
					chat_container.scrollTop =
						chat_container.scrollHeight;
			});
		dispatch('send', content);
	};
</script>

<svelte:window
	on:keydown={keydown}
/>

<Modal modalHeading="Download then clear?" passiveModal bind:open={clear_modal}>
	<p>Do you want to clear this chat without downloading it first</p>
	<!-- <ButtonSet stacked> -->
		<Button on:click={() => dispatch('download_then_clear')}>Download then clear</Button>
		<Button on:click={() => dispatch('clear')}>Clear without downloading</Button>
	<!-- </ButtonSet> -->
</Modal>

<Modal
	bind:open={settings_open}
	modalHeading={settings_heading}
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
		settings_open = false;
	}}
	hasForm
>
	<div class="in_modal">
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
				rows={1}
				on:input={() =>
					(description_error = false)}
				bind:value={description}
			/>
		</div>
		<div class="in_modal">
			<div>
				<p>
					OpenAI Completions
					Parameters
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
	</div>
</Modal>

<Row>
	<Column>
		<div
			style={`height: calc(100vh - 7rem)`}
			class="all"
		>
			<div
				bind:this={chat_container}
				class="messages"
			>
				{#each messages as message}
					<Message {message} />
				{/each}
			</div>
			<div class="input">
				<Transcribe
					on:text={({ detail }) =>
						(content += detail)}
				/>
				<TextArea
					style="min-width: unset"
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
					icon={loading ? InlineLoading : Send}
				/>
				{#if !hide_settings_button}
					<Button
						size="field"
						on:click={() =>
							(settings_open = true)}
						iconDescription="Settings"
						icon={Settings}
					/>
				{/if}<Button
					size="field"
					on:click={() => dispatch('download')}
					iconDescription="Download chat"
					icon={Download}
				/>
				<Button
					size="field"
					on:click={()=>clear_modal=true}
					iconDescription="Clear chat"
					icon={Clean}
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
		row-gap: 1rem
	.all
		display: flex
		flex-direction: column
		row-gap: .37rem
	.input
		max-width: 100%
		display: flex
		flex-grow: 0
		flex-direction: row
	.messages
		display: flex
		flex-grow: 2
		flex-direction: column
		height: 100%
		width: 100%
		overflow-y: scroll
		row-gap: 1rem
		white-space: pre-wrap
	.messages::-webkit-scrollbar
		background-color: colors.$gray-100
		width: 1rem
	.messages::-webkit-scrollbar-thumb
		background-color: colors.$gray-80
	.messages::-webkit-scrollbar-corner, .messages::-webkit-scrollbar:horizontal
		display: none
</style>
