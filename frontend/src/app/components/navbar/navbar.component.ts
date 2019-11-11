import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

import { loggedInUser } from 'src/app/models/appuser.model';
import { FileService } from 'src/app/services/file.service';

@Component({
    selector: 'navbar',
    template: `<mat-toolbar color="primary">
                    <span>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/register' ]">Register</button>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/login' ]">Login</button>
                        <button *ngIf="isLoggedIn" mat-button (click)="onChooseFile()">
                            <mat-icon>file_upload</mat-icon>
                            Upload file
                            </button>
                        <button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/files' ]">
                            <mat-icon>insert_drive_file</mat-icon>
                            My files
                        </button>
                        <button class="logout" *ngIf="isLoggedIn" mat-button (click)="logout()">Log out</button>
                    </span>
                    <span class="title">ZI and NBP Dropbox simulation project</span>
                </mat-toolbar>
                
                <input id="fileUpload" type="file" hidden (change)="fileProgress($event)" />`,
    styles: [
        `.title {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
            }`,
        `.logout {
                position: absolute;
                left:100%;
                transform: translateX(-100%);
            }`]
})
export class NavbarComponent implements DoCheck {

    private _isLoggedIn: boolean;

    fileData: File = null;
    byteArray: ArrayBuffer;
    
    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    constructor(private router: Router, private fileService: FileService) {
        this.isLoggedIn = loggedInUser.id ? true : false;
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;

        const reader = new FileReader();
        reader.readAsArrayBuffer(this.fileData);
        reader.onloadend = () => {
            this.byteArray = reader.result as ArrayBuffer;
            this.upload();
        };
    }

    upload() {
        this.fileService.postFile(this.byteArray)
            .subscribe(response => {
                console.log(response);
            });
    }

    onChooseFile() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.click();
    }

    ngDoCheck(): void {
        this.isLoggedIn = loggedInUser.id ? true : false;
    }

    private logout(): void {
        loggedInUser.logout();
        this.router.navigate(['/register']);
    }
}
