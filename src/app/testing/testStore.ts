import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> extends Observable<T> {
	private state!: BehaviorSubject<T>;

	setState(data: T): void {
		this.state.next(data);
	}

	select(selector?: any): Observable<T> {
		const x = {} as T;
		return new BehaviorSubject(x);
		// return this.state.asObservable();
		// return of();
	}

	dispatch(action: any): void {
		console.log(action);
	}
}
