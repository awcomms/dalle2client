import type { Id } from "$lib/types";
import type { CreateCompletionRequest } from "openai";

export interface Parameters {
    model: string,
    prompts: string[],
    suffix?: string,
    max_tokens?: number,
    temperature?: number,
    top_p?: number,
    n?: number,
    stream?: boolean,
    logprobs?: number,
    echo?: boolean,
    stop?: string[],
    presence_penalty?: number,
    frequency_penalty?: number,
    best_of?: number,
    logit_bias?: Record<string, number>,
}


export interface _Chat {
    id: Id
    chat: string
    description: Id
}

export interface Description {
    id: Id,
    name: string,
    embedding?: number[]
    text: string
}

export interface Chat {
    id: string,
    chat: string,
    name: string,
    description: Id,
    parameters: CreateCompletionRequest
}