import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, from } from 'rxjs';
import { tap, mergeMap, map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { RootState } from '..';
import * as RouteActions from './route.actions';
import * as fromRoute from './route.selectors';
import * as fromTasks from '../task/task.selectors';
import { MyTask } from '../../tasks/services/task';

@Injectable()
export class RouterEffects {
	// private currentUrl!: string;
	private currentTaskId!: string;
	private taskList: MyTask[] = [];

	private = createEffect(
		() =>
			this.action$.pipe(
				ofType(RouteActions.navigateToTask),
				tap((action) => {
					if (action.id >= 0) {
						this.router.navigate(['/tasks', action.id]);
					}
				})
			),
		{ dispatch: false }
	);

	private taskLoaded$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(RouteActions.setCurrentTask),
				switchMap(() =>
					of(this.claculateActivatedTaskId()).pipe(
						map((taskId) => {
							return RouteActions.navigateToTask({ id: taskId });
						})
					)
				)
			),
		{ dispatch: true }
	);

	claculateActivatedTaskId(): number {
		const tasks = this.taskList;
		const routeId = this.currentTaskId;

		if (!tasks || tasks.length === 0) {
			/* console.log(`claculateActivatedTaskId:: -1`); */
			return -1;
		}
		const currentTask = tasks.find((task) => task.id === parseInt(routeId, 10));
		const returnValue = currentTask ? currentTask.id : this.taskList[0].id;

		/* console.log(
			`claculateActivatedTaskId:: url: ${this.currentUrl}, routeId: ${routeId}, returnValue=${returnValue}`
		); */
		return returnValue;
	}

	constructor(private action$: Actions, private router: Router, private store: Store<RootState>) {
		this.store.select(fromRoute.selectRouteParams).subscribe((params) => {
			if (params && params.id) {
				this.currentTaskId = params.id;
			}
		});
		this.store.select(fromTasks.allTasks).subscribe((tl) => {
			this.taskList = tl;
		});
		/* this.store.select(fromRoute.selectUrl).subscribe((url) => {
			this.currentUrl = url;
		}); */
	}
}
