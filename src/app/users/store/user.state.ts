import { User } from '../services/user';
import { RootState } from '../../store';

export interface UserState {
	users: User[];
	usersLoaded: boolean;
}

export const initialState: UserState = {
	users: [],
	usersLoaded: false
};

export const usersFeatureKey = 'users';

export interface UsersRootState extends RootState {
	[usersFeatureKey]: UserState;
}
