import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppUser } from '../models/appuser.model';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	login(loginInfo: AppUser): Observable<AppUser> {
		return this.http.post(`${environment.authController}/login`, loginInfo) as Observable<AppUser>;
	}

	register(registerInfo: AppUser): Observable<string> {
		return this.http.post(`${environment.authController}`, registerInfo) as Observable<string>;
	}

	updateUser(userInfo: AppUser): Observable<AppUser> {
		return this.http.put(`${environment.authController}/${userInfo.id}`, userInfo) as Observable<AppUser>;
	}

	getUserFromName(name: string): Observable<AppUser> {
		return this.http.get(`${environment.authController}/${name}`) as Observable<AppUser>;
	}
}
