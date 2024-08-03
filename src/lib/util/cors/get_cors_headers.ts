export const get_cors_headers = (origin: string | null): Record<string, string> => {
	// if (isAllowedOrigin(origin)) {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		// Vary: 'Origin'
	};
	// }
	// return {};
};