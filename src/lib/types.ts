export type Todo = Record<string, TodoItem>;

export interface TodoItem {
	done?: boolean;
	open?: boolean;
	recommended?: boolean;
	suggestions?: Record<string, TodoItem>;
}