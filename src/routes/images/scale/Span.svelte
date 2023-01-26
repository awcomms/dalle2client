<script lang="ts">
	export let value: number = 1,
		label: string = '',
		base_value: number = 1;

	import { NumberInput, Row, Column } from 'carbon-components-svelte';
	let factor = 1;

	$: change_factor(value);

	const change_factor = (v: number) => {
		factor = v / base_value;
	};

	const change_value = (f: number) => {
		value = base_value * factor;
	};
</script>

<Row>
	<Column>
		<NumberInput
			on:input
			on:input={() => change_value(factor)}
			bind:value={factor}
			label="{label} factor"
			size="sm"
		/>
	</Column>
	<Column>
		<NumberInput
			min={1}
			on:input
			on:input={() => change_factor(value)}
			bind:value
			{label}
			size="sm"
		/>
	</Column>
</Row>