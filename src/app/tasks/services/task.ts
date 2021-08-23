export interface MyTask {
	id: number;
	name: string;
	description: string;
	dueDate: Date;
	user: number;
}
export type UpdateTask = Omit<Partial<MyTask>, 'id'>;

export function validateDueDate(dueDate: Date): { [key: string]: any } | null {
	return dueDate < new Date() ? { dueDateInPast: { value: dueDate } } : null;
}

export function validateTask(task: MyTask): boolean {
	return validateDueDate(task.dueDate) == null;
}

/* type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type BaseTask = PartialBy<MyTask, 'id'>; */

/* export class MyTask {
	constructor(
		public id: number,
		public name: string,
		public description: string,
		public dueDate: Date,
		public user: number
	) {}
} */

/* export const defaultTask = new MyTask(-1, 'task', 'description', new Date(Date.now()), 12); */
