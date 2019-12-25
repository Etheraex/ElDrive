import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	templateUrl: 'encryption-dialog.component.html',
})
export class EncryptionDialogComponent {
	selected;
	keyValue:string = "Sifra";

	constructor(public dialogRef: MatDialogRef<EncryptionDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: String[]) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

	onYesClick(): void {
		this.dialogRef.close({algorithm: this.selected, key: this.keyValue})
	}

	keyInput(): boolean {
		return this.selected == "One-Time-Pad" || this.selected == "TEA";
	}
}