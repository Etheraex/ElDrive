import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	templateUrl: 'encryption-dialog.component.html',
})
export class EncryptionDialogComponent {

	constructor(public dialogRef: MatDialogRef<EncryptionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: String[]) { }

	onNoClick(): void {
		this.dialogRef.close();
	}
}