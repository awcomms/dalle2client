import { PUBLIC_OPENAI } from '$env/static/public';
import { getOpenAI } from '$lib/openai';
import { json } from '@sveltejs/kit';
import type { CreateCompletionRequest } from 'openai';
import { get } from 'svelte/store';
import type { RequestHandler } from './$types';

export const POST = (async ({ request }) => {
	const params: CreateCompletionRequest =
        await request.json();
    const res = await getOpenAI(PUBLIC_OPENAI)?.createCompletion(params).then(r => r.data).catch(e => ({error: e}))
    return json(res)
}) satisfies RequestHandler;
