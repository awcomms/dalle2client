import { openai } from '$lib/openai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({
	request
}) => {
	return json(
		await openai
			.createEmbedding({
				model:
					'text-embedding-ada-002',
				input: [await request.text()]
			})
			.then((r) => {
				return r.data.data[0]
					.embedding;
			})
	);
}) satisfies RequestHandler;
