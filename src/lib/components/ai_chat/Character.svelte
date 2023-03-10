<script lang="ts">
	import { getOpenAI } from '$lib/openai';
	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest
	} from 'openai';
	import {
		arrayStore,
		openai_key
	} from '$lib/store';
	import { openai_key_modal_open } from './store';
	import Interface from './Interface.svelte';
	import { download_blob } from '$lib/util';

	$: openai = getOpenAI($openai_key);

	const prefix = `Consider a chat represented by the following JSON array, wherein all elements of the array are messages sent by the value of the \`name\` member of the element
-
except for any element with its \`role\` member set to \`system\`,
which we shall call a description element,
whose \`content\` member describes the sender of messages,
that follow the description element and have their role member set to \`assistant\`:\n\n`;

	let loading = false,
		chat_container: HTMLElement,
		content = '',
		user = 'You',
		name = 'Character',
		messages: ChatCompletionRequestMessage[] =
			[],
		parameters: CreateChatCompletionRequest =
			{
				model: 'text-davinci-003',
				temperature: 1,
				top_p: 1,
				messages: [],
				presence_penalty: 0,
				frequency_penalty: 0
			};

	const join = () => {
		return `${prefix}${JSON.stringify(messages)}`
	}

	const save = () => {
		download_blob(new Blob([join()]), `Chat between user ${user} and AI simulated entity ${name}`)
	}

	const send = async () => {
		loading = true;
		if (!content) {
			loading = false;
			return;
		}
		if (!openai) {
			loading = false;
			$openai_key_modal_open = true;
			return;
		}
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
			console.log('uhhh');
		}
		console.log(request);
		await openai
			.createChatCompletion(request)
			.then((r) => {
				console.log('ha');
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
			.finally(() => {
				loading = false;
				content = '';
			});
	};
</script>

<Interface
	bind:name
	bind:loading
	bind:parameters
	bind:chat_container
	bind:messages
	bind:content
	on:save={save}
	on:send={send}
/>
