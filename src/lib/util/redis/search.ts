import { embedding_field_name, items_per_page } from '$lib/constants';
import type { SearchOptions } from 'redis';
import { client } from '.';
import { slim } from '$lib/util/redis/shape/slim';
// import type { SearchDocument, SearchDocumentValue, SearchResponse } from '$lib/types';
export interface SearchParams {
	index: string;
	page?: number;
	count?: boolean;
	query?: string;
	options?: SearchOptions;
	B?: Buffer;
}

export const search = async ({
	index,
	page = 0,
	count,
	options = {},
	B,
	query = '*'
}: SearchParams) => {
	options.DIALECT = 3;

	if (count) {
		options.LIMIT = { from: 0, size: 0 };
	} else if (page) {
		// options.LIMIT = { from: page > 1 ? (page - 1) * items_per_page : 0, size: items_per_page };
	}

	if (B) {
		const hybrid = query && query !== '*';
		if (hybrid) query = `(${query})`;
		query += `=>[KNN ${(page || 1) * items_per_page} @${embedding_field_name} $B${hybrid ? ' HYBRID_POLICY ADHOC_BF' : ''}]`;
		options.PARAMS = {
			B
		};
		options.SORTBY = {
			BY: `__${embedding_field_name}_score`,
			DIRECTION: 'ASC'
		};
	} else {
		// options.SORTBY = {
		// 	BY: '__score',
		// 	DIRECTION: 'DESC'
		// };
	}

	const res = await client.ft.search(index, query, options);
	res.documents = res.documents.map((r) => {
		return { ...r, value: slim(r.value, true) };
	});
	return { ...res, page };
};