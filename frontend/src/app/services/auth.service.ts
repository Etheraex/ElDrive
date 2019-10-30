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

    login(loginInfo: AppUser): Observable<any> {
        return this.http.post(`${environment.authController}/login`, loginInfo);
    }

    register(registerInfo: AppUser): Observable<any> {
        return this.http.post(`${environment.authController}`, registerInfo);
    }
}
