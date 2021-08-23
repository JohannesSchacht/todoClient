import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TasksService } from './tasks.service';

describe('TasksService', () => {
	let service: TasksService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpClient, useClass: HttpClient },
				{ provide: HttpHandler, useClass: HttpHandler }
			]
		});
		service = TestBed.inject(TasksService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
