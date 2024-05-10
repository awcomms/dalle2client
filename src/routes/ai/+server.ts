import { ai_index } from '$lib/constants';
import { client } from '$lib/util/redis';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, locals }) => {
	const { p, n } = await request.json();
	const id = await `ai_${await client.incr('last_ai_id')}`;
	await client.json.set(id, '$', { p, n, u: locals.user });
	return new Response(id);
};

export const GET: RequestHandler = async ({ url }) => {
	const q = url.searchParams.get('q') || '';
	const u = url.searchParams.get('u') || '';
	const query = `${q}${u ? ` u:"${u}"` : ''}`
	const res = await client.ft.search(ai_index, q, { RETURN: ['n', 'u'], LIMIT: { from: 0, size: 7 } });
	return json(res.documents.map(d => ({id: d.id, text: ``})))
};
