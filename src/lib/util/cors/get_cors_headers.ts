import { origin_allowed } from './origin_allowed';

export const get_cors_headers = (origin: string | null): Record<string, string> => {
	// if (origin_allowed(origin)) {
		return {
			'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Credentials': "true",
			'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
			'Access-Control-Allow-Headers':
				'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
			// Vary: 'Origin'
		};
	// }
	return {};
};
