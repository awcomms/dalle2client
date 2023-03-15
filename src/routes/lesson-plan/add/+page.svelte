<script lang='ts'>
	/** @type {import('./$types').PageData} */

	import type { LessonPlan as LessonPlanType } from "$lib/components/LessonPlan/types"

	const lesson_plan: LessonPlanType = _default();

	import { LessonPlan, _default } from '$lib/components/LessonPlan';
</script>

<LessonPlan {lesson_plan}  />
