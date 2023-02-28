<script lang="ts">
	import { StructuredList, StructuredListCell, StructuredListRow } from "carbon-components-svelte";

    export let items: T[]

    type T = $$Generic
</script>

<StructuredList>
    {#each items as item}
        <StructuredListRow>
            <StructuredListCell>
                <slot {item}></slot>
            </StructuredListCell>
        </StructuredListRow>    
    {/each}
</StructuredList>