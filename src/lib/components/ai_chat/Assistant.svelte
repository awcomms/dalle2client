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

	const save = () =>
		download_blob(
			new Blob([
				JSON.stringify(messages)
			]),
			`Chat between user ${user} and GPT3.5 AI Assistant ${name}`
		);

	const send = async () => {
		loading = true;
		let request = parameters;
		messages = [
			...messages,
			{
				role: 'user',
				content,
				name: user
			}
		];
		let token_count = await fetch(
			'/token_count',
			{
				method: 'POST',
				body: messages
					.map(
						(m) =>
							`${m.role} ${m.content} ${m.name}`
					)
					.join(' ')
			}
		).then(
			async (r) => await r.text()
		);
		if (Number(token_count) < 3700) {
			request.messages = messages;
		} else {
			console.log(token_count);
			console.log('uhhh');
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
							{ ...c.message, name }
						];
				}
				chat_container.scrollTop =
					chat_container.scrollHeight;
				content = '';
			})
			.catch((e) => console.log(e))
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
	on:save={save}
	on:send={send}
	on:send_attempt_without_description={() =>
		(settings_open = true)}
	allow_without_description={true}
/>
