import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NoteCollection } from 'src/app/models/noteCollecion.model';

@Injectable({
	providedIn: 'root'
})
export class NoteService {
	constructor(private http: HttpClient) { }

	getNotes(noteId: string): Observable<NoteCollection> {
		return this.http.get(`${environment.noteController}/${noteId}`) as Observable<NoteCollection>;
	}

	postNotes(noteCollection: NoteCollection): Observable<NoteCollection> {
		return this.http.post<NoteCollection>(`${environment.noteController}`, noteCollection);
	}

	updateNotes(noteCollection: NoteCollection): Observable<NoteCollection> {
		return this.http.put<NoteCollection>(`${environment.noteController}/${noteCollection.id}`, noteCollection);
	}

}