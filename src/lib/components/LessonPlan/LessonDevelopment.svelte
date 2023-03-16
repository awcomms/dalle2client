<script lang="ts">
	import {
		Row,
		Column,
		ButtonSet,
		Accordion
	} from 'carbon-components-svelte';
	import type { _LessonDevelopment } from '$lib/components/LessonPlan/types';
	import { Collapse } from '$lib/components/LessonPlan';
	import LessonDevelopmentStep from './LessonDevelopmentStep.svelte';

	export let lesson_development: _LessonDevelopment;
</script>

<Accordion>
	<Collapse
		name="Lesson Plan Development"
	>
		<div
			class="content"
			slot="content"
		>
			<!-- <ButtonSet stacked> -->
			<Accordion>
				<LessonDevelopmentStep
					name="Introduction"
					bind:step={lesson_development.introduction}
				/>
				<LessonDevelopmentStep
					name="Presentation"
					bind:step={lesson_development.presentation}
				/>
				<LessonDevelopmentStep
					name="Step 2"
					bind:step={lesson_development.step_2}
				/>
				<LessonDevelopmentStep
					name="Step 3"
					bind:step={lesson_development.step_3}
				/>
				<LessonDevelopmentStep
					name="Step 4"
					bind:step={lesson_development.step_4}
				/>
				<LessonDevelopmentStep
					name="Evaluation"
					bind:step={lesson_development.evaluation}
				/>
				<LessonDevelopmentStep
					name="Conclusion"
					bind:step={lesson_development.conclusion}
				/>
			</Accordion>
			<!-- </ButtonSet> -->
		</div>
	</Collapse>
</Accordion>

<style lang="sass">
	.content
		padding-left: 1rem
</style>
