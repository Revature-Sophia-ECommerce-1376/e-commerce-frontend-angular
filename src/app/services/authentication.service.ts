import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor() {}

  _token:string = "";
  _role:string = "GUEST"

  get token() {
    return this._token;
  }

  set token(token){
    this._token = token;
  }


  get role() {
    return this._role;
  }

  set role(role){
    this._role = role;
  }
}
