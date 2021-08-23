import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './miscellaneous/page-not-found/page-not-found.component';
import { TaskViewComponent } from './tasks/task-view/task-view.component';
// import { UsersModule } from './users/users.module';
// import { UserViewComponent } from './users/user-view/user-view.component';

const routes: Routes = [
	{ path: '', redirectTo: '/tasks', pathMatch: 'full' },
	{ path: 'tasks', component: TaskViewComponent },
	{ path: 'tasks/:id', component: TaskViewComponent },
	{
		path: 'users',
		loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
	},
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			preloadingStrategy: PreloadAllModules
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [TaskViewComponent, PageNotFoundComponent];
