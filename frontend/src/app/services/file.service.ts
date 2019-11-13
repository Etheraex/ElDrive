import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ZIFile } from '../models/zifile.model';
import { appUser } from '../models/appuser.model';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    constructor(private http: HttpClient) { }

    getFiles(): Observable<Array<ZIFile>> {
        const test = new Test();
        test.hash = appUser.token;
        // const hash = { hash: appUser.token };
        return this.http.post<Array<ZIFile>>(`${environment.fileController}/loadfiles`, test);
    }

    postFile(file: ZIFile): Observable<any> {
        return this.http.post(`${environment.fileController}`, file);
    }
}

class Test{
    hash: string;
}