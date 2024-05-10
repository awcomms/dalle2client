import { client } from '$lib/util/redis';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async ({ request, params, locals }) => {
    if (!client.exists(params.id)) throw error(404, `character ${params.id} not found`)
    const u = await client.json.get(params.id, { path: 'u' });
    if (u !== locals.user) throw error(401, 'logged in user does not own this character')
	const {p, n} = await request.json();
    if (p != null) await client.json.set(params.id, '$.p', p);
    if (n != null) await client.json.set(params.id, '$.n', n);
	return new Response();
};
