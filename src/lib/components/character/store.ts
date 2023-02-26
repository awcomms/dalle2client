import { arrayStore } from '$lib/store';
import type { Chat, Description } from './types';

export const descriptions = arrayStore<Description>(
	'descriptions',
	[]
);
export const chats = arrayStore<Chat>('chats', []);
