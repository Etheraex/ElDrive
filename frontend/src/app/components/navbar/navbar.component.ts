import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

import { FileService } from 'src/app/services/file.service';
import { appUser } from 'src/app/models/appuser.model';
import { ZIFile } from 'src/app/models/zifile.model';

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

    private _isLoggedIn: boolean = false;

    fileData: File = null;
    byteArray: ArrayBuffer;

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    constructor(private router: Router, private fileService: FileService) { }

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
        const file = new ZIFile();
        file.name = this.fileData.name;
        file.hash = appUser.token;

        const uint8 = new Uint8Array(this.byteArray);
        const b64encoded = btoa(String.fromCharCode.apply(null, uint8));
        file.data = b64encoded;

        this.fileService.postFile(file)
            .subscribe(response => {
                console.log(response);
            });
    }

    onChooseFile() {
        const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
        fileUpload.click();
    }

    ngDoCheck(): void {
        this.isLoggedIn = appUser.token ? true : false;
    }

    private logout(): void {
        appUser.token = undefined;
        this.router.navigate(['/login']);
    }
}
