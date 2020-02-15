import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ServicePlan, Free } from '../models/serviceplan.model';

@Injectable({
	providedIn: 'root'
})
export class PlanService {

	constructor(private http: HttpClient) {}

	init() {
		this.postPlan(Free).subscribe();
		this.postPlan(new ServicePlan("Advanced", 10, 10, true)).subscribe();
		this.postPlan(new ServicePlan("Premium", 100, 100, true)).subscribe();
	}

	getPlans(): Observable<Array<ServicePlan>> {
		return this.http.get<Array<ServicePlan>>(`${environment.planController}`);
	}

	postPlan(plan: ServicePlan): Observable<ServicePlan> {
		return this.http.post<ServicePlan>(`${environment.planController}`, plan);
	}
}
