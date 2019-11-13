import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as crypto from 'crypto-js';

import { AuthService } from 'src/app/services/auth.service';
import { appUser } from 'src/app/models/appuser.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

    ngOnInit() {
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
        appUser.password = crypto.SHA256(this.formInput.password.value).toString(crypto.enc.Base64);
        this.authService.register(appUser)
            .subscribe(
                response => {
                    appUser.token = response;
                    this.router.navigate(['/files']);
                });
    }
}
