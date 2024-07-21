<script lang="ts">
	import Record from '../Record.svelte';
	import { createEventDispatcher } from 'svelte';
	import { transcribe } from '$lib/util/transcribe';
	import { groq_key } from './store';
	// import { webm2flac } from '$lib/util/audio/webm2flac';

	const dispatch = createEventDispatcher();
</script>

<Record
	buttonProps={{
		size: 'field'
	}}
	on:pause={async (e) => {
		dispatch(
			'text',
			await transcribe(
				// await webm2flac(
				new Blob(e.detail.chunks, {
					type: e.detail.type
				}),
				// )
				$groq_key
			)
		);
	}}
/>
