import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> {
	private state!: BehaviorSubject<T>;

	setState(data: T): void {
		this.state.next(data);
	}

	select(selector?: any): Observable<T> {
		return this.state.asObservable();
	}

	dispatch(action: any): void {
		console.log(action);
	}
}
