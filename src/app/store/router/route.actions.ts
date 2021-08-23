import { createAction, props } from '@ngrx/store';

export const navigateToTask = createAction('[Route] NavigateToTaskAction', props<{ id: number }>());

export const setCurrentTask = createAction('[Route] SetCurrentTaskAction');
