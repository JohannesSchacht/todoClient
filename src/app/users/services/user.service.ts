import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from './user';
import { UsersModule } from '../../users/users.module';

@Injectable(
	// { providedIn: UsersModule } // does not work
	// { providedIn: 'root'}	// works
	{ providedIn: 'any' } // works
)
export class UserService {
	users: User[] = [
		{
			id: 12,
			firstName: 'Johannes',
			lastName: 'Schacht',
			shortName: 'jgs',
			sex: 'male',
			born: new Date(1955, 5, 26)
		},
		{
			id: 13,
			firstName: 'Dorothea',
			lastName: 'Cremer-Schacht',
			shortName: 'dcs',
			sex: 'female',
			born: new Date(1954, 2, 6)
		},
		{
			id: 14,
			firstName: 'Johanna',
			lastName: 'Bühler',
			shortName: 'jmp',
			sex: 'female',
			born: new Date(1990, 9, 19)
		}
	];

	constructor() {}

	getUsers(): Observable<User[]> {
		return of(this.users);
		// return of(this.users).pipe(delay(2000));
	}
}
