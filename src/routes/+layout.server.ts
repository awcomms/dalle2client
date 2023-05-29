import {
	VERCEL_GIT_REPO_OWNER,
	VERCEL_GIT_REPO_SLUG
} from '$env/static/private';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad =
	async ({ locals }) => {
		return {
			session:
				await locals.getSession(),
			github_repo: `https://github.com/${VERCEL_GIT_REPO_OWNER}/${VERCEL_GIT_REPO_SLUG}`
		};
	};
