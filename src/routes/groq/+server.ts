import { json } from '@sveltejs/kit';
import { groq } from '../../lib/util/groq';
import { handle_server_error } from '$lib/util/handle_server_error';
// import { RequestHandler } from './$types';

export const POST = async ({ request }) => {
	try {
		const args = await request.json();
		console.debug('--args', args);
		if (!args.model) args.model = 'mixtral-8x7b-32768';
        console.debug('--args.message', args.messages[1])
		const res = await groq.chat.completions.create(args);
		console.debug('--res', res);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
