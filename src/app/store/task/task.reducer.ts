import { createReducer, on } from '@ngrx/store';
import produce from 'immer';

import * as taskActions from './task.actions';
import { initialState } from './task.state';

export const taskReducer = createReducer(
	initialState,
	// test and debug
	on(taskActions.testAction, (state) =>
		produce(state, (draft) => {
			const t = draft.tasks[0];
			// draft.tasks = [...draft.tasks, t];
		})
	),
	on(taskActions.logAction, (state, { s }) =>
		produce(state, (draft) => {
			console.log(s);
		})
	),

	// load tasks
	on(taskActions.loadTasks, (state) =>
		produce(state, (draft) => {
			// draft.tasks = [];
			draft.tasksLoaded = false;
			// console.log('Start loading tasks...');
		})
	),
	on(taskActions.tasksLoaded, (state, { tasks }) =>
		produce(state, (draft) => {
			draft.tasks = tasks;
			draft.tasksLoaded = true;
			// console.log('Tasks loaded');
		})
	),

	// delete task
	on(taskActions.deleteTask1, (state, { taskId }) =>
		produce(state, (draft) => {
			draft.tasks = draft.tasks.filter((t) => t.id !== taskId);
		})
	),

	// create task
	on(taskActions.createTask1, (state, { task }) =>
		produce(state, (draft) => {
			draft.tasks = [...draft.tasks, task];
		})
	),

	// update task
	on(taskActions.updateTask, (state, { upd }) =>
		produce(state, (draft) => {
			// console.log(`update action for ${task.id}, ${task.name}`);
			const idx = draft.tasks.findIndex((t) => t.id === upd.id);
			if (idx >= 0) {
				draft.tasks[idx] = { ...draft.tasks[idx], ...upd.task };
			}
		})
	),

	// error & success handling
	on(taskActions.tasksHTTPErr, (state, { errMsg }) =>
		produce(state, (draft) => {
			draft.errMsg = errMsg;
		})
	),
	on(taskActions.tasksHTTPErrClear, (state) =>
		produce(state, (draft) => {
			draft.errMsg = '';
		})
	),
	on(taskActions.tasksHTTPDone, (state) =>
		produce(state, (draft) => {
			// console.log('Http done');
		})
	)
);
