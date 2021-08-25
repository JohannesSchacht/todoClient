import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { reducers } from 'src/app/store';
import { TestTasksService } from 'src/app/testing/tasks.service';
import { TestStore } from 'src/app/testing/testStore';
import { userReducer } from 'src/app/users/store/user.reducer';
import { usersFeatureKey } from 'src/app/users/store/user.state';
import { TasksService } from '../services/tasks.service';

import { TaskReactiveFormComponent } from './task-reactive-form.component';

describe('TaskReactiveFormComponent', () => {
	let component: TaskReactiveFormComponent;
	let fixture: ComponentFixture<TaskReactiveFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				StoreModule.forRoot(reducers),
				StoreModule.forFeature(usersFeatureKey, userReducer)
			],
			declarations: [TaskReactiveFormComponent],
			providers: [
				{ provide: TasksService, useClass: TestTasksService },
				{ provide: HttpClient, useClass: HttpClient },
				{ provide: HttpHandler, useClass: HttpHandler },
				{ provide: FormBuilder, useClass: FormBuilder }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskReactiveFormComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
