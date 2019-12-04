import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppUser, appUser } from 'src/app/models/appuser.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public userForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {
		this.userForm = this.formBuilder.group({
			name: [appUser.name],
		})
		this.userForm.disable();
	}

	ngOnInit() {
	}

}
