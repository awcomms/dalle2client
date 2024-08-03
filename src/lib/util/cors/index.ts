import { allowedOrigins } from '$lib/constants';

const isAllowedOrigin = (origin: string | null): boolean => {
	if (!origin) return true; // Same-origin requests or requests without an Origin header
	return allowedOrigins.some((allowed) => {
		if (allowed.includes('*')) {
			const regex = new RegExp('^' + allowed.replace('*', '.*') + '$');
			return regex.test(origin);
		}
		return allowed === origin;
	});
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
	// if (isAllowedOrigin(origin)) {
	return {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		Vary: 'Origin'
	};
	// }
	return {};
};
