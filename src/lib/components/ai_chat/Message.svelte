<script lang="ts">
	import { notify } from '$lib/util/notify';
	import {
		Button,
		ContextMenu,
		ContextMenuOption,
		CopyButton
	} from 'carbon-components-svelte';
	import Copy from 'carbon-icons-svelte/lib/Copy.svelte';
	import type { ChatCompletionRequestMessage } from 'openai';
	export let message: ChatCompletionRequestMessage,
		// hide_system_messages = false,
		show = message.role !== 'system';
	// ? true
	// : message.role === 'system' &&
	//   !hide_system_messages
	// ? true
	// : false;

	let target: HTMLElement,
		menu_open = false;

	const copy = () => {
		if (message.content)
			navigator.clipboard
				.writeText(message.content)
				.then(() => {
					notify({
						title:
							'Copied to clipboard',
						timeout: 1300
					});
				});
	};
</script>

<!-- <ContextMenu
	bind:open={menu_open}
	target={[target]}
>
	<ContextMenuOption
		on:click={copy}
		labelText="Copy"
		icon={Copy}
	/>
</ContextMenu> -->

{#if show && message.content}
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="a">
		<div
			bind:this={target}
			on:click={() =>
				(menu_open = true)}
			on:keydown={() =>
				(menu_open = true)}
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
		<Button
			iconDescription="Copy"
			icon={Copy}
			on:click={copy}
			size="small"
			kind="ghost"
		/>
	</div>
{/if}

<style lang="sass">
	@use '@carbon/type'
	@use '@carbon/colors'
	@use '@carbon/themes'
	@use '@carbon/layout'

	.a
		display: flex
		flex-direction: row
		column-gap: layout.$spacing-05

	.message
		white-space: pre-wrap
		word-wrap: break-word
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
