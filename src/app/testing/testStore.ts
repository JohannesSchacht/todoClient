import { BehaviorSubject, Observable } from 'rxjs';

export class TestStore<T> extends Observable<T> {
	private state!: BehaviorSubject<T>;

	setState(data: T): void {
		this.state.next(data);
	}

	select(selector?: any): Observable<T> {
		/* console.log(selector);
		console.log(typeof selector); */
		// selector.clear();
		/* const x1 = selector();
		console.log(`x1: ${x1}`); */
		// const x ={}} as T;
		//return new BehaviorSubject([] as unknown as T);
		return new BehaviorSubject(true as unknown as T);
	}

	dispatch(action: any): void {
		console.log(action);
	}
}
