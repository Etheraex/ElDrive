import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ZIFile } from '../models/zifile.model';
import { Observable } from 'rxjs';
import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
@Injectable({
	providedIn: 'root'
})
export class StatisticsService{
	constructor(private http: HttpClient) {
	}

	getStatistics() : Observable<any>{
		return this.http.get(`${environment.statisticsController}`);
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

	addDataPlan(plan: string): Observable<any>{
		return this.http.put(`${environment.statisticsController}/${environment.addPlanEndpoint}/${plan}`,null);
	}

	removeDataPlan(plan: string): Observable<any>{
		return this.http.put(`${environment.statisticsController}/${environment.removePlanEndpoint}/${plan}`,null);
	}

	changeFildCount(fildName : StatisticFileds,isIncrement: boolean = true ): Observable<any>{
		return this.http.put(`${environment.statisticsController}/${StatisticFileds[fildName]}`,(isIncrement)?1:-1)
	}
}

export enum StatisticFileds{
	NumberOfUsers,
	NumberOfMessages
}