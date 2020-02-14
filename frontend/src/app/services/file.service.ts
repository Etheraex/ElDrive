import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ZIFile } from '../models/zifile.model';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	files: Subject<Array<ZIFile>> = new Subject<Array<ZIFile>>();

	constructor(private http: HttpClient) {
	}

	getFiles(hash: string): void {
		const postData = new PostData();
		postData.payload = hash;
		this.http.post<Array<ZIFile>>(`${environment.fileController}/loadfiles`, postData).subscribe(response => this.files.next(response));
	}

	postFile(file: ZIFile): Observable<any> {
		return this.http.post(`${environment.fileController}`, file);
	}

	deleteFile(id: string): Observable<any> {
		return this.http.delete(`${environment.fileController}/${id}`);
	}

	downloadFile(id: string): Observable<ZIFile> {
		return this.http.get<ZIFile>(`${environment.fileController}/${id}`);
	}

	updateFile(file: ZIFile): Observable<ZIFile> {
		return this.http.put<ZIFile>(`${environment.fileController}/${file.id}`, file) as Observable<ZIFile>;
	}

	getSharedFiles(hash: string): Observable<Array<ZIFile>> {
		const postData = new PostData();
		postData.payload = hash;
		return this.http.post<Array<ZIFile>>(`${environment.fileController}/shared`, postData);
	}
}

class PostData {
	payload: string;
}