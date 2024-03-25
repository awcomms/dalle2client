<script lang="ts">
	import {
		Button,
		ButtonSet,
		Checkbox,
		TextInput
	} from 'carbon-components-svelte';
	import { createEventDispatcher } from 'svelte';
	// import { TodoItem } from '$lib/types';
	export let item: object,
		text = '';

	const dispatch =
		createEventDispatcher<{change: string, done: null, 'done_changed': string}>();

	const copy = async (s: string) => {
		// let all = await navigator.clipboard.read()
		// all.push(new ClipboardItem({string: s}))
		await navigator.clipboard.writeText(
			s
		);
		// todo notify with tooltip
	};

	const check_done = () => {};

	const focus = (s: string) => {};
</script>

<div class:open={item.open}>
	<div class="line">
		<div class="checkbox">
			<Checkbox
				indeterminate={/*!item.recommended*/ false}
				bind:checked={item.done}
			/>
		</div>
		<ButtonSet
			><Button
				size="small"
				kind="ghost"
				on:click={() => {
					if (item.suggestions) {
						item.open = !item.open;
					} else {
						item.done = !item.done;
						dispatch('done_changed', text);
					}
				}}>{text}</Button
			></ButtonSet
		>
		<!-- <CopyButton {text} /> -->
	</div>
	{#if item.open}
		<div class="indent">
			<slot />
			{#if item.suggestions}
				<svelte:self
					item={{ open: false }}
					text="_custom_attribute"
				>
					<TextInput
						size="sm"
						on:input={({
							detail
						}) => {
							if (detail)
								dispatch('done');
						}}
					/>
				</svelte:self>
				{#each Object.keys(item.suggestions) as text}
					<svelte:self
					on:done_changed
						{text}
						item={item.suggestions[
							text
						]}
						on:done_changed={() => {
							if (!item.suggestions)
								return;
							check_done();
						}}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<style lang="sass">
	.checkbox
		max-width: fit-content
	.line
		display: flex
		align-items: center
		flex-direction: row
	.indent
		margin-left: 1rem
</style>
