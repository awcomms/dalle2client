<script lang="ts">
	import type { PromptResponse } from '$lib/types';
	// import { req } from '$lib/util';
	import Send from "carbon-icons-svelte/lib/Send.svelte"
	import Settings from "carbon-icons-svelte/lib/Settings.svelte"
	import { Button, InlineLoading, TextInput, Form, Modal, NumberInput } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import type { Parameters } from '../../../lib/components/character/types';

	onMount(() => {
		height = `${window.innerHeight * 79/100}px`
	})

	let parameters: Parameters = {
		model: "text-davinci-003",
		prompts: [],

	},
		loading = false, height = "670px", settings_open = false,
		responses: PromptResponse[] = [];

	const keydown = (e: KeyboardEvent) => {
		switch (e.key) {
			case "Enter":
				get()
		}
	}

	const get = async () => {
		let request = parameters
		let date = new Date();
		loading = true;
		// req<string>({ OpenAI: {Completions: parameters} })
		// 	.then((r) => {
		// 		responses = [
		// 			...responses,
		// 			{
		// 				prompt: {
		// 					date: date,
		// 					text: request.prompts[0]
		// 				},
		// 				response: {
		// 					date: new Date(),
		// 					text: r
		// 				}
		// 			}
		// 		];
		// 	})
		// 	.catch((e) => {
		// 		console.error(e);
		// 		alert('an error occured');
		// 	})
		// 	.finally(() => (loading = false));
	};
</script>


<Modal modalHeading="Settings" bind:open={settings_open} hasForm passiveModal>
	<NumberInput min={0} max={1} bind:value={parameters.temperature} />
	<NumberInput min={0} max={1} bind:value={parameters.top_p} />
</Modal>

<div style={`height: ${height}`} class="all">
		<div class="responses">
			{#each responses as response}
				<p class="prompt">{response.prompt.text}</p>
				<p class="response">{response.response.text}</p>
			{/each}
		</div>
	
	{#if loading}
		<InlineLoading />
	{/if}
	
	<div class="input">
		<!-- <Form on:submit={get}> -->
			<TextInput bind:value={parameters.prompts[0]} />
			<Button disabled={loading} size="field" on:click={get} icon={Send}/>
			<Button size="field" on:click={() => settings_open = true} icon={Settings}/>
		<!-- </Form> -->
	</div>
</div>

<style lang="sass">
	.response
		padding-left: 1rem
	.all
		display: flex
		flex-direction: column
		row-gap: .37rem
	.input
		display: flex
		flex-grow: 0
		flex-direction: row
	.responses
		display: flex
		flex-grow: 2
		flex-direction: column
		height: 100%
		overflow-y: scroll
		row-gap: .37rem
</style>
