import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    // const headers: HttpHeaders = environment.headers;
    data.append('file', file);

    return this.http.put(environment.baseUrl + '/api/product/uploadFile', data, {
      headers: environment.headers,
      reportProgress: true,
      responseType: 'text'
    });
  }
}
