import { createReducer, on } from '@ngrx/store';
import produce from 'immer';

import * as themeActions from './theme.actions';
import { initialState } from './theme.state';

export const themeReducer = createReducer(
	initialState,
	// test and debug
	on(themeActions.setTheme, (state, { theme }) =>
		produce(state, (draft) => {
			draft.selectedTheme = theme;
		})
	)
);
