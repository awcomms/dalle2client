import { openai_key } from '$lib/store';
import type { CreateChatCompletionRequest } from 'openai';
import { get } from 'svelte/store';

export default (body: CreateChatCompletionRequest) =>
	fetch('https://api.openai.com/v1/chat/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${get(openai_key)}`
		},
		body: JSON.stringify(body)
	})
		.then((r) => {
			return r.text().then((text) => {
				if (String(r.status).startsWith('2')) {
					console.log('yes');
					try {
						return JSON.parse(text);
					} catch {
						throw new Error(text); //TODO
					}
				} else {
					console.log(r.status, text);
					throw new Error(String(r.status));
				}
			});
		})
		.then((res) => {
			return res.choices[0].message.content;
		});
