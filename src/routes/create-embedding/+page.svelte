<script>
    import axios from 'axios';
	import { Button, TextInput } from 'carbon-components-svelte';

    let value = ""

    const createEmbedding = async () => {
        const response = await axios.post('/openai/embeddings', value).then(r => r.data)
        console.log(response)
    }
</script>

<TextInput bind:value labelText="Enter a name for your embedding" />
<Button on:click={createEmbedding}>Create Embedding</Button>