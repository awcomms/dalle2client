export type ValidMode =
	| 'text'
	| 'srt'
	| 'subtitle';

export interface Mode {
	label: string;
	value: ValidMode;
}

export interface Result {
	name: string;
	text?: string;
	blob: Blob;
}
