import { ThemeDescriptor } from 'src/app/miscellaneous/theme-selection/theme-descriptor';

export interface ThemeState {
	selectedTheme: ThemeDescriptor;
}

export const initialState: ThemeState = {
	selectedTheme: { name: '', value: '' }
};

export const themeKeyforlocalStorage = 'todo_CurrentTheme';
