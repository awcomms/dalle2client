import type { CompletionCreateParams } from "openai/resources/completions.mjs"

export type Character = {
    n: string, //name
    u: string, //creator user
    p: CompletionCreateParams, //parameters
}