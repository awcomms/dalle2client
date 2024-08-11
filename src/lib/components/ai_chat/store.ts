import { numberStore, stringStore,arrayStore,
	booleanStore } from '$lib/util/store';

export const system = stringStore('system', 'You always give short responses. You always use BibleHub links for Bible verses')
export const seed = numberStore('number', 144)
export const key = stringStore('key', '')
export const base = stringStore('base', 'https://api.groq.com/openai/v1/')
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
