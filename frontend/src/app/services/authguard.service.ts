import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { CookieService } from './cookie.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private _router: Router, private cookieService: CookieService, private authService: AuthService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (this.cookieService.checkCookie())
			return true;
		this._router.navigate(["/login"]);
		return false;
	}
}