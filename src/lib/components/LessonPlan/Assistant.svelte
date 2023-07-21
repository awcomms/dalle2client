<script lang="ts">
	export let _lesson_plan: _LessonPlan;

	import example from './example.json';
	import Interface from '$lib/components/ai_chat/Interface.svelte';
	import type {
		ChatCompletionRequestMessage,
		CreateChatCompletionRequest,
		CreateChatCompletionResponse
	} from 'openai';
	import axios from 'axios';
	import { createEventDispatcher } from 'svelte';
	import type { _LessonPlan } from '$lib/types';

	import { globals } from 'svelte/internal';

	const regex = /```([\s\S]*?)```/;

	const dispatch =
		createEventDispatcher();

	let content = '',
		loading = false,
		system = `You are in a webapp. You are an AI assistant that can help users create and edit lesson plans according to a specific template and encoded in valid JSON. You can chat with the user about the lesson plan currently being viewed by the user in the web app. Whenever the user seems to ask or suggest for an edit to the currently discussed lesson plan, or a completely new lesson plan, you begin your response with a lesson plan which completely follows the specified template, accurately encoded in valid JSON and enclosed in 3 backticks, after which, you indicate to the user that you have updated the lesson plan, giving any explanations of the changes as necessary. The template is demonstrated in the following example:
\`\`\`
${JSON.stringify(example)}
\`\`\`
`,
		parameters: CreateChatCompletionRequest =
			{
				model: 'gpt-3.5-turbo',
				messages: [
					{
						role: 'system',
						content: system
					}
				],
				temperature: 0.7,
				top_p: 1,
				presence_penalty: 0,
				frequency_penalty: 0
			};

	const count_tokens = async (
		s: string
	) => {
		return axios
			.post('/token_count', s)
			.then((r) => Number(r.data));
	};

	const message_token_length =
		async (
			m: ChatCompletionRequestMessage
		) => {
			return await count_tokens(
				`${m.role} ${m.content} ${m.name}`
			);
		};

	const messages_token_length =
		async (
			m: ChatCompletionRequestMessage[]
		) => {
			return await count_tokens(
				m
					.map(
						(m) =>
							`${m.role} ${m.content} ${m.name}`
					)
					.join(' ')
			);
		};

	const ms = async (
		m: ChatCompletionRequestMessage[]
	) => {
		/**One possible way to rewrite the function for appending strings to any array using only `while`, without `do`, is to use a flag variable to check if the loop should run at least once. For example:

```js
// define a function that takes an array and a string as arguments
function appendStrings(array, string) {
  // initialize a flag variable to true
  let flag = true;
  // use a while loop with the flag condition
  while (flag) {
    // prompt the user for input
    let input = prompt("Enter a string or press cancel to stop");
    // check if the input is null or empty
    if (input === null || input === "") {
      // set the flag to false to exit the loop
      flag = false;
    } else {
      // append the input and the string argument to the array
      array.push(input + string);
    }
  }
  // return the modified array
  return array;
}
```*/
		let res = [];
		for (let _m of m) {
		}
		console.log(import.meta.url);
		globals.__dirname =
			import.meta.url;
		await import(
			'gpt-3-encoder'
		).then((module) => {
			console.log(
				module.encode(s).length
			);
		});
	};

	const send = async () => {
		loading = true;
		parameters.messages = [
			...parameters.messages,
			{
				role: 'system',
				content: `The lesson plan currently being viewed is ${JSON.stringify(
					_lesson_plan
				)}`
			},
			{ role: 'user', content }
		];
		await _encode(
			JSON.stringify(
				parameters.messages
			)
		);
		console.log(_lesson_plan);
		console.log(
			JSON.stringify(
				parameters.messages
			)
		);
		await axios
			.post<CreateChatCompletionResponse>(
				'/openai/chat',
				parameters
			)
			.then((r) => {
				for (let c of r.data
					.choices) {
					if (c.message) {
						let _content =
							c.message.content;
						let match =
							_content.match(regex);
						if (match) {
							let l = match[1];
							console.log(l);
							dispatch(
								'edit',
								JSON.parse(l)
							);
							loading = false;
						} else {
							parameters.messages = [
								...parameters.messages,
								c.message
							];
						}
					}
				}
			})
			.catch((e) => console.log(e))
			.finally(
				() => (loading = false)
			);
	};
</script>

<Interface
	bind:loading
	bind:content
	bind:parameters
	bind:messages={parameters.messages}
	name="Assistant"
	on:send={send}
	send_without_description={false}
	hide_parameters={true}
/>
