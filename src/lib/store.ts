import { browser } from '$app/environment';
// import { req } from '$lib/util';
// import type { User } from './types';
import { v4 as uuidv4 } from 'uuid';
import { writable, derived } from 'svelte/store';

export const booleanStore = (
	key = uuidv4(),
	initialValue = false
) => {
	let previousValue: boolean;
	if (browser) {
		const fromLocalStorage = localStorage.getItem(key);
		if (fromLocalStorage) {
			previousValue = Boolean(fromLocalStorage);
		} else {
			previousValue = initialValue;
		}
	} else {
		previousValue = initialValue;
	}
	const s = writable<boolean>(previousValue);
	if (browser)
		s.subscribe((v) => localStorage.setItem(key, String(v)));
	return s;
};

export const numberStore = (
	key = uuidv4(),
	initialValue = 0
) => {
	let previousValue: number;
	if (browser) {
		const fromLocalStorage = localStorage.getItem(key);
		if (fromLocalStorage) {
			previousValue = Number(fromLocalStorage);
			// if (isNaN(previousValue)) ...
		} else {
			previousValue = initialValue;
		}
	} else {
		previousValue = initialValue;
	}
	const s = writable<number>(previousValue);
	if (browser)
		s.subscribe((v) => localStorage.setItem(key, String(v)));
	return s;
};

export const stringStore = (
	key = uuidv4(),
	initialValue = ''
) => {
	let previousValue: string;
	if (browser) {
		previousValue =
			localStorage.getItem(key) || initialValue;
	} else {
		previousValue = initialValue;
	}
	const s = writable<string>(previousValue);
	if (browser)
		s.subscribe((v) => localStorage.setItem(key, v));
	return s;
};

export const arrayStore = <Type>(
	key = uuidv4(),
	initialValue: Type[] = []
) => {
	let previousValue: Array<Type>;
	if (browser) {
		const fromLocalStorage = localStorage.getItem(key);
		if (fromLocalStorage) {
			try {
				previousValue = JSON.parse(fromLocalStorage);
			} catch {
				previousValue = initialValue;
			}
		} else {
			previousValue = initialValue;
		}
	} else {
		previousValue = initialValue;
	}
	const s = writable<Type[]>(previousValue);
	if (browser)
		s.subscribe((v) =>
			localStorage.setItem(key, JSON.stringify(v))
		);
	return s;
};

export const objectStore = <Type = object>(
	key = uuidv4(),
	initialValue: Type
) => {
	let previousValue: Type;
	if (browser) {
		const fromLocalStorage = localStorage.getItem(key);
		if (fromLocalStorage) {
			try {
				previousValue = JSON.parse(fromLocalStorage);
			} catch {
				previousValue = initialValue;
			}
		} else {
			previousValue = initialValue;
		}
	} else {
		previousValue = initialValue;
	}
	const s = writable<Type>(previousValue);
	if (browser)
		s.subscribe((v) =>
			localStorage.setItem(key, JSON.stringify(v))
		);
	return s;
};

export const loginOpen = booleanStore('loginOpen');

export const previousPage = stringStore('previousPage', '/');
export const newUser = booleanStore('newUser');
export const users = arrayStore('users', []);
export const userTags = arrayStore('userTags', []);
export const token = stringStore('token');

export const user = derived(token, ($token, set) => {
	set(null);
	// req<User>({User: {Auth: $token}}).then((r) => {
	// 	set(r)
	// });
});
