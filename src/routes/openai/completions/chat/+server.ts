import { openai } from "$lib/openai";
import type { RequestHandler } from "./$types";

export const POST = (() => {
    openai
    return new Response(null, {status: 200})
}) satisfies RequestHandler