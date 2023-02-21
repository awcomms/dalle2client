export type Todo = Record<string, TodoItem>;

export interface TodoItem {
	done?: boolean;
	open?: boolean;
	recommended?: boolean;
	examples?: string[],
	suggestions?: Record<string, TodoItem>;
}

export interface User {
	id: number,
	username: string
}

export interface PromptResponse {
	prompt: Entry,
	response: Entry
}

export interface Entry {
	text: string[] | string,
	date: Date
}

export type Id = string
export type Embedding = number[];