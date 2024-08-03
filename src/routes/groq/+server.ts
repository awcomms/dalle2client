import { json } from '@sveltejs/kit';
import { groq } from '../../lib/util/groq';
import { handle_server_error } from '$lib/util/handle_server_error';
import type { RequestHandler } from './$types';
import { allowed_origins } from '$lib/constants';
import { get_cors_headers } from '$lib/util/cors/get_cors_headers';

export const OPTIONS: RequestHandler = ({ request }): Response => {
	const origin = request.headers.get('origin');
	const corsHeaders = get_cors_headers(origin);

	return new Response(null, { headers: corsHeaders });
};

export const POST = async ({ request }) => {
	try {
		const args = await request.json();
		if (!args.model) args.model = 'llama-3.1-70b-versatile';
		const res = await groq.chat.completions.create(args);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e, '');
	}
};
