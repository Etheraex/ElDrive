import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppUser } from 'src/app/models/appuser.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

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
        const newUser = new AppUser();

        newUser.name = this.formInput.name.value;
        newUser.password = this.formInput.password.value;
        this.authService.register(newUser)
            .subscribe(response => {
                console.log(response);
            });
    }
}
