import { PUBLIC_OPENAI } from '$env/static/public';
import { OpenAIApi } from 'openai';
import { get } from 'svelte/store';
import { openai_key } from '$lib/store';
import { Configuration } from 'openai/dist/configuration';

const apiKey = get(openai_key);

export const openai = apiKey
	? new OpenAIApi(
			new Configuration({
				apiKey
			})
	  )
	: null;
