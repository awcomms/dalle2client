import { PUBLIC_OPENAI } from '$env/static/public';
import { OpenAIApi } from 'openai';
import { Configuration } from 'openai/dist/configuration';

export const openai = new OpenAIApi(
	new Configuration({
		apiKey: PUBLIC_OPENAI
	})
);
