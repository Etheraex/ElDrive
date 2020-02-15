import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';
import { ServicePlan } from 'src/app/models/serviceplan.model';

@Component({
	selector: 'app-plan-dialog',
	templateUrl: './plan-dialog.component.html',
	styleUrls: ['./plan-dialog.component.scss']
})
export class PlanDialogComponent implements OnInit {

	plans: Array<ServicePlan>;

	constructor(public dialogRef: MatDialogRef<PlanDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: String[], public planservice: PlanService) { }

	ngOnInit() {
		this.planservice.getPlans().subscribe(result => { this.plans = result });
	}

}
