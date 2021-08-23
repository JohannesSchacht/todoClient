import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';
import { takeUntil, delay, skipWhile, tap } from 'rxjs/operators';

import { RootState } from '../../store';
import * as fromRouter from '../../store/router/route.selectors';
import * as RouteActions from '../../store/router/route.actions';
import * as fromTasks from '../../store/task/task.selectors';
import * as TaskActions from '../../store/task/task.actions';
import { MyTask, validateDueDate, validateTask } from '../services/task';
import * as fromUsers from '../../users/store/user.selectors';
import { UsersRootState } from '../../users/store/user.state';
import { User } from '../../users/services/user';
import { TasksService } from '../services/tasks.service';

@Component({
	selector: 'todo-task-table',
	templateUrl: './task-table.component.html',
	styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit, OnDestroy {
	taskList!: MyTask[];
	tasksLoaded$!: Observable<boolean>;
	selectedTask!: MyTask | undefined;
	userList!: User[];

	dummy = new Subject();

	displayedColumns: string[] = ['status', 'name', 'dueDate', 'user', 'action'];

	constructor(
		private store: Store<RootState>,
		private userStore: Store<UsersRootState>,
		private tasksService: TasksService
	) {}

	ngOnInit(): void {
		this.tasksLoaded$ = this.store.select(fromTasks.tasksLoaded);

		this.store
			.select(fromRouter.currTask)
			.pipe(takeUntil(this.dummy))
			.subscribe((t) => {
				this.selectedTask = t;
			});

		this.store.pipe(takeUntil(this.dummy), fromTasks.allTaskLoaded()).subscribe((tl) => {
			this.taskList = tl;
		});

		this.userStore
			.select(fromUsers.users)
			.pipe(takeUntil(this.dummy))
			.subscribe((ul) => (this.userList = ul));
	}

	ngOnDestroy(): void {
		this.dummy.next();
		this.dummy.complete();
	}

	selectTask(taskId: number): void {
		this.store.dispatch(RouteActions.navigateToTask({ id: taskId }));
	}

	isSelected(task: MyTask): boolean {
		return this.selectedTask ? task.id === this.selectedTask.id : false;
	}

	getUserShortName(id: number): string {
		const user = this.userList?.find((u) => u.id === id);
		return user === undefined ? 'n.N' : user.shortName;
	}

	delete($event: Event, id: number): void {
		let urlSave: string;
		$event.stopPropagation();

		if ($event instanceof PointerEvent && $event.ctrlKey) {
			urlSave = this.tasksService.url;
			this.tasksService.url += '-XXX';
			this.store.dispatch(TaskActions.deleteTask({ taskId: id }));
			this.tasksService.url = urlSave;
		} else {
			this.store.dispatch(TaskActions.deleteTask({ taskId: id }));
		}
	}

	createTask(): void {
		this.store.dispatch(TaskActions.createTask());
	}

	validateTask(task: MyTask): boolean {
		return validateTask(task);
	}

	validateDueDate(dueDate: Date): boolean {
		return validateDueDate(dueDate) !== null;
	}
}

@Pipe({
	name: 'userShortName' // currently not used
})
export class UserShortNamePipe implements PipeTransform {
	transform(value: number, shortName: string): string {
		return value.toString() + shortName;
	}
}
