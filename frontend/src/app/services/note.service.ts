import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NoteCollection } from 'src/app/models/noteCollecion.model';

@Injectable({
	providedIn: 'root'
})
export class NoteService {
	constructor(private http: HttpClient) {}

	getNotes(noteId : string) : Observable<any> {
		return this.http.get(`${environment.noteCotroller}/${noteId}`);
	}

	postNotes(noteCollecion : NoteCollection){
		return this.http.post(`${environment.noteCotroller}`,noteCollecion);
	}

	updateNotes(noteCollecion : NoteCollection){
		return this.http.put(`${environment.noteCotroller}/${noteCollecion.id}`,noteCollecion);
	}

}