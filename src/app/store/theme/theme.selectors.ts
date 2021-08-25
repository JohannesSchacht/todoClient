import { createSelector, select } from '@ngrx/store';
import { BehaviorSubject, pipe } from 'rxjs';
import { take, switchAll } from 'rxjs/operators';

import { RootState } from '../index';
import { themeKeyforlocalStorage } from './theme.state';

const selectFeature = (state: RootState) => state.theme;
export const currentTheme = createSelector(selectFeature, ({ selectedTheme }) => selectedTheme);

export const serailizedTheme = () =>
	/* localStorage.getItem(themeKeyforlocalStorage); */
	localStorage.getItem(themeKeyforlocalStorage)
		? JSON.parse(localStorage.getItem(themeKeyforlocalStorage)!)
		: {};
