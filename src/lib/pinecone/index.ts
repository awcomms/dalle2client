import { PINECONE } from '$env/static/private';
import { PineconeClient } from '@pinecone-database/pinecone';

const pinecone =
	new PineconeClient();
await pinecone.init({
	environment: 'YOUR_ENVIRONMENT',
	apiKey: PINECONE
});
