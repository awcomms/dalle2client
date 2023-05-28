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
				>GPT Assistant Chat</Link
			>
			<!-- <Link href="/chat/ai/character"
				>Create and chat with an AI
				chat partner</Link
			> -->
			<Link href="/openai/images/create"
				>Generate images with text</Link
			>
			<Link href="/images/scale"
				>Rescale images</Link
			>
		</div>
	</Column>
</Row>

<style lang="sass">
	.links
		display: flex
		flex-direction: column
		row-gap: 1rem
</style>