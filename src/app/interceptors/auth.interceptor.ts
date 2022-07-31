import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {User} from "../models/user";
import {AuthService} from "@auth0/auth0-angular";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authentication: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.authentication.token;
    console.log("I GOT THE TOKEN!!!!")
    console.log(token)
    if (token) {
      request = request.clone({
        headers: request.headers.set('authorization', 'Bearer ' + this.authentication.token)
      })
    }
    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide:HTTP_INTERCEPTORS,
  useClass:AuthInterceptor,
  multi: true,
}
