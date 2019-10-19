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

	postFile(data: ArrayBuffer): Observable<any> {
		const uint8 = new Uint8Array(data);
		console.log(uint8);
		const b64encoded = btoa(String.fromCharCode.apply(null, uint8));
		console.log(b64encoded);
		const formData = new FormData();
		formData.append('encryptedData', b64encoded);
		return this.http.post(`${environment.fileController}`, formData);
	}
}
