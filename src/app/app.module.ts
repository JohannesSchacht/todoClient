import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
	NavigationActionTiming,
	RouterState,
	StoreRouterConnectingModule
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/de';

import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { reducers } from './store';
import { TaskEffects } from './store/task/task.effects';
import * as taskActions from './store/task/task.actions';
import { RouterEffects } from './store/router/route.effects';
import { environment } from 'src/environments/environment';
import { usersFeatureKey } from './users/store/user.state';
import { userReducer } from './users/store/user.reducer';
import { TaskTableComponent, UserShortNamePipe } from './tasks/task-table/task-table.component';
import { HttpErrorDialogComponent, TaskViewComponent } from './tasks/task-view/task-view.component';
import { TaskReactiveFormComponent } from './tasks/task-reactive-form/task-reactive-form.component';
import { MouseOverDirective } from './tasks/task-table/mouseOver.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';
import { ThemeSelectionComponent } from './miscellaneous/theme-selection/theme-selection.component';
import { ThemeIconComponent } from './miscellaneous/theme-icon/theme-icon.component';
import { DynSideBarComponent } from './dyn-side-bar/dyn-side-bar.component';
import { ThemeEffects } from './store/theme/theme.effects';

@NgModule({
	declarations: [
		AppComponent,
		DynSideBarComponent,
		TaskTableComponent,
		TaskViewComponent,
		routingComponents,
		PageNotFoundComponent,
		HttpErrorDialogComponent,
		MouseOverDirective,
		TaskReactiveFormComponent,
		UserShortNamePipe,
		ThemeSelectionComponent,
		ThemeIconComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		ReactiveFormsModule,
		HttpClientModule,
		MaterialModule,
		StoreModule.forRoot(reducers, {
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictActionSerializability: false,
				strictActionTypeUniqueness: true,
				strictStateSerializability: true
			}
		}),
		StoreModule.forFeature(usersFeatureKey, userReducer),
		EffectsModule.forRoot([TaskEffects, RouterEffects, ThemeEffects]),
		StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
		StoreRouterConnectingModule.forRoot({
			routerState: RouterState.Minimal,
			navigationActionTiming: NavigationActionTiming.PreActivation
		})
	],
	providers: [{ provide: LOCALE_ID, useValue: 'de-DE' }],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private store: Store) {
		// console.log('AppModule loaded');
		this.store.dispatch(taskActions.loadTasks());
	}
}
