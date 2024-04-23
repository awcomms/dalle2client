import { get_openai } from "$lib/openai";
import type { ImageGenerateParams } from "openai/resources/images.mjs";

export const create = async (key: string, {prompt, n, size}: {prompt: string, n: number, size: ImageGenerateParams['size']}) => {
        const openai = get_openai(key)
        return openai.images.generate(
            {
                prompt,
                n,
                size,
                model: 'dall-e-3',
                quality: 'hd',
                style: 'vivid',
                response_format: 'b64_json'
            }
        );
};