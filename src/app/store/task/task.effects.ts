import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, interval } from 'rxjs';
import { catchError, mergeMap, tap, map, withLatestFrom, pairwise, mapTo } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { TasksService } from '../../tasks/services/tasks.service';
import * as RouteActions from '../router/route.actions';
import * as TaskActions from './task.actions';
import * as fromTasks from './task.selectors';
import * as fromRoute from '../router/route.selectors';
import { MyTask } from '../../tasks/services/task';
import { RootState } from '..';

@Injectable()
export class TaskEffects {
	// selectedTask!: MyTask | undefined;

	private loadTasks$ = createEffect(() =>
		this.action$.pipe(
			// tap((action) => console.log(`Effect(${action.type})`)),
			ofType(TaskActions.loadTasks),
			mergeMap(() =>
				this.tasksService.getTasks().pipe(
					tap((tl) =>
						tl.map((task) => {
							task.dueDate = new Date(task.dueDate);
						})
					),
					mergeMap((tl) => {
						return of(
							TaskActions.tasksLoaded({ tasks: tl }),
							RouteActions.setCurrentTask()
						);
					}),
					catchError((err) => of(TaskActions.tasksHTTPErr({ errMsg: err.message })))
				)
			)
		)
	);

	private deleteTask$ = createEffect(
		() =>
			this.action$.pipe(
				ofType(TaskActions.deleteTask),
				withLatestFrom(
					this.store.select(fromTasks.allTasks),
					this.store.select(fromRoute.currTaskId)
				),
				mergeMap(([action, taskList, currTaskId]) => [
					RouteActions.navigateToTask({
						id: this.calculatePrevious(taskList, action.taskId, currTaskId)
					}),
					TaskActions.deleteTask1({ taskId: action.taskId })
				]),
				catchError((err) => of(TaskActions.tasksHTTPErr({ errMsg: err.message })))
			)
		// TaskActions.tasksHTTPDone()
	);

	private deleteTask1$ = createEffect(() =>
		this.action$.pipe(
			// tap((action) => console.log(`Effect(${action.type})`)),
			ofType(TaskActions.deleteTask1),
			mergeMap((action) =>
				this.tasksService.deleteTask(action.taskId).pipe(
					mapTo(TaskActions.tasksHTTPDone()),
					catchError((err) => of(TaskActions.tasksHTTPErr({ errMsg: err.message })))
				)
			)
		)
	);

	private updateTask$ = createEffect(() =>
		this.action$.pipe(
			ofType(TaskActions.updateTask),
			// tap((action) => console.log(`EFFEKT update: ${action.task.name}`)),
			mergeMap((action) =>
				this.tasksService.updateTask(action.upd.id, action.upd.task).pipe(
					mergeMap(() => of(TaskActions.tasksHTTPDone())),
					catchError((err) => of(TaskActions.tasksHTTPErr({ errMsg: err.message })))
				)
			)
		)
	);

	private createTask$ = createEffect(() =>
		this.action$.pipe(
			// tap((action) => console.log(`Effect(${action.type})`)),
			ofType(TaskActions.createTask),
			mergeMap(() =>
				this.tasksService.createTask().pipe(
					mergeMap((newTask) => [TaskActions.createTask1({ task: newTask })]),
					catchError((err) => of(TaskActions.tasksHTTPErr({ errMsg: err.message })))
				)
			)
		)
	);

	private createTask1$ = createEffect(() =>
		this.action$.pipe(
			// tap((action) => console.log(`Effect(${action.type})`)),
			ofType(TaskActions.createTask1),
			map((action) => RouteActions.navigateToTask({ id: action.task.id }))
		)
	);

	calculatePrevious(taskList: MyTask[], deletedTaskId: number, selectedTaskId: number): number {
		if (deletedTaskId !== selectedTaskId) {
			return selectedTaskId;
		}
		if (taskList.length <= 1) {
			return -1;
		}
		let currentPos = -1;
		for (let i = 0; i < taskList.length; i++) {
			if (taskList[i].id === deletedTaskId) {
				currentPos = i;
				break;
			}
		}
		if (currentPos === 0) {
			return taskList[1].id;
		}
		return taskList[currentPos - 1].id;
	}

	constructor(
		private action$: Actions,
		private tasksService: TasksService,
		private store: Store<RootState>
	) {
		// console.log('task.effects.ts loaded');
		/* 		this.store.select(fromRoute.currTask).subscribe((ct) => {
			this.selectedTask = ct;
		}); */
	}
}
