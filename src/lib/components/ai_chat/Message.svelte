<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	export let message: ChatCompletionRequestMessage;
</script>

<div>
	{#if message.role !== 'system'}
		<div class="message" class:user={message.role === "user"} class:assistant={message.role === "assistant"}>
			{#if message.name}
				<p class="name">
					{message.name}
				</p>
			{/if}
			<p class="content">
				{message.content}
			</p>
		</div>
	{/if}
</div>

<style lang="sass">
	@use '@carbon/type'

	.name
		@include type.type-style('label-01')
	.content
		@include type.type-style('body-01')
</style>
