import { openai } from '$lib/openai';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = async ({
	request
}) => {
	try {
		return json(
			await openai
				.images.generate(
					await request.json()
				)
				.then((r) => r.data)
		);
	} catch (e) {
		console.error('openai images error', e)
		throw error(500)
	}
}