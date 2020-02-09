import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ZIFile } from '../models/zifile.model';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class StatisticsService{
	constructor(private http: HttpClient) {
	}

	postFile(file: ZIFile): Observable<any> {
		return this.http.post(`${environment.statisticsController}`, file);
	}

	deleteFile(file: ZIFile): Observable<any> {
		const options = {
			headers: new HttpHeaders({
			  'Content-Type': 'application/json',
			}),
			body: file,
		  };
		return this.http.delete(`${environment.statisticsController}`,options);
	}
}