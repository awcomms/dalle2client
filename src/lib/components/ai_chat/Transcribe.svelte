<script lang="ts">
	import axios from 'axios';
	import Record from '../Record.svelte';
	import { createEventDispatcher } from 'svelte';

	let model = 'whisper-1';

	const dispatch =
		createEventDispatcher();

	const transcribe = async (
		e: CustomEvent
	) => {
		let { type, chunks } = e.detail;
		console.log('type', type);
		let audio = new Uint8Array(
			await new Blob(chunks, {
				type
			}).arrayBuffer()
		);
		await axios
			.post(
				'/openai/audio/transcriptions',
				{ audio, type, model }
			)
			.then((r) => {
				dispatch('text', r.data);
			});
	};
</script>

<Record
	buttonProps={{
		size: 'field'
	}}
	on:pause={transcribe}
/>
