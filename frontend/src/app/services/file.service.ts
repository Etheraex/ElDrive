import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ZIFile } from '../models/zifile.model';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    getFiles(): Observable<any> {
        return this.http.get<string>(`${environment.fileController}`);
    }

    postFile(data: ArrayBuffer): Observable<any> {
        const uint8 = new Uint8Array(data);
        const b64encoded = btoa(String.fromCharCode.apply(null, uint8));
        const file = new ZIFile();
        file.data = b64encoded;
        file.id = 1;
        file.name = 'Test fajl';
        file.userHash = 'Test user hash';
        return this.http.post(`${environment.fileController}`, file);
    }
}
