<script lang="ts">
	import type {
		CreateChatCompletionResponse,
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest
	} from 'openai';
	import axios from 'axios';
	export let description_label =
		'Describe the character';
	import Interface from './Interface.svelte';
	import { download_blob } from '$lib/util';
	import { notify } from '$lib/util/notify';

	const prefix = `T`;

	let loading = false,
		chat_container: HTMLElement,
		description: string,
		settings_open = false,
		content = '',
		user = 'User',
		name = 'Character',
		messages: ChatCompletionRequestMessage[] =
			[],
		parameters: CreateChatCompletionRequest =
			{
				model: 'gpt-4',
				temperature: 1,
				top_p: 1,
				messages: [],
				presence_penalty: 0,
				frequency_penalty: 0
			};

	const empty_chat = `chat between ${user} and ${name}:\\n${user}: `;
	let chat = empty_chat;

	const download = () => {
		download_blob(
			new Blob([chat]),
			`chat between user ${user} and AI character, ${name}`
		);
	};

	const clear = () => {
		chat = empty_chat;
		messages = [];
	};

	const download_then_clear = () => {
		download();
		clear();
	};

	const update_chat = ({
		content,
		response
	}: {
		content: string;
		response: string;
	}) => {
		chat.concat(
			`${content}\\n${name}: ${response}\\n${user}: `
		);
		messages = [
			...messages,
			{ content, role: 'user' },
			{
				content: response,
				role: 'assistant'
			}
		];
	};

	// const to_chat = (
	// 	messages: ChatCompletionRequestMessage[]
	// ) => {
	// 	return `Consider two entities, "${user}" and "${name}". "${name}" is described as follows:\n
	// 	${description}\n
	// 	Consider the following conversation between ${user} and ${name}:\n
	// 	${messages
	// 		.filter(
	// 			(m) =>
	// 				m.role === 'assistant' ||
	// 				'user'
	// 		)
	// 		.map(
	// 			(m) =>
	// 				`\n\n${m.name}: ${m.content}`
	// 		)}
	// 	${name}:`;
	// };

	const send = async (
		content: string
	) => {
		loading = true;
		if (!content) {
			loading = false;
			return;
		}
		let request = parameters;

		request.messages = [
			{
				role: 'system',
				content: `description of ${name}: ${description}`
			},
			{
				role: 'user',
				content: `${chat}${content}\\n${name}:`,
				name: user
			}
		];
		await axios
			.post(
				'/token_count',
				request.messages
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
				if (token_count > 14000) {
					notify(
						'Please restart the session'
					);
					return;
				}
				console.info(
					'request',
					request
				);
				await axios
					.post<CreateChatCompletionResponse>(
						'/openai/chat',
						request
					)
					.then((r) => {
						console.info('haha!', r);
						let response =
							r.data.choices[0]
								.message?.content;
						if (!response) {
							console.error(
								'No message in first element of choices in response'
							);
							notify({
								kind: 'error',
								title: 'Please retry'
							});
							return;
						}
						update_chat({
							response
						});
						chat_container.scrollTop =
							chat_container.scrollHeight;
						content = '';
					})
					.catch(() => {
						notify({
							kind: 'error',
							title: 'Please retry'
						});
					});
			})
			.catch(() =>
				notify({
					kind: 'error',
					title: 'Please retry'
				})
			)
			.finally(() => {
				loading = false;
			});
	};
</script>

<Interface
	bind:name
	bind:loading
	bind:parameters
	bind:chat_container
	bind:description
	bind:messages
	bind:content
	bind:settings_open
	{description_label}
	on:send_attempt_without_description={() =>
		(settings_open = true)}
	on:download={download}
	on:download_then_clear={download_then_clear}
	on:clear={clear}
	on:send={({ detail }) =>
		send(detail)}
/>
