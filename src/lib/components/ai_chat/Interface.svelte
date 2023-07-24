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
		hide_parameters = false,
		show_name_edit = false,
		disable_description_edit = false,
		description = '',
		more_open = false,
		description_label =
			'Description',
		description_error_text =
			'You may not send messages without setting description',
		send_without_content = false,
		send_without_description = false,
		content_error = false,
		content_error_text =
			'You may not send an empty message',
		message_input_ref: HTMLTextAreaElement,
		loading = false;

	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import Menu from 'carbon-icons-svelte/lib/Menu.svelte';

	import {
		Button,
		InlineLoading,
		TextArea,
		Modal,
		Row,
		Column
	} from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest
	} from 'openai';
	import Message from './Message.svelte';
	import { createEventDispatcher } from 'svelte';
	import More from './More.svelte';
	import { send_on_enter } from './store';

	const dispatch =
		createEventDispatcher();

	$: can_send = !loading;

	onMount(() => {
		height = `${
			(window.innerHeight * 79) / 100
		}px`;
		message_input_ref.classList.add(
			'no-scrollbar'
		);
	});

	let height = '670px',
		// id = v4(),
		description_error = false;

	const keydown = (
		e: KeyboardEvent
	) => {
		switch (e.key) {
			case 'Enter':
				if (
					!$send_on_enter &&
					!e.ctrlKey
				)
					return;
				if (
					can_send &&
					document &&
					document.activeElement ===
						message_input_ref
				)
					send();
		}
	};

	const send = async () => {
		if (
			!send_without_description &&
			!description
		) {
			description_error = true;
			dispatch(
				'send_attempt_without_description'
			);
			return;
		} else if (
			!send_without_content &&
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
		Download chat first before
		restarting?
	</p>
	<!-- <ButtonSet stacked> -->
	<Button
		on:click={() => {
			more_open = false;
			dispatch(
				'download_then_restart'
			);
			restart_modal = false;
		}}>Download then restart</Button
	>
	<Button
		on:click={() => {
			more_open = false;
			dispatch('restart');
			restart_modal = false;
		}}
		>Restart without downloading</Button
	>
	<!-- </ButtonSet> -->
</Modal>

<More
	bind:open={more_open}
	bind:restart_modal
	{name_label}
	{show_name_edit}
	{hide_parameters}
	bind:name
	{description_label}
	{description_error}
	{description_error_text}
	{disable_description_edit}
	bind:description
	bind:parameters
/>

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
					rows={2}
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
					bind:ref={message_input_ref}
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
