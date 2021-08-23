import { pipe } from 'rxjs';
import { skipWhile } from 'rxjs/operators';
import { createSelector, select } from '@ngrx/store';

import { RootState } from '../index';
import { MyTask } from '../../tasks/services/task';

/* export const task = (state: RootState) => state.task;
export const allTasks = (state: RootState) => state.task.tasks;
export const errorMessage = (state: RootState) => state.task.errMsg;
export const tasksLoaded = (state: RootState) => state.task.tasksLoaded; */

export const selectFeature = (state: RootState) => state.task;
export const allTasks = createSelector(selectFeature, ({ tasks }) => tasks);
export const taskCount = createSelector(allTasks, (t: MyTask[]) => t.length);
export const errorMessage = createSelector(selectFeature, ({ errMsg }) => errMsg);
// tslint:disable-next-line: no-shadowed-variable
export const tasksLoaded = createSelector(selectFeature, ({ tasksLoaded }) => tasksLoaded);

export const allTaskLoaded = () =>
	pipe(
		skipWhile((state: RootState) => !tasksLoaded(state)),
		select(allTasks)
	);
