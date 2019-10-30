import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUser } from 'src/app/models/appuser.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

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
        loginUser.password = this.formInput.password.value;
        this.authService.login(loginUser)
            .subscribe(response => {
                console.log(response);
            });
    }
}
