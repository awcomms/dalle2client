import { get_openai } from "$lib/openai";
import { notify } from "../notify";

export const create = async ({prompt, n, size}: {prompt: string, n: number, size: string}) => {
    try {
        const openai = get_openai($OPENAI_API_KEY)
        const r = await openai.images.generate(
            {
                prompt,
                n,
                size,
                model: 'dall-e-3',
                quality: 'hd',
                style: 'vivid'
            }
        );
        srcs = r.data;
        console.log(r.data)
        srcs.forEach(async (s) => {
            // if (s.url) await download_from_url(s.url);
        });
    } catch (e) {
        console.error('gen error', e);
        notify({
            kind: 'error',
            title: `An error occured while trying to generating the image${
                n === 1 ? '' : 's'
            }`
        });
    }

    loading = false;
};