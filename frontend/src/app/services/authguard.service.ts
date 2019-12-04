import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { appUser } from '../models/appuser.model'

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _router: Router) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (appUser.hash)
			return true;
		this._router.navigate(["/login"]);
		return false;
	}
}