import { json } from '@sveltejs/kit';
import { handle_server_error } from '$lib/util/handle_server_error';
import { openai } from '$lib/util/openai.js';
import { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const args = await request.json();
		// console.debug('--args', args);
		// console.debug('--args.message', args.messages[1]);
		const res = await openai.chat.completions.create(args);
		// console.debug('--res', res);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
