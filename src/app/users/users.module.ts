import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { EffectsModule } from '@ngrx/effects';

import { Store, StoreModule } from '@ngrx/store';
import * as userActions from '../users/store/user.actions';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../users/services/user.service';
import { UserEffects } from './store/user.effects';
import * as taskActions from '../store/task/task.actions';
// import { usersFeatureKey } from './store/user.state';
// import { userReducer } from './store/user.reducer';

const routes: Routes = [{ path: '', component: UserViewComponent }];

@NgModule({
	declarations: [UserViewComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		// StoreModule.forFeature(usersFeatureKey, userReducer),
		EffectsModule.forFeature([UserEffects])
	],
	exports: [],
	providers: [UserService]
})
export class UsersModule {
	constructor(private store: Store) {
		// console.log(`Users loading initiating...`);
		this.store.dispatch(userActions.loadUsers());
		// console.log('UsersModule loaded!');
	}
}
