export const average = (n: number[]): number => {
	return n.reduce((prev, next) => prev + next, 0) / n.length;
};
