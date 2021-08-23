import { createAction, props } from '@ngrx/store';
import { MyTask, UpdateTask } from '../../tasks/services/task';

export const testAction = createAction('[Task] TestAction', props<{ s: string }>());

export const logAction = createAction('[Task] LogAction', props<{ s: string }>());

export const loadTasks = createAction('[Task] LoadTasks');

export const tasksLoaded = createAction('[Task] TasksLoaded', props<{ tasks: MyTask[] }>());

export const tasksHTTPErr = createAction('[Task] tasksHTTPErr', props<{ errMsg: string }>());

export const tasksHTTPErrClear = createAction('[Task] tasksHTTPErrClear');

export const updateTask = createAction(
	'[Task] UpdateTask',
	props<{ upd: { id: number; task: UpdateTask } }>()
);

export const deleteTask = createAction('[Task] DeleteTask', props<{ taskId: number }>());
export const deleteTask1 = createAction('[Task] DeleteTask1', props<{ taskId: number }>());

export const createTask = createAction('[Task] CreateTask');
export const createTask1 = createAction('[Task] CreateTask1', props<{ task: MyTask }>());

export const tasksHTTPDone = createAction('[Task] TasksHTTPDone');
