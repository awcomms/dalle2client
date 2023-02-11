<script lang="ts">
    import { req } from '$lib/util'
    import { Tags } from "$lib/components/Tag"

    let titles = []
    let tags = []

    const get = async() => {
        titles = await req({Item: {Search: tags.map(t => t.value)}})
        console.log(titles)
    }
</script>

<Tags on:change={get} bind:tags />

{#each titles as title}
<p>{title.name}</p>
{/each}

