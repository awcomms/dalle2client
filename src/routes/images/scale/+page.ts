import type { PageLoad } from "./$types";

export const load = (({ fetch }) => {
    return {
        fetch
    }
}) satisfies PageLoad;