import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { AppUser } from '../models/appuser.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	getUsers(): Observable<Array<AppUser>> {
		return this.http.get(`${environment.authController}`) as Observable<Array<AppUser>>;
	}

	login(loginInfo: AppUser): Observable<AppUser> {
		return this.http.post(`${environment.authController}/login`, loginInfo) as Observable<AppUser>;
	}

	register(registerInfo: AppUser): Observable<AppUser> {
		return this.http.post(`${environment.authController}`, registerInfo) as Observable<AppUser>;
	}

	updateUser(userInfo: AppUser): Observable<AppUser> {
		return this.http.put(`${environment.authController}/${userInfo.id}`, userInfo) as Observable<AppUser>;
	}

	getUserFromName(name: string): Observable<AppUser> {
		return this.http.get(`${environment.authController}/${name}`) as Observable<AppUser>;
	}
}
