import { encode } from "gpt-3-encoder";
import { text } from '@sveltejs/kit'
import type { RequestHandler } from "./$types"

export const GET = (async ({ request }) => {
    const t = await request.text()
    const r = encode(t).length
    return text(String(r))
}) satisfies RequestHandler;