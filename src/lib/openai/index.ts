import { OpenAIApi } from 'openai';
import { Configuration } from 'openai/dist/configuration';

export const getOpenAI = (apiKey: string) => {
	return apiKey
		? new OpenAIApi(
				new Configuration({
					apiKey
				})
		  )
		: null;
};
