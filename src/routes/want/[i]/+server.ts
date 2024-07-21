import { client } from "$lib/util/redis"

export const load: PageServerLoad = ({params}) => {
    return {
        client.json.get(params.i)
    }
}