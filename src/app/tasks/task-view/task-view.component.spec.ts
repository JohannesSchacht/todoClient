import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { TaskViewComponent } from './task-view.component';
import { reducers } from '../../store';
import { MaterialModule } from 'src/app/material/material.module';
import { TaskTableComponent } from '../task-table/task-table.component';
import { TestStore } from 'src/app/testing/testStore';
import { TasksService } from '../services/tasks.service';
import { TestTasksService } from 'src/app/testing/tasks.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { TaskReactiveFormComponent } from '../task-reactive-form/task-reactive-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { usersFeatureKey } from 'src/app/users/store/user.state';
import { userReducer } from 'src/app/users/store/user.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskViewComponent', () => {
	let component: TaskViewComponent;
	let fixture: ComponentFixture<TaskViewComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				ReactiveFormsModule,
				BrowserAnimationsModule,
				StoreModule.forRoot(reducers),
				StoreModule.forFeature(usersFeatureKey, userReducer)
			],
			declarations: [TaskViewComponent, TaskTableComponent, TaskReactiveFormComponent],
			providers: [
				/* { provide: Store, useClass: TestStore }, */
				{ provide: TasksService, useClass: TestTasksService },
				{ provide: HttpClient, useClass: HttpClient },
				{ provide: HttpHandler, useClass: HttpHandler },
				{ provide: FormBuilder, useClass: FormBuilder }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskViewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
