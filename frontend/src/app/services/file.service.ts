import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	constructor(private http: HttpClient) {
	}

	getFiles(): Observable<any> {
		return this.http.get<string>(environment.fileController);
	}
}
