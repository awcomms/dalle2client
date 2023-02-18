import { arrayStore } from '$lib/store';
import type { Chat } from './types';

export const descriptions = arrayStore<string>(
	'descriptions',
	[]
);
export const chats = arrayStore<Chat>('chats', []);
