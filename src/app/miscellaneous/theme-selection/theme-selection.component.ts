import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchAll, take, takeUntil } from 'rxjs/operators';

import { RootState } from 'src/app/store';
import { setTheme, initialiteTheme } from 'src/app/store/theme/theme.actions';
import { ThemeDescriptor } from './theme-descriptor';
import * as fromThemes from 'src/app/store/theme/theme.selectors';

@Component({
	selector: 'todo-theme-selection',
	templateUrl: './theme-selection.component.html',
	styleUrls: ['./theme-selection.component.scss']
})
export class ThemeSelectionComponent implements OnInit, OnDestroy {
	themes!: ThemeDescriptor[];
	selectorFormControl!: FormControl;

	dummy = new Subject();

	constructor(private store: Store<RootState>) {}

	ngOnInit(): void {
		this.themes = [
			{ name: 'light', value: 'theme-1' },
			{ name: 'dark', value: 'theme-2' }
		];
		this.selectorFormControl = new FormControl('');
		this.selectorFormControl.valueChanges.pipe(takeUntil(this.dummy)).subscribe((t) => {
			const newTheme = this.themes.find((entry) => entry.value === t);
			if (newTheme) {
				this.store.dispatch(setTheme({ theme: newTheme }));
			}
		});
		this.store.dispatch(initialiteTheme({ defaultTheme: this.themes[0] }));
	}

	ngOnDestroy(): void {
		this.dummy.next();
		this.dummy.complete();
	}
}
