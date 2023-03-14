// import { openai } from '$lib/openai';
import { text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { OPENAI } from '$env/static/private';

export const POST = (async ({
	request
}) => {
	const {
		audio,
		type,
		model
	}: {
		audio: Uint8Array;
		type: string;
		model: string;
	} = await request.json();
	const form = new FormData();
	form.append(
		'file',
		new File(
			[new Blob([audio])],
			'file',
			{
				type
			}
		)
	);
	form.append('model', model);
	return text(
		await fetch(
			'https://api.openai.com/v1/audio/transcriptions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${OPENAI}`
				},
				body: form
			}
		).then(async (r) => {
			const text = await r.text();
			if (
				String(r.status).startsWith(
					'2'
				)
			) {
				console.log(text);
				let res;
				try {
					res = JSON.parse(text);
				} catch {
					console.log(
						'non json',
						text
					);
					return;
				}
				return res.text;
			} else {
				console.error(text);
			}
		})
		// await openai
		// 	.createTranscription(
		// 		new File(
		// 			[new Blob([audio])],
		// 			'file',
		// 			{
		// 				type
		// 			}
		// 		),
		// 		model
		// 	)
		// 	.then((r) => r.data.text)
	);
}) satisfies RequestHandler;
