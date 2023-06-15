import currencies from '$lib/paystack/currencies';
import { get_banks } from '$lib/paystack/get_banks';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad =
	async () => {
		return {
			banks: await get_banks(
				currencies.cedi
			).then((r) => r.data)
		};
	};
