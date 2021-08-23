import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { TodoRouterState, todoRouteReducer } from './router/router.state';
import { taskReducer } from './task/task.reducer';
import { TaskState } from './task/task.state';
import { ThemeState } from './theme/theme.state';
import { themeReducer } from './theme/theme.reducer';

export interface RootState {
	task: TaskState;
	router: RouterReducerState;
	todoRouter: TodoRouterState;
	theme: ThemeState;
}

export const reducers: ActionReducerMap<RootState> = {
	task: taskReducer,
	router: routerReducer,
	todoRouter: todoRouteReducer,
	theme: themeReducer
};
