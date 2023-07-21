<script lang="ts">
	export let hide_settings = false,
		disable_name_edit = false,
		disable_description_edit = false,
		description = '';

	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest,
		CreateChatCompletionResponse
	} from 'openai';
	import axios from 'axios';
	// import { v4 } from 'uuid';
	import Interface from './Interface.svelte';
	import { download_blob } from '$lib/util';
	import { notify } from '$lib/util/notify';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';

	let loading = false,
		// id = v4(),
		_content = '',
		more_open = false,
		chat_container: HTMLElement,
		name = 'Assistant',
		user = 'You',
		messages: ChatCompletionRequestMessage[] =
			[],
		parameters: CreateChatCompletionRequest;

	const download = () =>
		download_blob(
			new Blob([
				JSON.stringify(messages)
			]),
			`Chat between user ${user} and GPT3.5 AI Assistant ${name}`
		);

	const restart = () => {
		messages = [];
	};

	const download_then_restart =
		() => {
			restart();
			download();
		};

	const send = async (
		content: string
	) => {
		loading = true;
		let request = parameters;
		request.messages = [
			{
				role: 'system',
				content: description
			},
			...messages,
			{
				role: 'user',
				content,
				name: user
			}
		];

		await axios
			.post<CreateChatCompletionResponse>(
				'/openai/chat',
				request
			)
			.then((r) => {
				const first_choice =
					r.data.choices[0];
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
				if (
					first_choice.finish_reason ===
					'length'
				) {
					notify({
						kind: 'warning',
						title:
							'Conversation limit reached',
						button: {
							text: 'Restart conversation',
							icon: Restart,
							act: restart
						}
					});
				}
				messages = [
					...messages,
					{
						role: 'user',
						content,
						name: user
					},
					{
						...first_choice.message,
						name
					}
				];
				chat_container.scrollTop =
					chat_container.scrollHeight;
				_content = '';
			})
			.catch((e) =>
				notify({
					kind: 'error',
					title: e
				})
			)
			.finally(
				() => (loading = false)
			);
	};
</script>

<Interface
	bind:name
	bind:content={_content}
	bind:loading
	bind:messages
	bind:description
	bind:parameters
	bind:chat_container
	bind:more_open
	settings_heading="AI Assistant settings"
	name_label="Give the Assistant a name"
	description_label="Tell the Assistant how to behave"
	{hide_settings}
	{disable_name_edit}
	{disable_description_edit}
	on:download={download}
	on:restart={restart}
	on:download_then_restart={download_then_restart}
	on:send={({ detail }) =>
		send(detail)}
	on:send_attempt_without_description={() =>
		(more_open = true)}
	allow_without_description={true}
/>
