<script lang="ts">
	export let open: boolean,
		restart_modal,
		name_label: string,
		show_name_edit: boolean,
		hide_parameters: boolean,
		id: string | undefined = undefined,
		name: string,
		save_loading = false,
		search_loading = false,
		q = '',
		description_label: string,
		description_error: boolean,
		description_error_text: string,
		disable_description_edit: boolean,
		// description: string,
		parameters: ChatCompletionCreateParamsNonStreaming;

	import Download from 'carbon-icons-svelte/lib/Download.svelte';
	import Restart from 'carbon-icons-svelte/lib/Restart.svelte';
	import {
		Modal,
		ButtonSet,
		Button,
		TextInput,
		TextArea,
		NumberInput,
		Toggle,
		InlineLoading,
		ComboBox,
		Select,
		SelectItem
	} from 'carbon-components-svelte';

	import { createEventDispatcher } from 'svelte';
	import { groq_key, send_on_enter } from './store';
	import type { ChatCompletionCreateParamsNonStreaming } from 'groq-sdk/resources/chat/completions.mjs';
	import axios from 'axios';
	import { Save } from 'carbon-icons-svelte';
	import { notify_error } from '$lib/util/notify/notify_error';
	import type { ComboBoxItem } from 'carbon-components-svelte/src/ComboBox/ComboBox.svelte';
	import { page } from '$app/stores';

	let items: ComboBoxItem[];

	const models = ['llama-3.1-405b-reasoning', 'llama-3.1-70b-versatile', 'llama3-70b-8192', 'llama3-8b-8192', 'mixtral-8x7b-32768', 'gemma-7b-it'];

	const dispatch = createEventDispatcher();

	const save = async () => {
		save_loading = true;
		try {
			id = id ? await axios.put(`/ai/${id}`, { p: parameters, n: name }) : await axios.post('/ai', { p: parameters, n: name });
		} catch {
			notify_error('save error');
		}
		save_loading = false;
	};

	const search = async () => {
		search_loading = true;
		try {
			items = (await axios.get(`/ai`, { params: { q } })).data;
		} catch {
			notify_error('search error');
		}
		search_loading = false;
	};
</script>

<Modal bind:open modalHeading="" passiveModal hasForm>
	<div class="rows">
		<div class="in_modal">
			<ButtonSet stacked>
				<Button size="small" on:click={() => dispatch('download')} iconDescription="download chat" icon={Download}>download chat</Button>
				<Button
					size="small"
					on:click={() => {
						restart_modal = true;
						open = false;
					}}
					iconDescription="restart chat"
					icon={Restart}>restart chat</Button
				>
				{#if $page.data.user}
					<Button size="small" on:click={save} iconDescription="save AI" icon={save_loading ? InlineLoading : Save}>save AI</Button>
				{/if}
			</ButtonSet>
			<ComboBox {items} />
			<Select bind:selected={parameters.model}>
				{#each models as value}
					<SelectItem {value} text={value} />
				{/each}
			</Select>
			<NumberInput bind:value={parameters.seed} label="Seed" />
			<TextInput labelText="groq API key"  bind:value={$groq_key} />
			{#if show_name_edit}
				<TextInput labelText={name_label} disabled={!show_name_edit} bind:value={name} />
			{/if}
			<TextArea
				labelText={description_label}
				invalid={description_error}
				disabled={disable_description_edit}
				invalidText={description_error_text}
				rows={1}
				placeholder="You are an AI that...	"
				on:input={() => (description_error = false)}
				bind:value={parameters.messages[0].content}
			/>
		</div>
		{#if !hide_parameters}
			<div class="header-content">
				<p>OpenAI Completions Parameters</p>
				<div class="in_modal">
					<NumberInput label="temperature" min={0} max={2} hideSteppers bind:value={parameters.temperature} />
					<NumberInput label="top_p" min={0} max={2} hideSteppers bind:value={parameters.top_p} />
					<NumberInput label="frequency_penalty" min={-2.0} max={2.0} hideSteppers bind:value={parameters.frequency_penalty} />
					<NumberInput label="presence_penalty" min={-2.0} max={2.0} hideSteppers bind:value={parameters.presence_penalty} />
				</div>
			</div>
		{/if}
		<div class="header-content">
			<p>Options</p>
			<div>
				<Toggle
					bind:toggled={$send_on_enter}
					labelA="The enter key will create a new line, instead of sending the message"
					labelB="The enter key will send the message, instead of creating a new line"
					labelText="What the Enter key does while the message input is focused (pressing the 'Ctrl' key with the 'Enter' key overrides this, and sends the message)"
				/>
			</div>
		</div>
	</div>
</Modal>

<style lang="sass">
	@use '@carbon/layout'

	.in_modal
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-05
	.header-content
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-02
	.rows
		display: flex
		flex-direction: column
		row-gap: layout.$spacing-07
</style>
