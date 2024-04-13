import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from '../$types';

export const PUT: RequestHandler = async ({ request, params, locals }) => {
	console.info('put ./');
    const u = await client.json.get(params.id, { path: 'u' });
    if (u !== locals.user) throw error(401, 'logged in user does not own this character')
	const p = await request.json();
	await client.json.put(params.id, '$.p', params);
	return new Response();
};
