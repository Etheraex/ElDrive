import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) { }

	getFiles(): Observable<any> {
		return this.http.get<string>(`${environment.fileController}`);
	}

	postFiles(data: string): Observable<any> {
		let body = new HttpParams();
		console.log(data);
		body = body.set('encryptedData', btoa(data));
		return this.http.post(`${environment.fileController}`, body);
	}
}
