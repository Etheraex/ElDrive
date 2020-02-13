import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { appUser, AppUser } from 'src/app/models/appuser.model';
import { Free } from 'src/app/models/serviceplan.model';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { CookieService } from 'src/app/services/cookie.service';
import { StatisticsService, StatisticFileds } from 'src/app/services/statistics.service';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';
import { NoteCollection } from 'src/app/models/noteCollecion.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	constructor(private authService: AuthService
			, private formBuilder: FormBuilder
			, private router: Router
			, private cryptoService: CryptoAlgorithmsService
			, private statisticsService : StatisticsService
			, private cookieService: CookieService
			, private noteService :NoteService) { }

	ngOnInit() {
		if (this.cookieService.checkCookie())
			this.router.navigate(['/files']);
		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(8)]]
		})
	}

	get formInput(): any {
		return this.registerForm.controls;
	}

	onRegisterSubmit(): void {
		if (this.registerForm.invalid)
			return;
		appUser.name = this.formInput.name.value;
		appUser.password = this.cryptoService.SHA_1(this.formInput.password.value);
		appUser.plan = Free;
		appUser.usedSpace = 0.0;
		this.authService.register(appUser)
			.subscribe(
				(response : AppUser) => {
					this.cookieService.setCookie(appUser);
					this.statisticsService.changeFildCount(StatisticFileds.NumberOfUsers).subscribe();
					appUser.hash = response.hash;
					let noteCollecion = new NoteCollection();
					noteCollecion.userId = appUser.id;
					this.noteService.postNotes(noteCollecion).subscribe();
					this.router.navigate(['/files']);
				});
	}
}
