import { protected_routes } from '$lib/constants';
import { check } from '$lib/util/user/auth/check';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = async ({ event, resolve }) => {
	const r = protected_routes.find(
		(r) =>
			r.r.test(event.url.pathname) && (!r.m || r.m.includes(event.request.method.toLowerCase()))
	);
	if (!r) return resolve(event);
	if (!event.locals.user) {
		const code = event.cookies.get('code');
		if (!code) throw redirect(303, `/auth?t=${event.url.pathname}`);
		const id = check(code);
		if (!id) throw redirect(303, `/auth?t=${event.url.pathname}`);
		event.locals.user = id;
	}
	return resolve(event);
};
