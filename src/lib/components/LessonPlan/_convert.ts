import type { LessonPlan, _LessonPlan } from '$lib/types';

export const to_ = (lesson_plan: LessonPlan) => {
	const _lesson_plan: _LessonPlan = {
		name: lesson_plan.name,
		rationale: lesson_plan.rationale,
		summary: lesson_plan.summary,
		// approved: false,
		lesson_development: {
			introduction: {
				teacher_activities: lesson_plan.lesson_development.introduction.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.introduction.student_pupil_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.introduction.learning_points.map((value, id) => { return { value, id } })
			},
			presentation: {
				teacher_activities: lesson_plan.lesson_development.presentation.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.presentation.student_pupil_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.presentation.learning_points.map((value, id) => { return { value, id } })
			},
			step_2: {
				teacher_activities: lesson_plan.lesson_development.step_2.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.step_2.teacher_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.step_2.teacher_activities.map((value, id) => { return { value, id } })
			},
			step_3: {
				teacher_activities: lesson_plan.lesson_development.step_3.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.step_3.teacher_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.step_3.teacher_activities.map((value, id) => { return { value, id } })
			},
			step_4: {
				teacher_activities: lesson_plan.lesson_development.step_4.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.step_4.teacher_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.step_4.teacher_activities.map((value, id) => { return { value, id } })
			},
			evaluation: {
				teacher_activities: lesson_plan.lesson_development.evaluation.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.evaluation.teacher_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.evaluation.teacher_activities.map((value, id) => { return { value, id } })
			},
			conclusion: {
				teacher_activities: lesson_plan.lesson_development.conclusion.teacher_activities.map((value, id) => { return { value, id } }),
				student_pupil_activities: lesson_plan.lesson_development.conclusion.teacher_activities.map((value, id) => { return { value, id } }),
				learning_points: lesson_plan.lesson_development.conclusion.teacher_activities.map((value, id) => { return { value, id } })
			}
		},
		pre_requirements: lesson_plan.pre_requirements.map((value, id) => { return { value, id } }),
		learning_objectives: lesson_plan.learning_objectives.map((value, id) => { return { value, id } }),
		learning_materials: lesson_plan.learning_materials.map((value, id) => { return { value, id } }),
		reference_materials: lesson_plan.reference_materials.map((value, id) => { return { value, id } })
	}
	return _lesson_plan
};

export const from_ = (_lesson_plan: _LessonPlan) => {
	const lesson_plan: LessonPlan = {
		name: _lesson_plan.name,
		rationale: _lesson_plan.rationale,
		summary: _lesson_plan.summary,
		// approved: false,
		lesson_development: {
			introduction: {
				teacher_activities: _lesson_plan.lesson_development.introduction.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.introduction.student_pupil_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.introduction.learning_points.map(v => v.value)
			},
			presentation: {
				teacher_activities: _lesson_plan.lesson_development.presentation.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.presentation.student_pupil_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.presentation.learning_points.map(v => v.value)
			},
			step_2: {
				teacher_activities: _lesson_plan.lesson_development.step_2.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.step_2.teacher_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.step_2.teacher_activities.map(v => v.value)
			},
			step_3: {
				teacher_activities: _lesson_plan.lesson_development.step_3.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.step_3.teacher_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.step_3.teacher_activities.map(v => v.value)
			},
			step_4: {
				teacher_activities: _lesson_plan.lesson_development.step_4.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.step_4.teacher_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.step_4.teacher_activities.map(v => v.value)
			},
			evaluation: {
				teacher_activities: _lesson_plan.lesson_development.evaluation.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.evaluation.teacher_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.evaluation.teacher_activities.map(v => v.value)
			},
			conclusion: {
				teacher_activities: _lesson_plan.lesson_development.conclusion.teacher_activities.map(v => v.value),
				student_pupil_activities: _lesson_plan.lesson_development.conclusion.teacher_activities.map(v => v.value),
				learning_points: _lesson_plan.lesson_development.conclusion.teacher_activities.map(v => v.value)
			}
		},
		pre_requirements: _lesson_plan.pre_requirements.map(v => v.value),
		learning_objectives: _lesson_plan.learning_objectives.map(v => v.value),
		learning_materials: _lesson_plan.learning_materials.map(v => v.value),
		reference_materials: _lesson_plan.reference_materials.map(v => v.value)
	}
	return lesson_plan
}
