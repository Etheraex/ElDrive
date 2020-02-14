import { Injectable } from '@angular/core';

import { CookieService as NGXCookieService } from 'ngx-cookie-service';

import { AppUser } from '../models/appuser.model';

@Injectable({
	providedIn: 'root'
})
export class CookieService {

	constructor(private cookies:NGXCookieService) {

	}

	setCookie(userData: AppUser): void {
		this.cookies.set("user", userData.name);
	}

	checkCookie(): boolean {
		return this.cookies.check("user");
	}

	getCookie() {
		if (this.checkCookie())
			return this.cookies.get("user");
	}

	removeCookie() {
		if (this.checkCookie())
			this.cookies.delete("user");
	}
}
