<script lang="ts">
	import {
		TextArea,
		Button,
		InlineLoading
	} from 'carbon-components-svelte';
	import Send from 'carbon-icons-svelte/lib/Send.svelte';
	import Menu from 'carbon-icons-svelte/lib/Menu.svelte';
	import Upload from 'carbon-icons-svelte/lib/Upload.svelte';
	import { createEventDispatcher } from 'svelte';
	import { send_on_enter } from './store';
	import FileUpload from '../FileUpload.svelte';
	import type { ChatCompletionMessageParam } from 'openai/resources';

	export let more_open: boolean,
		can_send: boolean,
		loading: boolean,
		content_error: boolean,
		content_error_text: string,
		message_input_ref: HTMLTextAreaElement,
		text: string;

	let message: ChatCompletionMessageParam = {role: 'user', content: [{type: 'text', text}]},
	files_loading = false;

	const dispatch =
		createEventDispatcher();
	

	const update_images = ({detail: images}: {detail: File[]}) => {
		files_loading = true
		const reader = new FileReader()
		images.forEach(i => {
			const reader = new FileReader()
			reader.onload = () => {
				console.log(reader.result)
				message.content = [...message.content, {type: 'image_url', image_url: reader.result}]
			}
			reader.onerror = () => {
				notify({kind: "error", title: "Error occurred while trying to read uploaded file"})
			}
			reader.readasDataURL(i)
		});
		files_loading = false
	}
</script>

<div class="input">
	<TextArea
		style="min-width: unset"
		rows={2}
		disabled={loading}
		on:keydown={(e) => {
			if (
				e.key === 'Enter' &&
				$send_on_enter
			)
				e.preventDefault();
		}}
		invalid={content_error}
		invalidText={content_error_text}
		on:input={() =>
			(content_error = false)}
		bind:ref={message_input_ref}
		bind:value={text}
	/>
	<Button
		disabled={!can_send}
		size="field"
		on:click={() => dispatch('send', message)}
		iconDescription={'Send'}
		icon={loading
			? InlineLoading
			: Send}
	/>
	<FileUpload
		label="Upload images ({message.content.length - 1})"
		on:change={update_images}
		button={{ icon: files_loading ? InlineLoading : Upload }}
		multiple
	/>
	<Button
		size="field"
		on:click={() =>
			(more_open = true)}
		iconDescription="More"
		icon={Menu}
	/>
</div>
<style lang="sass">
	.input
		max-width: 100%
		display: flex
		flex-grow: 0
		flex-direction: row
</style>