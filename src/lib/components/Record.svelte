<script lang="ts">
	export let chunks: Blob[] = [],
		paused: boolean = false,
		type = 'audio/wav',
		buttonProps: ButtonProps;
	import Microphone from 'carbon-icons-svelte/lib/Microphone.svelte';
	// import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import MicrophoneFilled from 'carbon-icons-svelte/lib/MicrophoneFilled.svelte';
	import { Button } from 'carbon-components-svelte';
	import type { ButtonProps } from 'carbon-components-svelte/types/Button/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch =
		createEventDispatcher();

	$: if (paused)
		dispatch('pause', { chunks, type });

	let audio_mimeTypes = [
		'audio/wav',
		'audio/m4a',
		'audio/mpeg',
		'audio/webm',
		'audio/ogg',
		'application/adpcm',
		'audio/aac',
		'audio/aiff',
		'audio/midi',
		'audio/x-aiff',
		'audio/x-ms-wma',
		'audio/x-pn-realaudio',
		'audio/x-wav',
		'audio/x-aiff',
		'audio/x-ms-wma',
		'audio/x-mpegurl',
		'audio/x-m4a',
		'audio/x-pn-realaudio-plugin',
		'audio/x-flac',
		'audio/x-matroska',
		'audio/x-wma',
		'audio/x-ac3',
		'audio/x-vorbis',
		'audio/x-flac+ogg'
	];

	let audio_recorder: MediaRecorder,
		started: boolean = false,
		mediaDevices_unavailable: boolean =
			false,
		audio_recorder_timeslice: number = 111;

	const clear_recording = () => {
		chunks = [];
		// audioElement.src = '';
	};

	const set_recorder = () => {
		if (!navigator.mediaDevices) {
			mediaDevices_unavailable =
				true; // TODO - alternatives
			return;
		} else {
			navigator.mediaDevices
				.getUserMedia({
					audio: true
				})
				.then((stream) => {
					if (
						!MediaRecorder.isTypeSupported(
							type
						)
					) {
						for (let t of audio_mimeTypes) {
							if (
								MediaRecorder.isTypeSupported(
									t
								)
							) {
								console.log('-t', t)
								type = t;
								break;
							}
						}
					} else {
						console.log('i-t', type)
					}
					console.log('t', type);
					audio_recorder =
						new MediaRecorder(
							stream,
							{
								mimeType: type
							}
						);
					audio_recorder.onstart =
						() => (started = true);
					audio_recorder.onpause =
						() => (paused = true);
					audio_recorder.onresume =
						() => (paused = false);
					audio_recorder.ondataavailable =
						({ data }) => {
							chunks.push(data);
							chunks = chunks;
						};
					audio_recorder.start(
						audio_recorder_timeslice
					);
				});
		}
	};
</script>

{#if mediaDevices_unavailable}
	<Button
		disabled
		icon={Microphone}
		iconDescription="This browser does not seem to support audio"
	/>
{:else if started}
	{#if paused}
		<Button
			icon={Microphone}
			iconDescription="Start recording"
			on:click={() =>
				audio_recorder.resume()}
			{...buttonProps}
		/>
	{:else}
		<Button
			icon={MicrophoneFilled}
			iconDescription="Stop recording"
			on:click={() =>
				audio_recorder.pause()}
			{...buttonProps}
		/>
	{/if}
{:else}
	<Button
		icon={Microphone}
		iconDescription="Start recording"
		on:click={set_recorder}
		{...buttonProps}
	/>
{/if}
