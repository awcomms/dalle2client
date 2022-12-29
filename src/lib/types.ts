export type Todo = Record<string, TodoItem>;

export interface TodoItem {
	done?: boolean;
	open?: boolean;
	recommended?: boolean;
	examples?: string[],
	suggestions?: Record<string, TodoItem>;
}