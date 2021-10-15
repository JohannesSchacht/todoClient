import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from '../../store';
import * as fromRouter from '../../store/router/route.selectors';
import * as TaskActions from '../../store/task/task.actions';
import { MyTask, UpdateTask } from '../services/task';
import { User } from 'src/app/users/services/user';
import { UsersRootState } from 'src/app/users/store/user.state';
import * as fromUsers from '../../users/store/user.selectors';

@Component({
	selector: 'todo-task-reactive-form',
	templateUrl: './task-reactive-form.component.html',
	styleUrls: ['./task-reactive-form.component.scss']
})
export class TaskReactiveFormComponent implements OnInit, OnDestroy {
	private dummy = new Subject();
	selectedTask!: MyTask;
	taskEditForm!: FormGroup;
	userList!: User[];

	get nameField(): any {
		return this.taskEditForm.get('name');
	}
	get dueDateField(): any {
		return this.taskEditForm.get('dueDate');
	}

	constructor(
		private store: Store<RootState>,
		private userStore: Store<UsersRootState>,
		private fb: FormBuilder
	) { }

	dueDateValidator(control: AbstractControl): { [key: string]: any } | null {
		const selectedDate = new Date(control.value);
		return selectedDate < new Date() ? { dueDateInPast: { value: control.value } } : null;
	}

	ngOnInit(): void {
		this.taskEditForm = this.fb.group({
			name: ['Default name', Validators.required],
			description: ['Default description'],
			dueDate: ['', [Validators.required, this.dueDateValidator]],
			user: [-1, Validators.required]
		});

		// Update form
		this.store
			.select(fromRouter.currTask)
			.pipe(takeUntil(this.dummy))
			.subscribe((t) => {
				if (t) {
					this.selectedTask = t;
					this.taskEditForm.setValue({
						name: t.name,
						description: t.description,
						dueDate: t.dueDate,
						user: t.user
					});
					for (const control of Object.values(this.taskEditForm.controls)) {
						control.markAsTouched();
					}
					this.taskEditForm.markAsPristine();
				}
			});

		// Update store
		this.taskEditForm.valueChanges.pipe(takeUntil(this.dummy)).subscribe((form) => {
			if (this.taskEditForm.dirty) {
				const update = this.getValidProperties(form);
				this.taskEditForm.markAsPristine();
				if (Object.keys(update).length !== 0) {
					this.store.dispatch(
						TaskActions.updateTask({
							upd: { id: this.selectedTask.id, task: update }
						})
					);
				}
			}
		});

		// Get user list for selection box
		this.userStore
			.select(fromUsers.users)
			.pipe(takeUntil(this.dummy))
			.subscribe((ul) => (this.userList = ul));
	}

	ngOnDestroy(): void {
		this.dummy.next();
		this.dummy.complete();
	}

	getValidProperties(updateTask: UpdateTask): UpdateTask {
		const result: { [key: string]: any } = {};
		for (const [key, value] of Object.entries(updateTask)) {
			const control = this.taskEditForm.get(key);
			if (control?.valid && control?.dirty) {
				result[key] = value;
			}
		}
		return result;
	}

	/* hasChanged(form: MyTask, curr: MyTask | undefined): boolean {
		return (
			curr !== undefined &&
			form.id === curr.id &&
			JSON.stringify(form) !== JSON.stringify(curr)
		);
	} */
}
