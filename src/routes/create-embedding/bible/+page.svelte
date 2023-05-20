<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import axios from 'axios';

</script>

<Button
	on:click={() => axios.post('/create-embedding/bible')}
	>Get Bible Embeddings</Button
>
