import { createAction, props } from '@ngrx/store';
import { ThemeDescriptor } from 'src/app/miscellaneous/theme-selection/theme-descriptor';

export const setTheme = createAction('[Theme] SetTheme', props<{ theme: ThemeDescriptor }>());

export const initialiteTheme = createAction(
	'[Theme] InitialiteTheme',
	props<{ defaultTheme: ThemeDescriptor }>()
);
