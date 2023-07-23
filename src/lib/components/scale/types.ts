import type { Options } from '$lib/util/image/scale';
import type { Res } from 'scale-image';

export interface Product {
	name: string,
}

export interface Error {
	error: string,
	date: Date
}

export interface Entry {
	options_open: boolean
	name: string,
	error?: Error,
	width: number,
	height: number,
	result?: Res,
	size: number,
	ratio: number,
	id: number,
	file: File,
	options: Options
}