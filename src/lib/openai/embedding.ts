import { openai_key } from '$lib/store';
import { get } from 'svelte/store';

export default (input: string) =>
	fetch('https://api.openai.com/v1/embeddings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${get(openai_key)}`
		},
		body: JSON.stringify({
			model: 'text-embedding-ada-002',
			input
		})
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
			return res.data[0].embedding;
		});
