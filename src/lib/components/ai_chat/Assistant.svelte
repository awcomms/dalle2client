<script lang="ts">
	export let hide_parameters = false,
		show_name_edit = false,
		disable_description_edit = false,
		description = '';

	import type { ChatCompletion, ChatCompletionAssistantMessageParam, ChatCompletionCreateParamsNonStreaming, ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources';
	import axios from 'axios';
	// import { v4 } from 'uuid';
	import Interface from './Interface.svelte';
	import { download_blob } from '$lib/util';
	import { notify } from '$lib/util/notify';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
	import { get_openai } from '$lib/openai';
	import { OPENAI_API_KEY } from '$lib/store';
	import { create } from '$lib/util/image/create';

	let loading = false,
		// id = v4(),
		_content = '',
		more_open = false,
		chat_container: HTMLElement,
		name = 'Assistant',
		user = 'You',
		message_input_ref: HTMLTextAreaElement,
		messages: ChatCompletionMessageParam[] = [],
		parameters: ChatCompletionCreateParamsNonStreaming;

	const tools = {
		'create_image': create
	}

	const download = () => download_blob(new Blob([JSON.stringify(messages)]), `Chat between user ${user} and GPT3.5 AI Assistant ${name}`);

	const restart = () => {
		messages = [];
	};

	const download_then_restart = () => {
		restart();
		download();
	};

	const send = async (message: ChatCompletionMessageParam) => {
		console.debug('1-message', message)
		console.debug('1-messages', messages)
		loading = true;
		try {
			const openai = get_openai($OPENAI_API_KEY);
			let request = parameters;
			request.messages = [
				{
					role: 'system',
					content: description
				},
				...messages,
				message
			];

			console.debug('b', messages, request.messages)


			const r = await openai.chat.completions.create(request);

			console.debug('1', messages)
			const first_choice = r.choices[0];
			console.debug('f', first_choice)
			console.debug('2', messages)
			if (!first_choice) {
				notify({
					kind: 'error',
					title: 'Please retry'
				});
				return;
			}
			if (!first_choice.message) {
				notify({
					kind: 'error',
					title: 'Please retry'
				});
				return;
			}
			switch (first_choice.finish_details.type) {
				case 'stop':
					messages = [
						...messages,
						{
							...message
						} as ChatCompletionUserMessageParam,
						{
							...first_choice.message,
							name
						} as ChatCompletionAssistantMessageParam
					];
					chat_container.scrollTop = chat_container.scrollHeight;
					_content = '';
					message_input_ref.focus();
					break
				case 'length':
					notify({
						kind: 'warning',
						title: 'Conversation limit reached',
						button: {
							text: 'Restart conversation',
							icon: Restart,
							act: restart
						}
					});
					break
				case 'tool_calls':
					first_choice.message.tool_calls?.forEach((t) => {

					})
					break
				case 'content_filter':
					notify({
						kind: 'warning',
						title: "Content was omitted due to a flag from OpenAI's content filters"
					})
					break
				case 'function_call':
			}
			console.debug('3', messages)

		} catch (e) {
			console.error(e);
			notify({
				kind: 'error',
				title: e
			});
		}
		loading = false;
	};
</script>

<Interface
	bind:name
	bind:text={_content}
	bind:loading
	bind:messages
	bind:description
	bind:message_input_ref
	bind:parameters
	bind:chat_container
	bind:more_open
	name_label="Give the Assistant a name"
	description_label="Tell the Assistant how to behave"
	{hide_parameters}
	{show_name_edit}
	{disable_description_edit}
	on:download={download}
	on:restart={restart}
	on:download_then_restart={download_then_restart}
	on:send={({ detail }) => send(detail)}
	on:send_attempt_without_description={() => (more_open = true)}
	send_without_description={true}
/>
