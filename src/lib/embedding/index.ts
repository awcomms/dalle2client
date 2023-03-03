import { PINECONE as apiKey } from '$env/static/private';
import { post } from '$lib/fetch';
import type { QueryRequest } from '@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch';

const base_url =
	'https://entries-bec163d.svc.us-east1-gcp.pinecone.io';

export const add = ({
	namespace,
	vectors
}: {
	vectors: {
		id: string;
		values: number[];
		metadata?: object;
	};
	namespace: string;
}) =>
	post(
		`${base_url}/vectors/upsert`,
		{
			vectors, namespace
		},
		{ accept: 'application/json', 'Api-Key': apiKey }
	);

export const query = async (queryRequest: QueryRequest) =>
	post(`${base_url}/vectors/query`, queryRequest, {
		accept: 'application/json',
		'Api-Key': apiKey
	});
