<script lang="ts">
	export let 
		multiple = false,
		label = `Upload file${multiple ? 's' : ''}`,
		dispatch_empty = false;

	import { Button } from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	let ref: HTMLInputElement;

	const dispatch = createEventDispatcher();

	const change = async () => {
		if (!ref || !ref.files) return;
		if (ref.files.length < 1 && dispatch_empty) {
			dispatch('change', ref.files);
			return;
		}
		dispatch('change', ref.files);
	};
</script>

<Button on:click={() => ref.click()}>{label}</Button>
<input style="display: none;" {multiple} on:change={change} type="file" bind:this={ref} />
