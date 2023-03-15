export interface Title {
	id: number;
	name: string;
	types: Types;
	tags: Tags;
}

export interface Image {
	src: string;
	alt: string;
	width: number;
	height: number;
}

export interface Club {
	image: Image;
	name: string;
	description: string;
}

export interface Item {
	id: number;
	value: string;
}

export interface Quiz {
	name: string,
	grade: string,
	questions: Question[]
}

export interface Question {
	id: number;
	text: string;
	options: Array<Option>;
	use_options: boolean;
	answer: string;
}

export interface Option {
	answer?: boolean;
	text: string;
	id: number;
	answered?: boolean;
}

export interface SetTitleOptions {
	name: string;
	types: Types;
	tags: Tags;
}

export type Tags = Array<string>;

export interface Types {
	book: Book | undefined;
}

export interface Book {
	authors: Array<string>;
	isbn: string;
}

export interface Topic {
	id: number;
	name: string;
	tags: Tags;
}

export interface SubTopic {
	id: number;
	name: string;
	tags: Tags;
}

export interface Subject {
	id: number;
	name: string;
	tags: Tags;
}

export interface _LessonPlan {
	id?: string;
	name: string;
	rationale: string;
	pre_requirements: Array<Item>;
	summary: string;
	approved?: boolean;
	lesson_development: _LessonDevelopment;
	learning_objectives: Array<Item>;
	learning_materials: Array<Item>;
	reference_materials: Array<Item>;
}

export interface LessonPlan {
	id?: string;
	name: string;
	rationale: string;
	summary: string;
	approved?: boolean;
	lesson_development: LessonDevelopment;
	pre_requirements: Array<string>;
	learning_objectives: Array<string>;
	learning_materials: Array<string>;
	reference_materials: Array<string>;
}

export interface _LessonDevelopmentStep {
	teacher_activities: Array<Item>;
	student_pupil_activities: Array<Item>;
	learning_points: Array<Item>;
}

export interface LessonDevelopmentStep {
	teacher_activities: Array<string>;
	student_pupil_activities: Array<string>;
	learning_points: Array<string>;
}

export interface _LessonDevelopment {
	introduction: _LessonDevelopmentStep;
	presentation: _LessonDevelopmentStep;
	step_2: _LessonDevelopmentStep;
	step_3: _LessonDevelopmentStep;
	step_4: _LessonDevelopmentStep;
	evaluation: _LessonDevelopmentStep;
	conclusion: _LessonDevelopmentStep;
}

export interface LessonDevelopment {
	introduction: LessonDevelopmentStep;
	presentation: LessonDevelopmentStep;
	step_2: LessonDevelopmentStep;
	step_3: LessonDevelopmentStep;
	step_4: LessonDevelopmentStep;
	evaluation: LessonDevelopmentStep;
	conclusion: LessonDevelopmentStep;
}

export interface RR {
	req: any;
	res: any;
}
