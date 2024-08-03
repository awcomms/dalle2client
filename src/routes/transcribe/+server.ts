import { text } from '@sveltejs/kit';
import { handle_server_error } from '$lib/util/handle_server_error';
import { groq } from '$lib/util/groq';
import Flac from 'libflacjs/dist/libflac.js';
import { Encoder } from 'libflacjs/lib/encoder';
import flac_utils from 'libflacjs/lib/utils';

export const POST = async ({ request }) => {
	try {
		const form = await request.formData();
		const file = form.get('file') as File;
		if (!file) {
			throw new Error('No file provided');
		}
		const encoder = new Encoder(Flac, {
			sampleRate: 44100, // number, e.g. 44100
			channels: 1, // number, e.g. 1 (mono), 2 (stereo), ...
			bitsPerSample: 16, // number, e.g. 8 or 16 or 24
			compression: 5, // number, value between [0, 8] from low to high compression
			verify: true, // boolean (OPTIONAL)
			isOgg: false // boolean (OPTIONAL), if encoded FLAC should be wrapped in OGG container
		});
		const buffer = await file.arrayBuffer();
		const newBuffer = new ArrayBuffer(Math.ceil(buffer.byteLength / 4) * 4);
		const newUint8Array = new Uint8Array(newBuffer);
		newUint8Array.set(new Uint8Array(buffer));
		encoder.encode(new Int32Array(newUint8Array));
		encoder.encode();
		if (!encoder.metadata) throw new Error('Getting text from speech failed');
		const result = await groq.audio.transcriptions.create({
			file: new File([flac_utils.exportFlacFile([encoder.getSamples()], encoder.metadata, false)], 'file', {
				type: 'audio/x-flac'
			}),
			model: 'whisper-large-v3',
			response_format: 'text'
		});
		return text(result.text);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
