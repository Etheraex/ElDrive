import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { appUser } from 'src/app/models/appuser.model';
import { CryptoAlgorithmsService } from 'src/app/services/crypto.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router,
		private cryptoService: CryptoAlgorithmsService, private cookieService: CookieService) { }

	ngOnInit() {
		if (this.cookieService.checkCookie())
			this.router.navigate(['/files']);
		this.loginForm = this.formBuilder.group({
			name: ['', Validators.required],
			password: ['', [Validators.required]]
		})
	}

	get formInput(): any {
		return this.loginForm.controls;
	}

	onLoginSubmit(): void {
		if (this.loginForm.invalid)
			return;
		appUser.name = this.formInput.name.value;
		appUser.password = this.cryptoService.SHA_1(this.formInput.password.value);
		this.authService.login(appUser)
			.subscribe(
				response => {
					this.cookieService.setCookie(response);
					appUser.updateUser(response);
					this.router.navigate(['/files']);
				},
				error => {
					alert('Error: ' + error.error);
				});
	}
}
