<script lang="ts">
	import type { ChatCompletionRequestMessage } from 'openai';
	export let message: ChatCompletionRequestMessage,
		hide_system_messages = false,
		show = message.role !== 'system';
	// ? true
	// : message.role === 'system' &&
	//   !hide_system_messages
	// ? true
	// : false;
</script>

{#if show}
	<div
		class="message"
		class:user={message.role ===
			'user'}
		class:assistant={message.role ===
			'assistant'}
	>
		<p class="content">
			{message.content}
		</p>
	</div>
{/if}

<style lang="sass">
	@use '@carbon/type'
	@use '@carbon/colors'
	@use '@carbon/themes'

	.message
		white-space: pre-wrap
		word-break: normal
		width: fit-content
		max-width: 74%
		padding: 1rem

	.user
		align-self: flex-end
		background-color: themes.$field-01

	.assistant
		background-color: colors.$blue-60

	.content
		@include type.type-style('body-01')
</style>
