import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpParamsOptions} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {LoginDTO, SignupDTO} from "../../Models/DTO";
import {Router} from "@angular/router";
import {UserResponse} from "../../Models/UserResponse";
import {UserService} from "../UserService/user.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  login(formData : LoginDTO): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/login`, formData, {withCredentials : true, headers : new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    })
      .pipe(
        tap(response => {
          if (response) localStorage.setItem('authenticated', 'true');
        }),
        catchError(error => this.handleError(error))
      );
  }

  isLoggedIn() {
    return localStorage.getItem('authenticated') === 'true';
  }

  signup(formData: SignupDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/register`, formData)
      .pipe(catchError(error => this.handleError(error)));
  }

  removeToken() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
    localStorage.removeItem('authenticated')
  }

  userInfo(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/auth/userInfo`, {withCredentials: true})
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  logout() {
    this.removeToken();
    this.router.navigate(['']);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong'));
  }
}
