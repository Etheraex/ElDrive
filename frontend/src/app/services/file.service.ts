import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { ZIFile } from '../models/zifile.model';
import { appUser } from '../models/appuser.model';

@Injectable({
	providedIn: 'root'
})
export class FileService {

	files: Subject<Array<ZIFile>> = new Subject<Array<ZIFile>>();

	constructor(private http: HttpClient) { }

	getFiles(): void {
		const postData = new PostData();
		postData.payload = appUser.hash;
		this.http.post<Array<ZIFile>>(`${environment.fileController}/loadfiles`, postData).subscribe(response => {
			this.files.next(response);
		});
	}

	postFile(file: ZIFile): Observable<any> {
		return this.http.post(`${environment.fileController}`, file);
	}

	deleteFile(id: number): Observable<any> {
		console.log('da')
		return this.http.delete(`${environment.fileController}/${id}`);
	}
}

class PostData {
	payload: string;
}