import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from '../../store';
import * as routeActions from '../../store/router/route.actions';
import * as fromTasks from '../../store/task/task.selectors';

export interface ErrorDialogData {
	errMessage: string;
}

@Component({
	selector: 'todo-task-view',
	templateUrl: './task-view.component.html',
	styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, OnDestroy {
	dummy = new Subject();

	constructor(
		// private snackBar: MatSnackBar,
		private store: Store<RootState>,
		public dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.store.dispatch(routeActions.setCurrentTask());

		this.store
			.select(fromTasks.errorMessage)
			.pipe(takeUntil(this.dummy))
			.subscribe((err) => {
				if (err !== '') {
					this.handleError(err);
				}
			});
	}

	handleError(err: string): void {
		const dialogRef = this.dialog.open(HttpErrorDialogComponent, {
			width: '450px',
			disableClose: true,
			data: { errMessage: err }
		});

		dialogRef.afterClosed().subscribe((result) => {
			window.location.reload();
		});
		// this.snackBar.open(`Error loading tasks from server: ${err}`, 'Close');
		// this.store.dispatch(taskActions.tasksHTTPErrClear());
	}

	ngOnDestroy(): void {
		this.dummy.next();
		this.dummy.complete();
	}
}

@Component({
	selector: 'todo-err-dialog',
	templateUrl: './error-dialog.component.html',
	styleUrls: ['./error-dialog.component.scss']
})
export class HttpErrorDialogComponent {
	constructor(
		public dialogRef: MatDialogRef<HttpErrorDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ErrorDialogData
	) { }

	myColor = 'accent';

	restart(): void {
		this.dialogRef.close();
	}
}
