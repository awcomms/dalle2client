import { add } from '$lib/embedding';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const req = await request.json();
	return await add(req)
		.then((res) => {
			return json(res);
		})
		.catch(async (e) => {
			// console.log(await res.text());
			console.log(e);
			throw error(500);
		});
}) satisfies RequestHandler;
