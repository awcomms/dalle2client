<script lang='ts'>
	export let lesson_plan: LessonPlanType = _default()

    import type { LessonPlan as LessonPlanType} from '$lib/types'
    import { Switch } from 'carbon-components-svelte'
	import { _default } from './default';
    import LessonPlan from './LessonPlan.svelte'

    let _new = false;
    let new_lesson_plan = _default()
</script>

<Switch bind:selected={_new} text="Create new lesson plan" />
{#if _new}
    <LessonPlan lesson_plan={new_lesson_plan} on:save={({detail}) => {lesson_plan=detail; new_lesson_plan=_default()}} />
{:else}
    <LessonPlan lesson_plan={lesson_plan} />
{/if}
