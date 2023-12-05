import { openai } from '$lib/openai';
import {
	error,
	json
} from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({
	request
}) => {
	try {
		return json(await openai.chat
			.completions.create(
				await request.json()
			));
	} catch (e) {
		console.error(e)
		throw error(500)
	}

}
