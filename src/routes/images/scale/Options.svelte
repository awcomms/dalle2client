<script lang="ts">
	export let options: import('./types').Options,
		width = 0,
		height = 0,
		ratio = 1;

	import { TextInput, Toggle, Select, SelectItem } from 'carbon-components-svelte';
	import Span from './Span.svelte';

	let filter_types = ['Nearest', 'Triangle', 'CatmullRom', 'Gaussian', 'Lanczos3'],
		ratio_lock = true;

	const change_width = (h: number) => {
		// console.log('w');
		if (ratio_lock) {
			// console.log('-w');
			// ratio_width(h);
		}
	};

	const change_height = (w: number) => {
		// console.log('h');
		if (ratio_lock) {
			// console.log('-h');
			// ratio_height(w);
		}
	};

	const ratio_width = (h: number) => {
		// console.log('--w');
		options.width = h * ratio;
	};

	const ratio_height = (w: number) => {
		// console.log('--h');
		options.height = w / ratio;
	};

	const ratio_if_lock = (side: boolean) => {
		if (!ratio_lock) return;
		ratio_base(side);
	};

	const apply_ratio = (side: boolean) => {
		ratio_base(side);
	};

	const ratio_base = (side: boolean) => {
		side ? ratio_width(options.height) : ratio_height(options.width);
	};
</script>

<!-- <p>{size} bytes</p> -->
<!-- <Toggle bind:toggled={ratio_lock} labelText="Ratio lock" /> -->
<Toggle bind:toggled={options.exact} labelText="Exact" />
<TextInput on:input size="sm" bind:value={options.extension} labelText="extension" />
<Span
	on:input
	on:input={() => change_height(options.width)}
	bind:value={options.width}
	label="width"
	base_value={width}
/>
<Span
	on:input
	on:input={() => change_width(options.height)}
	bind:value={options.height}
	label="height"
	base_value={height}
/>
<Select on:input bind:selected={options.filter_type}>
	{#each filter_types as ft}
		<SelectItem value={ft} text={ft} />
	{/each}
</Select>
