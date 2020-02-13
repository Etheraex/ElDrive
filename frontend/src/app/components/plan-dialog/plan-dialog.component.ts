import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlanService } from 'src/app/services/plan.service';

@Component({
	selector: 'app-plan-dialog',
	templateUrl: './plan-dialog.component.html',
	styleUrls: ['./plan-dialog.component.scss']
})
export class PlanDialogComponent implements OnInit {

	constructor(public dialogRef: MatDialogRef<PlanDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: String[], public planservice:PlanService) { }
	plans;
	ngOnInit() {
		this.planservice.getFiles().subscribe(result => {this.plans=result});
	}

}
