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
	import type {
		ChatCompletionContentPart,
		ChatCompletionMessageParam
	} from 'openai/resources';
	import { notify } from '$lib/util/notify';

	export let more_open: boolean,
		can_send: boolean,
		loading: boolean,
		content_error: boolean,
		content_error_text: string,
		message_input_ref: HTMLTextAreaElement,
		text: string;

	let message: ChatCompletionMessageParam =
			{
				role: 'user',
				content: [
					{ type: 'text', text }
				]
			},
		files_loading = false;

	const keydown = (
		e: KeyboardEvent
	) => {
		switch (e.key) {
			case 'Enter':
				if (
					!$send_on_enter &&
					!e.ctrlKey
				)
					return;
				if (
					can_send &&
					document &&
					document.activeElement ===
						message_input_ref
				)
					send();
		}
	};

	const file_to_base64 = (
		file: File
	) => {
		return new Promise(
			(resolve, reject) => {
				const reader =
					new FileReader();

				reader.onloadend = () => {
					resolve(reader.result);
				};

				reader.onerror = reject;

				reader.readAsDataURL(file);
			}
		);
	};

	const send = () => {
		message.content[0].xtext = text;
		dispatch('send', message);
	};

	const dispatch =
		createEventDispatcher();

	const update_images = async ({
		detail: images
	}: {
		detail: File[];
	}) => {
		files_loading = true;
		for (	
			let i = 0;
			i < images.length;
			i++
		) {
			try {
				const base64 =
					await file_to_base64(
						images[i]
					);
				console.log(base64);
				message.content = [
					...(message.content as ChatCompletionContentPart[]),
					{
						type: 'image_url',
						image_url: {
							url: base64 as string,
							detail: 'high'
						}
					}
				];
			} catch (err) {
				notify({
					kind: 'error',
					title:
						'Error occurred while trying to read uploaded file'
				});
			}
		}
		files_loading = false;
	};
</script>

<svelte:window
	on:keydown={keydown}
/>

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
		on:click={send}
		iconDescription={'Send'}
		icon={loading
			? InlineLoading
			: Send}
	/>
	<FileUpload
		label="{String((message
			?.content?.length || 1) - 1)}"
		on:change={update_images}
		button={{
			iconDescription: "Upload images",
			icon: files_loading
				? InlineLoading
				: Upload
		}}
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
