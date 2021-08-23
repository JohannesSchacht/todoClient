import { createReducer } from '@ngrx/store';

export interface TodoRouterState {
	lastSelectedTaskId: number;
}

export const initialState: TodoRouterState = {
	lastSelectedTaskId: -1 // not used currently
};

export const todoRouteReducer = createReducer(initialState);
