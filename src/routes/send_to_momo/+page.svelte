<script lang="ts">
	import {
		Button,
		Column,
		NumberInput,
		Row,
		Select,
		TextInput
	} from 'carbon-components-svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let bank: string,
		amount: number,
		name: string,
		reason: string,
		number: string;

	export const pay = async () => {
		const metadata = {
			purpose: 'send_to_momo',
			endpoint: $page.url.toString(),
			args: {
				amount,
				name,
				number,
				bank,
				reason
			}
		};
	};
</script>

<Row>
	<Column>
		<div class="all">
			<Select
				labelText="Select the network"
				bind:selected={bank}
			>
				{#each data.banks as b}
					<Select value={b} />
				{/each}
			</Select>
			
			<TextInput
				bind:value={name}
				labelText="Mobile Money Account Name"
			/>
			<TextInput
				bind:value={number}
				labelText="Mobile Money Account Number"
			/>
			<TextInput
				bind:value={reason}
				labelText="Reason for transfer"
			/>
			<NumberInput
				bind:value={amount}
				label="Amount to send"
			/>
			
			<Button on:click={pay} />
		</div>
	</Column>
</Row>

<style lang="sass">
	@use '@carbon/layout'
	.all
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-05
</style>