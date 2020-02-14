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
import { MatDialogModule } from '@angular/material/dialog';
import { CookieService } from './services/cookie.service';
import { CookieService as NGXCookieService } from 'ngx-cookie-service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

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
import { EncryptionDialogComponent } from './components/encryption-dialog/encryption-dialog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PlanDialogComponent } from './components/plan-dialog/plan-dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { PlanService } from './services/plan.service';
import { DatePipe } from '@angular/common';
import { NotesComponent } from './pages/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { ShareDialogComponent } from './components/share-dialog/share-dialog.component';
import { RoundPipe } from './pipes/rounding.pipe';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		FileListComponent,
		RegisterComponent,
		NavbarComponent,
		EncryptionDialogComponent,
		ProfileComponent,
		PlanDialogComponent,
		ProgressBarComponent,
		StatisticsComponent,
		NotesComponent,
		NoteComponent,
		ShareDialogComponent,
		RoundPipe
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
		MatProgressBarModule,
		MatChipsModule,
		MatToolbarModule,
		MatIconModule,
		MatTableModule,
		MatDialogModule,
		MatRippleModule,
		MatCardModule
	],
	entryComponents: [
		EncryptionDialogComponent,
		ProgressBarComponent,
		PlanDialogComponent,
		ShareDialogComponent
	],
	providers: [NGXCookieService, CookieService, FileService, PlanService, AuthService, CryptoAlgorithmsService, AuthGuard, DatePipe],
	bootstrap: [AppComponent],
	exports: [
		ReactiveFormsModule
	]
})
export class AppModule { }
