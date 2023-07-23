<script lang="ts">
	export let value: number = 1,
		label: string = '',
		base_value: number = 1;

	import {
		NumberInput,
		Row,
		Column
	} from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	$: change_factor(value);

	let factor = 1;

	const change_factor = (v: number) => {
		factor = v / base_value;
	};

	const change_value = (v: number) => {
		console.log(base_value, v)
		value = base_value * v;
		dispatch('span_change', value);
	};
</script>

<Row>
	<Column>
		<NumberInput
			min={0}
			on:input
			on:input={(e) => {
				if (e.detail) change_value(e.detail);
			}}
			bind:value={factor}
			label="{label} factor"
			size="sm"
		/>
	</Column>
	<Column>
		<NumberInput
			min={0}
			on:input
			on:input={(e) => {
				console.log(e.detail)
				if (e.detail) dispatch('span_change', e.detail);
			}}
			on:input={(e) => {
				if (e.detail) change_factor(e.detail);
			}}
			bind:value
			{label}
			size="sm"
		/>
	</Column>
</Row>
