import { Address } from './../models/address';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  addressUrl: string = `${environment.baseUrl}/api/addresses`;

  constructor(private http: HttpClient) { }

  getUserAddresses(userId: number): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.addressUrl}/user/${userId}`, {
      headers: environment.headers,
    });
  }

  /**
   * 
   * @param {number} userId
   * @param {Address} address 
   * @returns {Observable<Address>} addresses
   */
  addAddress(address: Address, userId: number): Observable<Address> {
    return this.http
      .post<Address>(`${this.addressUrl}/${userId}`, address, { headers: environment.headers, })
  }


  /**
   * 
   * @param {Address} address 
   * @param {number} userId 
   * @returns {Observable<Address>} address
   */
  updateAddress(address: Address, userId: number): Observable<Address> {
    return this.http.put<Address>(`${this.addressUrl}/${userId}`, address, {
      headers: environment.headers,
    });
  }
}