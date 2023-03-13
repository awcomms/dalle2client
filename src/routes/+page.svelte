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
			<Link href="/openai/assistant"
				>Customize and chat with the
				GPT3.5 Assistant</Link
			>
			<Link href="/chat/ai/character"
				>Create and chat with an AI
				chat partner</Link
			>
			<Link href="/openai/dalle2"
				>Generate images with text</Link
			>
			<Link href="/images/scale"
				>Rescale images</Link
			>
			<!-- <Link href="openai/completions">
                            Get completions to text prompts - OpenAI's GPT3
                        </Link> -->
		</div>
	</Column>
</Row>

<style lang="sass">
    .links, .all
        display: flex
        flex-direction: column
        row-gap: 1.369rem
</style>
