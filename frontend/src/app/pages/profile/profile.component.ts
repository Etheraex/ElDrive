import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { appUser } from 'src/app/models/appuser.model';
import { MatDialog } from '@angular/material/dialog';
import { PlanDialogComponent } from 'src/app/components/plan-dialog/plan-dialog.component';

import { AuthService } from 'src/app/services/auth.service';
import { StatisticsService } from 'src/app/services/statistics.service';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	public userForm: FormGroup;
	private date;
	constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private datepipe:DatePipe, private authService: AuthService, private statisticsService : StatisticsService ) {
		this.date = datepipe.transform(appUser.planExpires,"yyyy/MM/dd HH:mm");
		this.userForm = this.formBuilder.group({
			name: [appUser.name],
			plan: [`${appUser.plan.name} - ${appUser.plan.space} GB`],
			usedSpace: [`${((appUser.usedSpace / appUser.plan.space) * 100).toFixed(2)}%`],
			planExpires : [`${((this.date))}`]
		});
		this.userForm.disable();
	}



	ngOnInit() {
	}

	openPlanPopup() {
		const dialogRef = this.dialog.open(PlanDialogComponent, {
			
		});
		let previusPlan = appUser.plan;
		dialogRef.afterClosed().subscribe(value => {
			if (value) {
					appUser.plan = value;
				}

				//this.statisticsService.removeDataPlan(previusPlan.name).subscribe();

				this.authService.updateUser(appUser).subscribe(response => {
					this.date = this.datepipe.transform(response.planExpires,"yyyy/MM/dd HH:mm");
					this.userForm.get("plan").setValue(`${appUser.plan.name} - ${appUser.plan.space} GB`);
					this.userForm.get("usedSpace").setValue(`${((appUser.usedSpace / appUser.plan.space) * 100).toFixed(2)}%`);
					this.userForm.get("planExpires").setValue(this.date);
				});
			
		});
	}
}
