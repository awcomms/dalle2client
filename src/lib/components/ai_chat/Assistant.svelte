<script lang="ts">
	export let hide_settings_button =
			false,
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

	let loading = false,
		// id = v4(),
		content = '',
		settings_open = false,
		chat_container: HTMLElement,
		name = 'Assistant',
		user = 'You',
		messages: ChatCompletionRequestMessage[] =
			[],
		parameters: CreateChatCompletionRequest;

	const set_description = (
		content: string
	) => {
		// if (messages.length && messages[messages.length -1].role === "system" && !confirm_description) {
		// 	confirm_description = true
		// 	confirm_description_change_dialog = true
		// }
		messages = [
			...messages,
			{ role: 'system', content }
		];
	};

	const download = () =>
		download_blob(
			new Blob([
				JSON.stringify(messages)
			]),
			`Chat between user ${user} and GPT3.5 AI Assistant ${name}`
		);

	const clear = () => {
		messages = [];
	};

	const download_then_clear = () => {
		clear();
		download();
	};

	const send = async () => {
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
			.post(
				'/token_count',
				messages
					.map(
						(m) =>
							`${m.role} ${m.content} ${m.name}`
					)
					.join(' ')
			)
			.then(async (r) => {
				const token_count = Number(
					r.data
				);
				if (
					Number(token_count) > 14000
				) {
					notify({
						kind: 'info',
						title:
							'Please restart the conversation to stay within the conversation limit'
					});
					return;
				}
				console.log(request);
				await axios
					.post<CreateChatCompletionResponse>(
						'/openai/chat',
						request
					)
					.then((r) => {
						for (let c of r.data
							.choices) {
							console.log(c);
							if (c.message)
								messages = [
									...messages,
									{
										...c.message,
										name
									}
								];
						}
						chat_container.scrollTop =
							chat_container.scrollHeight;
						content = '';
					})
					.catch((e) =>
						notify({
							kind: 'error',
							title: e
						})
					);
			})
			.catch(() =>
				notify({
					kind: 'error',
					title:
						'Encountered an error, please retry'
				})
			)
			.finally(
				() => (loading = false)
			);
	};
</script>

<Interface
	bind:name
	bind:content
	bind:loading
	bind:messages
	bind:description
	bind:parameters
	bind:chat_container
	bind:settings_open
	settings_heading="AI Assistant settings"
	name_label="Give the Assistant a name"
	description_label="Tell the Assistant how to behave"
	{hide_settings_button}
	{disable_name_edit}
	{disable_description_edit}
	on:download={download}
	on:clear={clear}
	on:download_then_clear={download_then_clear}
	on:send={send}
	on:send_attempt_without_description={() =>
		(settings_open = true)}
	allow_without_description={true}
/>
