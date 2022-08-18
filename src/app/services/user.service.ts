import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { User } from '../models/user';
import { UserWithId } from "../models/userWithId";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // userUrl: string = url + `/users`;
  userUrl: string = environment.baseUrl + `/api/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  /**
   * Finds all Users
   * @returns {Observable<User[]>}
   */
  findAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.userUrl, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Finds a User by Id
   * @param {number} id 
   * @returns {Observable<User>}
   */
  findUserById(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Finds a User by Email
   * @param {string} email 
   * @returns {Observable<UserWithId>}
   */
  findUserByEmail(email: string): Observable<UserWithId> {
    return this.http
      .get<UserWithId>(`${this.userUrl}/email/${email}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Finds a new User given nonexisting property username
   * @param {string} username 
   * @returns {Observable<User>}
   */
  findUserByUsername(username: string): Observable<User> {
    return this.http
      .get<User>(`${this.userUrl}/${username}`, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Register a new User
   * @param {User} user 
   * @returns {Observable<User>}
   */
  registerUser(user: User): Observable<User> {
    return this.http
      .post<User>(`${this.userUrl}`, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  /**
   * Updates a User
   * @param {User} user 
   * @param {number} id 
   * @returns {Observable<User>}
   */
  updateUser(user: User, id: number): Observable<User> {
    let updatedUser = new UserWithId(id, user.email, user.firstName, user.lastName, user.password, user.role, [], [], [])
    return this.http
      .put<User>(`${this.userUrl}`, updatedUser, {
        headers: environment.headers,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.log('An error has occured: ', httpError.error.message);
    } else {
      console.error();
    }

    return throwError(() => new Error('something went wrong'));
  }
}
