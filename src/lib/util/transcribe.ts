import axios from 'axios';
import Groq from 'groq-sdk';
import { File } from 'groq-sdk/_shims/index.mjs';

const model = 'whisper-1';

export const transcribe = async (file: Blob, apiKey?: string) : Promise<string> => {
	if (apiKey) {
		return (
			await new Groq({ apiKey }).audio.transcriptions.create({
				file: new File([file], 'file'),
				model: 'whisper-large-v3',
				response_format: 'text'
			})
		).text;
	} else {
		const form = new FormData();
		form.append('file', file);
		return await axios.post<string>('/transcribe', form).then((r) => r.data);
	}
};
