import { arrayStore, booleanStore } from '$lib/store';

export const descriptions = arrayStore<string>(
	'descriptions',
	[]
);
export const chats = arrayStore<string>('chats', []);
export const submit_on_enter = booleanStore('submit_on_enter', false)
export const openai_key_modal_open = booleanStore('openai_key_modal_open', false)
