import axios from 'axios';

const model = 'whisper-1';

export const transcribe = async (
	file: Blob
) => {
	const form = new FormData();
	form.append('model', model);
	form.append('file', file);
	return await axios
		.post(
			'/openai/audio/transcriptions',
			form
		)
		.then((r) => r.data);
};
