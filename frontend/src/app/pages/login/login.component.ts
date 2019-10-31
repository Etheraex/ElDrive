import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as crypto from "crypto-js";

import { AuthService } from 'src/app/services/auth.service';
import { AppUser } from 'src/app/models/appuser.model';
import { loggedInUser } from 'src/app/models/appuser.model'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]]
        })
    }

    get formInput(): any {
        return this.loginForm.controls;
    }

    onLoginSubmit(): void {
        if (this.loginForm.invalid)
            return;
        const loginUser = new AppUser();

        loginUser.name = this.formInput.name.value;
        loginUser.password = crypto.SHA256(this.formInput.password.value).toString(crypto.enc.Base64);
        this.authService.login(loginUser)
            .subscribe(response => {
                loggedInUser.login(response);
                this.router.navigate(['/upload']);
            });
    }
}
