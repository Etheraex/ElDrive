import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FileListComponent } from './pages/file-list/file-list.component';
import { AuthGuard } from './services/authguard.service';

const appRoutes: Routes = [
	{ path: 'register', component: RegisterComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'files', component: FileListComponent, canActivate: [AuthGuard] },
	{ path: '**', redirectTo: '/register', pathMatch: 'full' }
];
@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule { }
