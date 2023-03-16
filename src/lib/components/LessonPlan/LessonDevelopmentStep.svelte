<script lang='ts'>
    import type { _LessonDevelopmentStep } from "$lib/components/LessonPlan/types";
	import { editing } from "./store"

    export let step: _LessonDevelopmentStep, name: string = "";
	import { EditableList, Collapse } from '$lib/components/LessonPlan';
	import { Accordion, ButtonSet } from "carbon-components-svelte";
</script>

<Collapse {name}>
	<div slot="content">
			<Accordion>
				<EditableList
					name="Teacher's Activities"
					bind:items={step.teacher_activities}
					button_kind="ghost"
					editing={$editing}
				/>
				
				<EditableList
					name="Student Pupil Activities"
					bind:items={step.student_pupil_activities}
					button_kind="ghost"
					editing={$editing}
				/>
				
				<EditableList
					name="Learning Points"
					bind:items={step.learning_points}
					button_kind="ghost"
					editing={$editing}
				/>
			</Accordion>
	</div>
</Collapse>