import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Algorithms } from 'src/app/services/crypto.service';
import { EncryptionDialogComponent } from '../encryption-dialog/encryption-dialog.component';
import { UploadService } from 'src/app/services/upload.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'navbar',
	template: `<mat-toolbar color="primary">
                    <span>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/register' ]">Register</button>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/login' ]">Login</button>
						<button *ngIf="isLoggedIn" mat-button (click)="onClick()">
							<mat-icon>file_upload</mat-icon>
							Upload file
						</button>
						<button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/files' ]">
						<mat-icon>insert_drive_file</mat-icon>
						Files
						</button>

						<button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/notes' ]">
							<mat-icon>notes</mat-icon>
							My notes
						</button>

						<span class="right-side" >
                        	<button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/profile' ]">Profile</button>
							<button *ngIf="isLoggedIn" mat-button (click)="logout()">Log out</button>
						</span>
                    </span>
                    <span class="title">ElDrive</span>
                </mat-toolbar>
                
				<input id="fileUpload" type="file" hidden (change)="fileProgress($event)" />
				`,
	styles: [
		`.title {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }`,
		`.right-side {
                position: absolute;
                left:100%;
                transform: translateX(-100%);
            }`]
})
export class NavbarComponent implements DoCheck {

	private _isLoggedIn: boolean = false;

	get isLoggedIn(): boolean {
		return this._isLoggedIn;
	}
	set isLoggedIn(value: boolean) {
		this._isLoggedIn = value;
	}

	constructor(private router: Router, public dialog: MatDialog, private uploadManager: UploadService, private cookieService: CookieService) { }

	fileProgress(fileInput: any) {
		this.uploadManager.beginUpload(fileInput);
	}

	onClick() {
		this.openDialog();
	}

	ngDoCheck(): void {
		this.isLoggedIn = this.cookieService.checkCookie();
	}

	logout(): void {
		this.cookieService.removeCookie();
		this.router.navigate(['/login']);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(EncryptionDialogComponent, {
			width: '300px',
			data: Algorithms
		});

		dialogRef.afterClosed().subscribe(value => {
			if (value)
				this.uploadManager.chooseFile(value);
		});
	}
}
