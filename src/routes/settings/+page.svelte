<script lang="ts">
	import { OPENAI_API_KEY } from "$lib/store";
	import { Column, Row, TextInput } from "carbon-components-svelte";

</script>
<Row>
    <Column>
        <TextInput bind:value={$OPENAI_API_KEY} labelText="OpenAI API key" />
    </Column>
</Row>