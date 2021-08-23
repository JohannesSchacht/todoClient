import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, tap } from 'rxjs/operators';

import { UserService } from '../services/user.service';
import * as UserActions from './user.actions';

@Injectable()
export class UserEffects {
	loadTasks$ = createEffect(() =>
		this.action$.pipe(
			// tap((action) => console.log(`Effect(${action.type})`)),
			ofType(UserActions.loadUsers),
			mergeMap(() => this.usersService.getUsers()),
			map((ul) => UserActions.usersLoaded({ users: ul }))
		)
	);
	constructor(private action$: Actions, private usersService: UserService) {
		// console.log('user.effects.ts loaded');
	}
}
