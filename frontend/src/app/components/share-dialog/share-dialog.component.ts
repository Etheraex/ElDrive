import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppUser, appUser } from 'src/app/models/appuser.model';
import { AuthService } from 'src/app/services/auth.service';
import { ZIFile } from 'src/app/models/zifile.model';
import { FileService } from 'src/app/services/file.service';

@Component({
	selector: 'app-plan-dialog',
	templateUrl: './share-dialog.component.html',
	styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {

	users: Array<AppUser>;

	constructor(public dialogRef: MatDialogRef<ShareDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ZIFile, private authService: AuthService, private fileService: FileService) { }

	ngOnInit() {
		this.authService.getUsers().subscribe(x => {
			// filter to ignore currently logged in user
			this.users = x.filter(x => x.hash != appUser.hash);
		});
	}

	onChosenUser(user: AppUser): void {
		this.data.haveAccess.push(user.hash);
		this.fileService.updateFile(this.data).subscribe(x => this.dialogRef.close());
	}

}
