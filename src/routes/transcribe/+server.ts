import { json, text } from '@sveltejs/kit';
import { handle_server_error } from '$lib/util/handle_server_error';
import { groq } from '$lib/util/groq';

export const POST = async ({ request }) => {
	try {
		const form = await request.formData();
		const file = form.get('file') as File;
		if (!file) {
			throw new Error('No file provided');
		}
		const result = await groq.audio.transcriptions.create({
			file: new File([file], 'file'),
			model: 'whisper-large-v3',
			response_format: 'text'
		});
		return text(result.text);
	} catch (e) {
		throw handle_server_error(request, e);
	}
};
