import type { Res } from 'scale-image';
export interface Options {
	width: number;
	height: number;
	exact: boolean;
	bytes: Uint8Array;
	extension: string;
	filter_type: FilterType;
}

export interface Error {
	error: unknown,
	date: Date
}

export interface Entry {
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

export type FilterType = 'Nearest' | 'Triangle' | 'CatmullRom' | 'Gaussian' | 'Lanczos3';
