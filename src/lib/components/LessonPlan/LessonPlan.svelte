<script lang="ts">
	import {
		to_,
		from_
	} from '$lib/components/LessonPlan/_convert';
	import { editing } from './store';
	import { _default } from './default';

	export let lesson_plan: LessonPlan =
		_default();

	let _lesson_plan = to_(
			lesson_plan
		),
		edit_cache = _lesson_plan,
		old_lesson_plan = _lesson_plan,
		new_modal = false;

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
		ButtonSet
	} from 'carbon-components-svelte';
	import { EditableText } from '$lib/components/LessonPlan';
	import { createEventDispatcher } from 'svelte';

	const dispatch =
		createEventDispatcher();

	const start_edit = () => {
		edit_cache = _lesson_plan
		$editing = true
	}

	const cancel_edit = () => {
		_lesson_plan = edit_cache
		$editing = false
	}

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
<div class="all">
	<div class="actions">
		<Row noGutter>
			<Column>
				<div class="entries">
					<ButtonSet stacked>
						<Button
							size="small"
							on:click={() =>
								($editing =
									!$editing)}
							>{$editing
								? 'Cancel Edit'
								: 'Edit'}</Button
						>
						{#if $editing}
							<Button
								size="small"
								on:click={save}
								>Save</Button
							>
						{/if}
						<Button
							size="small"
							on:click={request_new}
							>New</Button
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
					<ButtonSet stacked>
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
						<LessonDevelopment
							bind:lesson_development={_lesson_plan.lesson_development}
						/>
					</ButtonSet>
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
