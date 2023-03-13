import { openai } from '$lib/openai';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST = (async ({
	request
}) =>
	json(
		await openai.createImage(
			await request.json()
		)
	)) satisfies RequestHandler;
