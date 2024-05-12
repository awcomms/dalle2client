import {
	arrayStore,
	booleanStore
} from '$lib/store';
import { stringStore } from '$lib/util/store';

export const system = stringStore('system', 'You always give short responses')

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
