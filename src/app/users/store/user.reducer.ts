import { createReducer, on } from '@ngrx/store';
import produce from 'immer';

import * as userActions from './user.actions';
import { initialState } from './user.state';

export const userReducer = createReducer(
	initialState,

	on(userActions.usersLoaded, (state, { users }) =>
		produce(state, (draft) => {
			draft.users = users;
			draft.usersLoaded = true;
			// console.log('users loaded');
		})
	)
);
