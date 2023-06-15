import { send_to_momo } from "$lib/paystack/send_to_momo";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async({ request }) => {
    const { data } = await request.json()
    if (data.successful && data.metadata.purpose === 'send_to_momo') {
        send_to_momo(data.metadata.args)
    }
    return new Response(null, {status: 200})
}