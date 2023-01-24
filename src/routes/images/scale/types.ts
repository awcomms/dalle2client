import type { Res } from 'scale-image';
export interface Options {
	width: number;
	height: number;
	exact: boolean;
	bytes: Uint8Array;
	extension: string;
	filter_type: FilterType;
}

export interface Resized {
	file_name: string
	name: string,
	bytes: Uint8Array
}

export interface Entry {
	result?: Res,
	size: number,
	id: number,
	file: File,
	options: Options
}

export type FilterType = 'Nearest' | 'Triangle' | 'CatmullRom' | 'Gaussian' | 'Lanczos3';
