import { booleanStore } from '$lib/util/store';

export const include_factor =
	booleanStore(
		'rescale_include_factor'
	);
export const include_date =
	booleanStore(
		'rescale_include_date'
	);
export const utc_date = booleanStore('rescale_utc_date')