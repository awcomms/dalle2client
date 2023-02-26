<script lang="ts">
	import {
		Row,
		Column,
		Link
	} from 'carbon-components-svelte';
</script>

<Row>
	<Column>
		<div class="all">
			<div class="links">
				<Link href="/openai/character"
					>Create and chat with an AI chat partner - OpenAI's
					GPT3</Link
				>
				<Link href="/openai/dalle2"
					>Generate images with text - OpenAI's DALLE2</Link
				>
				<Link href="/images/scale"
					>Scale an image to given dimensions</Link
				>
				<!-- <Link href="openai/completions">
                            Get completions to text prompts - OpenAI's GPT3
                        </Link> -->
			</div>

			<p>
				OpenAI related features will require an OpenAI key
			</p>
		</div>
	</Column>
</Row>

<style lang="sass">
    .links, .all
        display: flex
        flex-direction: column
        row-gap: 1.369rem
</style>
