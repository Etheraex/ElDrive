import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar'

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FileService } from './services/file.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { FileInputComponent } from './pages/file-input/file-input.component';
import { FileListComponent } from './pages/file-list/file-list.component';
import { RegisterComponent } from './pages/register/register.component';

const appRoutes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'files/:userId', component: FileListComponent },
    { path: 'upload', component: FileInputComponent },
    { path: '**', redirectTo: '/register', pathMatch: 'full' }
];
@NgModule({
    declarations: [
        AppComponent,
        FileInputComponent,
        LoginComponent,
        FileListComponent,
        RegisterComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(
            appRoutes
        ),
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatCheckboxModule,
        MatChipsModule,
        MatToolbarModule,
        ReactiveFormsModule
    ],
    providers: [FileService, AuthService],
    bootstrap: [AppComponent],
    exports: [
        ReactiveFormsModule
    ]
})
export class AppModule { }
