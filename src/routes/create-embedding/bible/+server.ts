// import type { RequestHandler } from './$types';
// import bible from '$lib/bible.json';
// import fs from 'fs';
// import { openai } from '$lib/openai';
// import { text } from '@sveltejs/kit';
// // import https from 'https';
// import throttledQueue from 'throttled-queue';

// const openai = get_

// interface Verse {
// 	book: string;
// 	chapter: string;
// 	verse: number;
// 	text: string;
// 	embedding?: number[];
// }

// // const httpsAgent = new https.Agent({
// // 	keepAlive: false,
// // 	rejectUnauthorized: false
// // });

// const throttle = throttledQueue(
// 	3,
// 	1000,
// 	true
// );

// export const POST = (async () => {
// 	Promise.all(
// 		bible
// 			.slice(0, 2)
// 			.map(async (verse: Verse) =>
// 				throttle(async () => ({
// 					...verse,
// 					text_embedding:
// 						await openai
// 							.embeddings.create({
// 								model:
// 									'text-embedding-ada-002',
// 								input: [verse.text]
// 							})
// 							.then((r) => {
// 								return r.data[0]
// 									.embedding;
// 							}),
// 					verse_embedding:
// 						await openai
// 							.embeddings.create({
// 								model:
// 									'text-embedding-ada-002',
// 								input: [
// 									JSON.stringify(
// 										verse
// 									)
// 								]
// 							})
// 							.then((r) => {
// 								return r.data.data[0]
// 									.embedding;
// 							})
// 				}))
// 			)
// 	).then((r) => {
// 		fs.writeFileSync(
// 			'bible_embeddings.json',
// 			JSON.stringify(r)
// 		);
// 		console.log('done');
// 	});
// 	return text('done');
// }) satisfies RequestHandler;
