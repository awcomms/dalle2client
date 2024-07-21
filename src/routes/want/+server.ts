import { groq } from "$lib/util/groq";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { user1, user2 } = await request.json();
  const result = (await groq.chat.completions.create({model: "llama3-70b-8192", messages: [{content: `concisely point out only the overlaps between these 2 users' desires, if there is no overlap, simply say so, and nothing else:
    user1: ${user1}
    user1: ${user2}`, role: 'user'}]})).choices[0].message.content
  return new Response(result)
}
