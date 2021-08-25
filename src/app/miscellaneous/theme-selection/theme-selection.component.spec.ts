import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from 'src/app/store';

import { MaterialModule } from '../../material/material.module';
import { ThemeSelectionComponent } from './theme-selection.component';
import { ThemeIconComponent } from '../theme-icon/theme-icon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { themeKeyforlocalStorage } from 'src/app/store/theme/theme.state';
import { ReactiveFormsModule } from '@angular/forms';

describe('ThemeSelectionComponent', () => {
	let component: ThemeSelectionComponent;
	let fixture: ComponentFixture<ThemeSelectionComponent>;
	let theme1: string;
	let theme2: string;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				StoreModule.forRoot(reducers)
			],
			declarations: [ThemeSelectionComponent, ThemeIconComponent],
			providers: []
		}).compileComponents();
	});

	beforeEach(() => {
		localStorage.removeItem(themeKeyforlocalStorage);
		fixture = TestBed.createComponent(ThemeSelectionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		if (component.themes.length >= 2) {
			theme1 = component.themes[0].name;
			theme2 = component.themes[1].name;
		}
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should handle the local storage correctly', () => {
		expect(component.themes.length >= 2).toBeTrue();
	});
});
