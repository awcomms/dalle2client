<script lang='ts'>
	import type { LessonPlan } from '$lib/types';
	import {
		Row,
		Column,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow,
		Button
	} from 'carbon-components-svelte';

	let items: Array<LessonPlan> = [];

	const get = async () => {
		// items = await req({ LessonPlan: { action: 'All' } });
        console.log(items)
	};
</script>

<Button on:click={get}>Get</Button>

<StructuredList>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>name</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		{#each items as item}
			<StructuredListRow>
				<StructuredListCell>{item.name}</StructuredListCell>
			</StructuredListRow>
		{/each}
	</StructuredListBody>
</StructuredList>
