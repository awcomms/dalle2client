import {
	scale as _scale,
	get_filter_type
} from 'scale-image';
import type { Res } from 'scale-image';
export type FilterType =
	| 'Nearest'
	| 'Triangle'
	| 'CatmullRom'
	| 'Gaussian'
	| 'Lanczos3';

export interface Options {
	width: number;
	height: number;
	exact: boolean;
	bytes: Uint8Array;
	extension: string;
	filter_type: FilterType;
}

export const parse_res = (
	r: Res
): [Uint8Array, string, string] => {
	return [r.bytes, r.extension, r.mime_type];
};

export const scale = async (
	options: Options
): Promise<Res> => {
	return new Promise((resolve, reject) => {
		let filter_type = 0;
		try {
			filter_type = get_filter_type(options.filter_type);
		} catch (e) {
			console.log(e);
			reject(e);
		}
		try {
			resolve(
				_scale(
					options.width,
					options.height,
					options.exact,
					options.bytes,
					options.extension,
					filter_type
				)
			);
			console.log('de');
		} catch (e) {
			console.log(e);
			reject(e);
		}
	});
};
