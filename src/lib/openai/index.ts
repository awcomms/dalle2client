import { OPENAI } from '$env/static/private';
import { OpenAIApi } from 'openai';
import { Configuration } from 'openai/dist/configuration';

export const openai = new OpenAIApi(new Configuration({apiKey: OPENAI}))
