import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { TestTasksService } from 'src/app/testing/tasks.service';
import { TestStore } from 'src/app/testing/testStore';
import { TasksService } from '../services/tasks.service';

import { TaskReactiveFormComponent } from './task-reactive-form.component';

xdescribe('TaskReactiveFormComponent', () => {
	let component: TaskReactiveFormComponent;
	let fixture: ComponentFixture<TaskReactiveFormComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MaterialModule, BrowserAnimationsModule],
			declarations: [TaskReactiveFormComponent],
			providers: [
				{ provide: Store, useClass: TestStore },
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
