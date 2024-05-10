import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => ({ user: await event.locals.user });
