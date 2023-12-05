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

	const dispatch =
		createEventDispatcher();
	export let more_open: boolean,
		can_send: boolean,
		loading: boolean,
		content_error: boolean,
		content_error_text: string,
		message_input_ref: HTMLTextAreaElement,
		text: string;
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
		on:click={() => dispatch('send')}
		iconDescription={'Send'}
		icon={loading
			? InlineLoading
			: Send}
	/>
	<FileUpload
		on:change={({detail}) =>
			dispatch('image', detail)}
		button={{ icon: Upload }}
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
