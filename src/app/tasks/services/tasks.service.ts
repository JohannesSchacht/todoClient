import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { MyTask, UpdateTask } from './task';

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	public url = 'https://sch-8.de/api/todo/tasks';
	private delay = 1;

	constructor(private http: HttpClient) {}

	getTasks(): Observable<MyTask[]> {
		// return this.http.get<Task[]>(this.url);
		return this.http.get<MyTask[]>(this.url).pipe(
			delay(this.delay),
			// map((tl) => tl.map((t) => ({ ...t, status: true }))),
			catchError((err: HttpErrorResponse) => {
				console.warn(`Error. Status=${err.message} `);
				console.error(err);
				return throwError(err);
			})
		);
	}

	deleteTask(id: number): Observable<unknown> {
		const url = `${this.url}/${id}`;
		return this.http.delete(url).pipe(
			catchError((err: HttpErrorResponse) => {
				console.warn(`Error. Status=${err.message} `);
				console.error(err);
				return throwError(err);
			})
		);
	}

	updateTask(id: number, task: UpdateTask): Observable<MyTask> {
		const url = `${this.url}/${id}`;
		return this.http.put<MyTask>(url, task).pipe(
			catchError((err: HttpErrorResponse) => {
				console.warn(`Error. Status=${err.message} `);
				console.error(err);
				return throwError(err);
			})
		);
	}

	createTask(): Observable<MyTask> {
		const url = `${this.url}`;
		return this.http.post<MyTask>(url, {}).pipe(
			catchError((err: HttpErrorResponse) => {
				console.warn(`Error. Status=${err.message} `);
				console.error(err);
				return throwError(err);
			})
		);
	}
}
