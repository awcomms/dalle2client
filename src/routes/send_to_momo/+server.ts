import { send_to_momo } from '$lib/paystack/send_to_momo';
import type { RequestHandler } from './$types';

export const POST: RequestHandler =
	async ({ request }) => {
		const {data} =
			await request.json();
		if (
			request.referrer.match(
				/^https:\/\/(?:[a-zA-Z0-9-]+\.)*apexlinks\.org/
			)
		) {
			console.log('valid', data);
			send_to_momo(
				data.metadata.args
			);
			return new Response(null, {
				status: 200
			});
		} else {
			return new Response(null, {
				status: 401
			});
		}
	};
