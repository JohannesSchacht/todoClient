import { Observable, BehaviorSubject } from 'rxjs';
import { MyTask } from '../tasks/services/task';

export class TestTasksService {
	getTasks(): Observable<MyTask[]> {
		return new BehaviorSubject<MyTask[]>([]);
	}
}
