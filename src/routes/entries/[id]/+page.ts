import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const id = params.id;
	return { id };
}) satisfies PageLoad;
