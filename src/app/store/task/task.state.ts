import { MyTask } from '../../tasks/services/task';

export interface TaskState {
	tasks: MyTask[];
	errMsg: string;
	tasksLoaded: boolean;
}

export const initialState: TaskState = {
	tasks: [],
	errMsg: '',
	tasksLoaded: false
};
