import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as crypto from "crypto-js";

import { AuthService } from 'src/app/services/auth.service';
import { appUser } from 'src/app/models/appuser.model';

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
        appUser.password = crypto.SHA256(this.formInput.password.value).toString(crypto.enc.Base64);
        this.authService.login(appUser)
            .subscribe(
                response => {
                    appUser.token = response;
                    this.router.navigate(['/files']);
                },
                error => {
                    alert('Error: ' + error.error);
                });
    }
}
