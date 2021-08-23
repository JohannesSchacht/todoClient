import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersRootState, UserState, usersFeatureKey } from './user.state';

export const selectFeature = createFeatureSelector<UsersRootState, UserState>(usersFeatureKey);

export const users = createSelector(selectFeature, (user) => user.users);
export const usersLoaded = createSelector(selectFeature, (user) => user.usersLoaded);
// export const users = (state: UsersRootState) => state.user.users;
// export const usersLoaded = (state: UsersRootState) => state.user.usersLoaded;
