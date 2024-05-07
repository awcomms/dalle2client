import { client } from "$lib/util/redis"
import { error } from "@sveltejs/kit"
import { PageServerLoad } from "./$types"
import type { Character } from "$lib/types/character"

export const load: PageServerLoad = async({ params }) => {
    const c = await client.json.get(params.id, { path: ['n', 'u', 'p'] }) as Character
    if (!c) throw error(404, `character ${params.id} not found`)
    return c
}