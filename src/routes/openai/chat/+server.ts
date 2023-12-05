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
		await openai.chat
			.completions.create(
				await request.json()
			)
			.then((r) => {
				if (r.statusText === 'OK') {
					return r.data;
				} else {
					console.error(
						r.status,
						r.data
					);
					throw error(
						500,
						'An error occured on our side. Please retry'
					);
				}
			})
			.catch((e) => {
				console.log(e.response.data);
				throw error(500, e.response.data)
			})
	);
}) satisfies RequestHandler;
