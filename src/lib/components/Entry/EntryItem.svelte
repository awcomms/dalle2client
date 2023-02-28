<script lang="ts">
	import { objectStore } from "$lib/store";
    import type { Id } from "$lib/types";
	import { Link } from "carbon-components-svelte";
	import type { Entry } from "./types";

    export let id: Id

    let entry = objectStore<Entry | null>(id, null)

</script>

<div class="entry">
    {#if $entry}
        <Link href="/entries/{id}">{$entry.name}</Link>
    {:else}
        <p>Entry {id} unavailable</p>
    {/if}
</div>

<style lang="sass">
    // .entry
    //     border-radius: .369rem
</style>