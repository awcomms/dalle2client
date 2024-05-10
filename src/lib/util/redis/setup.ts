import { client } from '.';
import { ai_id_prefix, ai_index, user_id_prefix, user_index } from '$lib/constants';
import { SchemaFieldTypes, VectorAlgorithms } from 'redis';

export const setup = async () => {

	// create user_index
	try {
		await client.ft.create(
			user_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				},
			},
			{
				ON: 'JSON',
				PREFIX: user_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error(`redis create ${user_index} error:`, e);
	}

    // create ai_index
	try {
		await client.ft.create(
			ai_index,
			{
				'$.v': {
					AS: 'v',
					type: SchemaFieldTypes.VECTOR,
					ALGORITHM: VectorAlgorithms.FLAT,
					TYPE: 'FLOAT32',
					DIM: 3072,
					DISTANCE_METRIC: 'COSINE'
				},
				'$.u': {
					AS: 'u',
					type: SchemaFieldTypes.TEXT
				},
				'$.n': {
					AS: 'n',
					type: SchemaFieldTypes.TEXT
				},
				'$.p.model': {
					AS: 'm',
					type: SchemaFieldTypes.TEXT
				},
			},
			{
				ON: 'JSON',
				PREFIX: ai_id_prefix,
				NOHL: true
			}
		);
	} catch (e) {
		console.error(`redis create ${ai_index} error:`, e);
	}
};
