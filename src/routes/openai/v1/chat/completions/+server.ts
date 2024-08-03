import { json } from '@sveltejs/kit';
import { groq } from '$lib/util/groq';
import { handle_server_error } from '$lib/util/handle_server_error';
import type { RequestHandler } from './$types';
import { allowedOrigins } from '$lib/constants';

const isAllowedOrigin = (origin: string | null): boolean => {
  if (!origin) return true; // Same-origin requests or requests without an Origin header
  return allowedOrigins.some(allowed => {
    if (allowed.includes('*')) {
      const regex = new RegExp('^' + allowed.replace('*', '.*') + '$');
      return regex.test(origin);
    }
    return allowed === origin;
  });
};

const getCorsHeaders = (origin: string | null): Record<string, string> => {
  if (isAllowedOrigin(origin)) {
    return {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Vary': 'Origin'
    };
  }
  return {};
};

export const OPTIONS: RequestHandler = ({ request }): Response => {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  return new Response(null, { headers: corsHeaders });
};

export const POST: RequestHandler = async ({ request }) => {
	try {
		const args = await request.json();
		if (!args.model) args.model = 'llama-3.1-70b-versatile';
		const res = await groq.chat.completions.create(args);
		return json(res);
	} catch (e) {
		throw handle_server_error(request, e, '');
	}
};