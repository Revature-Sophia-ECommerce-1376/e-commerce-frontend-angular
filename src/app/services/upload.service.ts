import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {


  constructor(private http: HttpClient) { }

  /**
   * Pushes file to backend
   * 
   * @param {File} file 
   * @returns {Observable<string>}
   */
  pushFile(file: File): Observable<string> { //: Observable<HttpEvent<{}>>
    const data: FormData = new FormData();
    const headers: HttpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200' });
    data.append('file', file);

    return this.http.put('http://localhost:8080/api/product/uploadFile', data, {
      headers: headers,
      reportProgress: true,
      responseType: 'text'
    });
  }
}
