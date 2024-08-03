import { origin_allowed } from './origin_allowed';

export const get_cors_headers = (origin: string | null): Record<string, string> => {
	if (origin_allowed(origin)) {
		return {
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Origin': origin || '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
			// Vary: 'Origin'
		};
	}
	return {};
};
