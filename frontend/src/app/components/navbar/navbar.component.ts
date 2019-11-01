import { Router } from '@angular/router';
import { Component, DoCheck } from '@angular/core';

import { loggedInUser } from 'src/app/models/appuser.model';

@Component({
    selector: 'navbar',
    template: `<mat-toolbar color="primary">
                    <span>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/register' ]">Register</button>
                        <button *ngIf="!isLoggedIn" mat-button [routerLink]="[ '/login' ]">Login</button>
                        <button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/upload' ]">Upload file</button>
                        <button *ngIf="isLoggedIn" mat-button [routerLink]="[ '/files']">My files</button>
                        <button class="logout" *ngIf="isLoggedIn" mat-button (click)="logout()">Log out</button>
                    </span>
                    <span class="title">ZI i NBP Dropbox simulation project</span>
                </mat-toolbar>`,
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
    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }
    set isLoggedIn(value: boolean) {
        this._isLoggedIn = value;
    }

    constructor(private router: Router) {
        this.isLoggedIn = loggedInUser.id ? true : false;
    }

    ngDoCheck(): void {
        this.isLoggedIn = loggedInUser.id ? true : false;
    }

    private logout(): void {
        loggedInUser.logout();
        this.router.navigate(['/register']);
    }
}
