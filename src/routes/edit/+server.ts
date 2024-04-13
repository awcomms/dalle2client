import { openai } from '$lib/util/openai';
import { client } from '$lib/util/redis';
import { server_function } from '$lib/util/server_function';
import { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	return await server_function(async () => {
		const input = await request.text();
		await client.json.set(locals.user, 't', input);
		await client.json.set(locals.user, 'v', await openai.embeddings.create({ input, model: "text-embedding-3-large" }))
	}, request);
};
