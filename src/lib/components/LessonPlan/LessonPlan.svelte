<script lang="ts">
	import {
		to_,
		from_
	} from '$lib/components/LessonPlan/_convert';
	import { editing } from './store';
	import { _default } from './default';

	$editing = false;

	export let lesson_plan: LessonPlan =
		_default();

	import type {
		LessonPlan,
		_LessonPlan
	} from '$lib/types';
	import { EditableList } from '$lib/components/LessonPlan';
	import LessonDevelopment from './LessonDevelopment.svelte';
	import {
		Button,
		Row,
		Column,
		Modal,
		FluidForm,
		ButtonSet,
		Accordion
	} from 'carbon-components-svelte';
	import { EditableText } from '$lib/components/LessonPlan';
	import { createEventDispatcher } from 'svelte';
	import Assistant from './Assistant.svelte';
	import { download_blob } from '$lib/util';

	const dispatch =
		createEventDispatcher();

	let _lesson_plan = to_(
			lesson_plan
		),
		old: _LessonPlan[] = [],
		assistant_open = false,
		edit_cache: null | _LessonPlan =
			null,
		old_edit_cache: null | _LessonPlan =
			null,
		old_lesson_plan = _lesson_plan,
		new_modal = false;

	const start_edit = () => {
		edit_cache = _lesson_plan;
		$editing = true;
	};

	const cancel_edit = () => {
		old_edit_cache = _lesson_plan;
		if (edit_cache)
			_lesson_plan = edit_cache;
		$editing = false;
	};

	const restore_old_edit_cache =
		() => {
			if (!old_edit_cache) return;
			_lesson_plan = old_edit_cache;
			old_edit_cache = null;
		};

	const request_new = () => {
		if (
			old_lesson_plan != _lesson_plan
		) {
			new_modal = true;
		}
	};

	const createNew = () => {
		lesson_plan = _default();
	};

	const download = () => {
		download_blob(
			new Blob([
				JSON.stringify(_lesson_plan)
			]),
			`lesson_plan ${new Date().toUTCString()}`
		);
	};

	const edit = (e: CustomEvent) => {
		old = [...old, _lesson_plan];
		_lesson_plan = e.detail;
	};

	const save = async () => {
		const options = from_(
			_lesson_plan
		);
		// lesson_plan = await req({
		// 	LessonPlan: { New: {options } } }, true
		// );
		dispatch('save', lesson_plan);
		$editing = false;
	};

	$: console.log(_lesson_plan);
</script>

<Modal
	danger
	bind:open={new_modal}
	modalHeading="Discard changes?"
	primaryButtonText="Continue"
	secondaryButtonText="Cancel"
	on:click:button--primary={createNew}
	on:click:button--secondary={() =>
		(new_modal = false)}
>
	<p>
		Creating a new lesson plan will
		discard changes made to the
		currently viewed lesson plan
	</p>
</Modal>

<Modal
	modalHeading="Assistant"
	hasForm
	passiveModal
	bind:open={assistant_open}
>
	<Assistant
		{_lesson_plan}
		on:edit={edit}
	/>
</Modal>

<div class="all">
	<div class="actions">
		<Row noGutter>
			<Column>
				<div class="entries">
					<ButtonSet stacked>
						<Button
							size="small"
							on:click={() =>
								(assistant_open = true)}
							>Assistant</Button
						>
						{#if $editing}
							{#if old_edit_cache}
								<Button
									size="small"
									on:click={restore_old_edit_cache}
									>Restore Old Edit</Button
								>
							{/if}
							<Button
								size="small"
								on:click={cancel_edit}
								>Cancel Edit</Button
							>
							<Button
								size="small"
								on:click={save}
								>Save</Button
							>
						{:else}
							<Button
								size="small"
								on:click={start_edit}
								>Edit</Button
							>
						{/if}
						<Button
							size="small"
							on:click={request_new}
							>New</Button
						>
						<Button
							size="small"
							on:click={download}
							>Download</Button
						>
					</ButtonSet>
					<p>Lesson Plan</p>
				</div>
			</Column>
		</Row>
	</div>

	<Row noGutter>
		<Column>
			<FluidForm>
				<div class="entries">
					<div>
						<EditableText
							editing={$editing}
							name="Name"
							bind:value={_lesson_plan.name}
						/>
						<EditableText
							editing={$editing}
							name="Rationale"
							bind:value={_lesson_plan.rationale}
						/>
						<EditableText
							editing={$editing}
							name="Summary"
							bind:value={_lesson_plan.summary}
						/>
					</div>
					<Accordion>
						<EditableList
							name="Prerequisite Knowledge"
							bind:items={_lesson_plan.pre_requirements}
							editing={$editing}
						/>
						<EditableList
							name="Learning Obectives"
							bind:items={_lesson_plan.learning_objectives}
							editing={$editing}
						/>
						<EditableList
							name="Learning Materials"
							bind:items={_lesson_plan.learning_materials}
							editing={$editing}
						/>
						<EditableList
							name="Reference Materials"
							bind:items={_lesson_plan.reference_materials}
							editing={$editing}
						/>
					</Accordion>
					<LessonDevelopment
						bind:lesson_development={_lesson_plan.lesson_development}
					/>
				</div>
			</FluidForm>
		</Column>
	</Row>
</div>

<style lang="sass">
	.all
		display: flex
		flex-direction: column
		row-gap: 1rem
	.entries
		display: flex
		flex-direction: column
		row-gap: 1rem
	.actions
		position: absolute
		position: sticky
</style>
