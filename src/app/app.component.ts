import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RootState } from './store';
import * as fromTasks from './store/task/task.selectors';
import * as taskActions from './store/task/task.actions';
import { currentTheme } from 'src/app/store/theme/theme.selectors';
import { ThemeDescriptor } from './miscellaneous/theme-selection/theme-descriptor';

@Component({
	selector: 'todo-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	counter$!: Observable<number>;
	errMsg$!: Observable<string>;
	theme!: ThemeDescriptor;

	dummy = new Subject();

	constructor(
		private router: Router,
		private store: Store<RootState>,
		private overlayContainer: OverlayContainer
	) {}

	ngOnInit(): void {
		this.counter$ = this.store.select(fromTasks.taskCount);
		this.errMsg$ = this.store.select(fromTasks.errorMessage);

		this.store
			.select(currentTheme)
			.pipe(takeUntil(this.dummy))
			.subscribe((t) => {
				this.theme = t;
				this.changeTheme(t.value);
				// this.overlayContainer.getContainerElement().classList.add('dark-theme');
			});
	}
	ngOnDestroy(): void {
		this.dummy.next();
		this.dummy.complete();
	}

	changeTheme(theme: string): void {
		if (theme === '') {
			return;
		}
		// remove old theme class and add new theme class
		const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
		const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) =>
			item.includes('theme')
		);
		if (themeClassesToRemove.length) {
			overlayContainerClasses.remove(...themeClassesToRemove);
		}
		overlayContainerClasses.add(theme);
	}

	gotoTasks(): void {
		this.store.dispatch(taskActions.loadTasks());
		this.router.navigate(['/tasks']);
	}

	gotoUsers(): void {
		this.router.navigate(['/users']);
	}

	testFunction(): void {
		this.store.dispatch(taskActions.testAction({ s: 'test-action' }));
	}
}
