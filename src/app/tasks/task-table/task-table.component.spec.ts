import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTableComponent } from './task-table.component';
import { TasksService } from '..//services/tasks.service';
import { TestTasksService } from '../../testing/tasks.service';
import { Store, StoreModule } from '@ngrx/store';
import { TestStore } from '../../testing/testStore';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MaterialModule } from 'src/app/material/material.module';
import { reducers } from 'src/app/store';
import { usersFeatureKey } from 'src/app/users/store/user.state';
import { userReducer } from 'src/app/users/store/user.reducer';

describe('TaskTableComponent', () => {
	let component: TaskTableComponent;
	let fixture: ComponentFixture<TaskTableComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MaterialModule,
				StoreModule.forRoot(reducers),
				StoreModule.forFeature(usersFeatureKey, userReducer)
			],
			declarations: [TaskTableComponent],
			providers: [
				/* { provide: Store, useClass: TestStore }, */
				{ provide: TasksService, useClass: TasksService },
				{ provide: HttpClient, useClass: HttpClient },
				{ provide: HttpHandler, useClass: HttpHandler }
			]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
