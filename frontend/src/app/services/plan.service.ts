import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServicePlan } from '../models/serviceplan.model';

@Injectable({
	providedIn: 'root'
})
export class PlanService {

	constructor(private http: HttpClient) {}

	getFiles(): Observable<Array<ServicePlan>> {
		return this.http.get<Array<ServicePlan>>(`${environment.planController}`);
	}

}
