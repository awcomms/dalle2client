import { encode } from "gpt-3-encoder";
import { text } from '@sveltejs/kit'
import type { RequestHandler } from "./$types"

export const POST = (async ({ request }) => {
    const t = await request.text()
    return text(String(encode(t).length))
}) satisfies RequestHandler;