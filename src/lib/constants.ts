export const protected_routes = [{ r: /\/ai/, m: ['post'] }];
export const user_id_prefix = 'u_';
export const user_index = 'u';
export const ai_id_prefix = 'ai_';
export const ai_index = 'ai';
export const embedding_model = 'text-embedding-3-large';
export const embedding_field_name = 'v';
export const items_per_page = 7;
export const embed_endpoint = 'https://fastembedserver.shuttleapp.rs/embeddings';
export const allowed_origins = [
	'https://udoflow.com',
	'https://*.udoflow.com',
	'https://udoflow.net',
	'https://*.udoflow.net',
	'http://localhost:4329'
];