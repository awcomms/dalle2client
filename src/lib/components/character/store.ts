import { arrayStore } from '$lib/store';

export const descriptions = arrayStore<string>(
	'descriptions',
	[]
);
export const chats = arrayStore<string>('chats', []);
