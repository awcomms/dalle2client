<script lang="ts">
	import {
		Row,
		Column,
		Link
	} from 'carbon-components-svelte';
</script>

<Row>
	<Column>
		<div class="links">
            <Link href="/openai/character"
                >Create and chat with an AI chat partner</Link
            >
            <Link href="/openai/dalle2"
                >Generate images with text</Link
            >
            <Link href="/images/scale"
                >Scale an image to given dimensions</Link
            >
            <Link href="openai/completions">
                A client for OpenAI's Completion API
            </Link>
        </div>
	</Column>
</Row>

<style lang="sass">
    .links
        display: flex
        flex-direction: column
        row-gap: 1.369rem
</style>
