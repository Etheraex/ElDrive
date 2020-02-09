import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { appUser } from 'src/app/models/appuser.model';
import { MatDialog } from '@angular/material/dialog';
import { PlanDialogComponent } from 'src/app/components/plan-dialog/plan-dialog.component';
import { availablePlans } from 'src/app/models/serviceplan.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public userForm: FormGroup;

	constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private authService: AuthService) {
		this.userForm = this.formBuilder.group({
			name: [appUser.name],
			plan: [`${appUser.plan.name} - ${appUser.plan.space} GB`],
			usedSpace: [`${((appUser.usedSpace / appUser.plan.space) * 100).toFixed(2)}%`]
		});
		this.userForm.disable();
	}

	ngOnInit() {
	}

	openPlanPopup() {
		const dialogRef = this.dialog.open(PlanDialogComponent, {
			width: '600px'
		});

		dialogRef.afterClosed().subscribe(value => {
			if (value) {
				switch (value) {
					case "Free":
						appUser.plan = availablePlans.Free;
						break;
					case "Basic":
						appUser.plan = availablePlans.Basic;
						break;
					case "Advanced":
						appUser.plan = availablePlans.Advanced;
						break;
				}

				this.authService.updateUser(appUser).subscribe(response => {
					this.userForm.get("plan").setValue(`${appUser.plan.name} - ${appUser.plan.space} GB`);
					this.userForm.get("usedSpace").setValue(`${((appUser.usedSpace / appUser.plan.space) * 100).toFixed(2)}%`);
				});
			}
		});
	}
}
