// import { openai } from '$lib/openai';
// import ffmpeg from 'fluent-ffmpeg';
// import Waveform from 'node-waveform';

import type { RequestHandler } from "./$types";

// const outputPath = 'output.mp3';

// const get_chunks = (blob: Blob) => {
// 	const chunks = [];

// 	ffmpeg(blob)
// 		.output(outputPath)
// 		.noVideo()
// 		.audioCodec('libmp3lame')
// 		.on('end', function () {
// 			console.log(
// 				'Finished processing'
// 			);
// 			const waveform = new Waveform({
// 				file: outputPath,
// 				samples: 10000,
// 				channels: 1,
// 				bits: 16,
// 				bitRate: 128000,
// 				format: 'mp3'
// 			});
// 			waveform.getBuffer(function (
// 				err,
// 				buffer
// 			) {
// 				if (err) {
// 					console.log(err);
// 					return;
// 				}
// 				const duration =
// 					waveform.getDuration();
// 				const chunkSize = 3;
// 				for (
// 					let i = 0;
// 					i < duration;
// 					i += chunkSize
// 				) {
// 					chunks.push(
// 						buffer.slice(
// 							(i *
// 								waveform.sampleRate *
// 								waveform.channels *
// 								waveform.bits) /
// 								8,
// 							((i + chunkSize) *
// 								waveform.sampleRate *
// 								waveform.channels *
// 								waveform.bits) /
// 								8
// 						)
// 					);
// 				}
// 				console.log(chunks);
// 			});
// 		})
// 		.run();
// };

// const transcribe = () => {
// 	openai.createTranscription()
// }