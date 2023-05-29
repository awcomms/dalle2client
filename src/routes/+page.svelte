<script lang="ts">
	import { PUBLIC_PROJECT_GITHUB_REPOSITORY } from '$env/static/public';
	import LogoGithub from 'carbon-icons-svelte/lib/LogoGithub.svelte';
	import {
		Row,
		Column,
		Link,
		Button
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
			<Link
				href="/openai/images/create"
				>Generate images with text</Link
			>
			<Link href="/images/scale"
				>Rescale images</Link
			>
			<Button
				as
				let:props
				icon={LogoGithub}
				iconDescription="Github Repository"
			>
				<a
					{...props}
					href={PUBLIC_PROJECT_GITHUB_REPOSITORY}
					target="_blank"
					on:click
					on:mouseover
					on:focus
					on:mouseenter
					on:mouseleave
				>
					{#if props.hasIconOnly}
						<span
							class:bx--assistive-text={true}
							>Github Repository</span
						>
					{/if}
					Github Repository<svelte:component
						this={LogoGithub}
						aria-hidden="true"
						class="bx--btn__icon"
						aria-label="Github Repository"
					/>
				</a></Button
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
