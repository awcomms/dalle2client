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
		chat_container: HTMLElement | null =
			null,
		restart_modal = false,
		hide_settings = false,
		disable_name_edit = false,
		disable_description_edit = false,
		description = '',
		more_open = false,
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
	import Menu from 'carbon-icons-svelte/lib/Menu.svelte';
	import Download from 'carbon-icons-svelte/lib/Download.svelte';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
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
		CreateChatCompletionRequest
	} from 'openai';
	import { booleanStore } from '$lib/store';
	import Message from './Message.svelte';
	import { createEventDispatcher } from 'svelte';
	import { v4 } from 'uuid';

	const dispatch =
		createEventDispatcher();

	$: can_send = !loading;

	onMount(() => {
		height = `${
			(window.innerHeight * 79) / 100
		}px`;
		ref
	});

	let height = '670px',
		// id = v4(),
		description_error = false,
		send_on_enter = booleanStore(
			'send_on_enter',
			false
		),
		ref: HTMLTextAreaElement;

	const keydown = (
		e: KeyboardEvent
	) => {
		switch (e.key) {
			case 'Enter':
				if (!$send_on_enter && !e.ctrlKey) return
				if (
					can_send &&
					document &&
					document.activeElement ===
						ref
				) send()
		}
	};

	const send = async () => {
		if (
			!(
				allow_without_description ||
				(!allow_without_description &&
					!description)
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
		dispatch('send', content);
	};
</script>

<svelte:window
	on:keydown={keydown}
/>

<Modal
	modalHeading="Download then restart?"
	passiveModal
	bind:open={restart_modal}
>
	<p>
		Do you want to restart this chat
		without downloading it first
	</p>
	<!-- <ButtonSet stacked> -->
	<Button
		on:click={() => {
			dispatch(
				'download_then_restart'
			);
			restart_modal = false;
		}}>Download then restart</Button
	>
	<Button
		on:click={() => {
			dispatch('restart');
			restart_modal = false;
		}}
		>Restart without downloading</Button
	>
	<!-- </ButtonSet> -->
</Modal>

<Modal
	bind:open={more_open}
	modalHeading={settings_heading}
	passiveModal
	hasForm
>
	<div class="in_modal">
		<div class="in_modal">
			<ButtonSet>
				<Button
					size="field"
					on:click={() =>
						dispatch('download')}
					iconDescription="Download chat"
					icon={Download}
					>Download chat</Button
				>
				<Button
					size="field"
					on:click={() =>
						(restart_modal = true)}
					iconDescription="Restart chat"
					icon={Restart}
					>Restart chat</Button
				>
			</ButtonSet>
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
		{#if !hide_settings}
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
						bind:toggled={$send_on_enter}
						labelText="Send message when the Enter key is pressed"
					/>
				</div>
			</div>
		{/if}
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
				<TextArea
					style="min-width: unset"
					rows={1}
					disabled={loading}
					on:keydown={(e) => {
						if (
							e.key === 'Enter' &&
							$send_on_enter
						)
							e.preventDefault();
					}}
					invalid={content_error}
					invalidText={content_error_text}
					on:input={() =>
						(content_error = false)}
					bind:ref
					bind:value={content}
				/>
				<Button
					disabled={!can_send}
					size="field"
					on:click={send}
					iconDescription={'Send'}
					icon={loading
						? InlineLoading
						: Send}
				/>
				<Button
					size="field"
					on:click={() =>
						(more_open = true)}
					iconDescription="More"
					icon={Menu}
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
	.no-scrollbar::-webkit-scrollbar
		display: none
</style>
