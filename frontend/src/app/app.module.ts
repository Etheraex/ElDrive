import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FileService } from './services/file.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { FileInputComponent } from './components/file-input/file-input.component';
import { LoginComponent } from './components/login/login.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { RegisterComponent } from './components/register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

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
        RegisterComponent
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
        ReactiveFormsModule
    ],
    providers: [FileService, AuthService],
    bootstrap: [AppComponent],
    exports: [
        ReactiveFormsModule
    ]
})
export class AppModule { }
