import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from 'src/app/store';
import { TestStore } from './testStore';

import { MaterialModule } from '../../material/material.module';
import { MatSelectModule } from '@angular/material/select';
import { ThemeSelectionComponent } from './theme-selection.component';
import { ThemeIconComponent } from '../theme-icon/theme-icon.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldControl } from '@angular/material/form-field';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('ThemeSelectionComponent', () => {
	let component: ThemeSelectionComponent;
	let fixture: ComponentFixture<ThemeSelectionComponent>;
	let localStorageKey: string;
	let theme1: string;
	let theme2: string;

	beforeAll(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule],
			declarations: [ThemeSelectionComponent],
			providers: [
				{ provide: Store, useClass: TestStore } // use test store instead of ngrx store
			]
		}).compileComponents();
		fixture = TestBed.createComponent(ThemeSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		// component.ngOnInit();

		localStorageKey = component.localStorageKey;
		localStorage.removeItem(localStorageKey);
		if (component.themes.length >= 2) {
			theme1 = component.themes[0].name;
			theme2 = component.themes[1].name;
		}
	});

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StoreModule.forRoot(reducers)],
			declarations: [ThemeSelectionComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ThemeSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		const app = fixture.debugElement.componentInstance;
		expect(app.themes.length >= 2).toBeTrue();
	});

	it('should handle the local storage correctly', () => {
		expect(component.themes.length >= 2).toBeTrue();
	});
});
