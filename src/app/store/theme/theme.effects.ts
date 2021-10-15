import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, defer, EMPTY, BehaviorSubject } from 'rxjs';
import { filter, map, mapTo, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ThemeDescriptor } from 'src/app/miscellaneous/theme-selection/theme-descriptor';

import * as ThemeActions from './theme.actions';
import { themeKeyforlocalStorage } from './theme.state';

@Injectable()
export class ThemeEffects {
	setTheme$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(ThemeActions.setTheme),
				tap((action) => {
					localStorage.setItem(themeKeyforlocalStorage, JSON.stringify(action.theme));
				})
			),
		{ dispatch: false }
	);

	/* deserializeTheme$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(ThemeActions.deserializeTheme),
				map((action) => localStorage.getItem(themeKeyforlocalStorage)),
				filter((tmp) => !!tmp),
				map((tmp) => ThemeActions.setTheme({ theme: JSON.parse(tmp!) }))
			),

		{ dispatch: true }
	); */

	initialiteTheme$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(ThemeActions.initialiteTheme),
				withLatestFrom(of(localStorage.getItem(themeKeyforlocalStorage))),
				map(([action, lsTheme]) => {
					const newTheme = lsTheme ? JSON.parse(lsTheme!) : action.defaultTheme;
					return ThemeActions.setTheme({ theme: newTheme });
				})
			),
		{ dispatch: true }
	);

	constructor(private action$: Actions) {}
}
