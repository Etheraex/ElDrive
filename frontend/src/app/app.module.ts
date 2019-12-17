import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FileService } from './services/file.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './pages/login/login.component';
import { FileListComponent } from './pages/file-list/file-list.component';
import { RegisterComponent } from './pages/register/register.component';
import { CryptoAlgorithmsService } from './services/crypto.service';
import { AuthGuard } from './services/authguard.service';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { EncryptionDialogComponent } from './components/encryption-dialog/encryption-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlanDialogComponent } from './components/plan-dialog/plan-dialog.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		FileListComponent,
		RegisterComponent,
		NavbarComponent,
		EncryptionDialogComponent,
		ProfileComponent,
		PlanDialogComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatCheckboxModule,
		MatChipsModule,
		MatToolbarModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		MatRippleModule
	],
	entryComponents: [
		EncryptionDialogComponent,
		PlanDialogComponent
	],
	providers: [FileService, AuthService, CryptoAlgorithmsService, AuthGuard,],
	bootstrap: [AppComponent],
	exports: [
		ReactiveFormsModule
	]
})
export class AppModule { }
