import { Purchase } from '../models/purchase';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private purchaseUrl: string = '/api/purchases';

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns {Observable<Purchase[]>}
   */
  public getAllPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(environment.baseUrl + this.purchaseUrl, {
      headers: environment.headers,
    });
  }

  /**
   * 
   * @param {number} userId 
   * @returns {Observable<Purchase[]>}
   */
  public getUserPurchases(userId: number): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(
      environment.baseUrl + this.purchaseUrl + `/user/${userId}`,
      {
        headers: environment.headers,
      }
    );
  }
}
