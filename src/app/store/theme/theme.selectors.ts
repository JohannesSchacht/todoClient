import { createSelector, select } from '@ngrx/store';

import { RootState } from '../index';

const selectFeature = (state: RootState) => state.theme;
export const currentTheme = createSelector(selectFeature, ({ selectedTheme }) => selectedTheme);
