import { openai } from '$lib/openai';
import {
	error,
	json
} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({
	request
}) => {
	return json(
		await openai
			.createChatCompletion(
				await request.json()
			)
			.then((r) => {
				if (r.statusText === 'OK') {
					return r.data;
				} else {
					console.log(
						r.status,
						r.data
					);
					throw error(
						r.status,
						JSON.stringify(r.data)
					);
				}
			})
			.catch((e) => {
				console.log(e.response.data);
				throw error(500, e.response.data)
			})
	);
}) satisfies RequestHandler;
