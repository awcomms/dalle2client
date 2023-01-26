export const create_blob = (bytes: Uint8Array, type: string): Blob => {
	const blob_options = { type: '' };
	if (type) {
		blob_options.type = type;
	}
	return new Blob([bytes], blob_options);
};
