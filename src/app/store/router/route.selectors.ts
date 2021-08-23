import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromTasks from '../task/task.selectors';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
	selectCurrentRoute, // select the current route
	selectFragment, // select the current route fragment
	selectQueryParams, // select the current route query params
	selectQueryParam, // factory function to select a query param
	selectRouteParams, // select the current route params
	selectRouteParam, // factory function to select a route param
	selectRouteData, // select the current route data
	selectUrl // select the current url
} = getSelectors(selectRouter);

export const currTask = createSelector(
	fromTasks.allTasks,
	selectRouteParams,
	(taskList, params) => {
		if (!taskList || taskList.length === 0) {
			return undefined;
		}
		const task = taskList.find((tt) => tt.id === parseInt(params.id, 10));
		return task ? task : taskList[0];
	}
);

export const currTaskId = createSelector(selectRouteParams, (params) => {
	try {
		return parseInt(params.id, 10);
	} catch (e) {
		console.warn(`No valid task: ${e.message}`);
		return -1;
	}
});

// export const lastTaskId = (state: RootState) => state.todoRouter.lastSelectedTaskId;
