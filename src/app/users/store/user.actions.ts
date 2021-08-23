import { createAction, props } from '@ngrx/store';
import { User } from '../services/user';

export const loadUsers = createAction('[User] LoadUsers');

export const usersLoaded = createAction('[User] UsersLoaded', props<{ users: User[] }>());
