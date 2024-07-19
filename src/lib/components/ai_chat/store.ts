import { numberStore, stringStore,arrayStore,
	booleanStore } from '$lib/util/store';

export const system = stringStore('system', 'You always give short responses')
export const seed = numberStore('number', 144)
export const groq_key = stringStore('groq_key', '')

export const descriptions =
	arrayStore<string>(
		'descriptions',
		[]
	);
export const chats =
	arrayStore<string>('chats', []);
export const send_on_enter =
	booleanStore(
		'send_on_enter',
		true
	);
export const openai_key_modal_open =
	booleanStore(
		'openai_key_modal_open',
		false
	);
