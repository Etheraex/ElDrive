import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ServicePlan } from '../models/serviceplan.model';

@Injectable({
	providedIn: 'root'
})
export class PlanService {

	
	constructor(private http: HttpClient) {
	}

	getFiles(): Observable<any> {
	
		return this.http.get<Array<ServicePlan>>(`${environment.planController}`);
	}


}
