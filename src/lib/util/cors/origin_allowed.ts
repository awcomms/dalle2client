import { allowed_origins } from '$lib/constants';

export const origin_allowed = (origin: string | null): boolean => {
	if (!origin) return true; // Same-origin requests or requests without an Origin header
	return allowed_origins.some((allowed) => {
		if (allowed.includes('*')) {
			const regex = new RegExp('^' + allowed.replace('*', '.*') + '$');
			return regex.test(origin);
		}
		return allowed === origin;
	});
};


