import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LoginDTO, SignupDTO} from "../DTO";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient, private router: Router) { }

  login(formData : LoginDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData)
      .pipe(catchError(this.handleError))
  }

  signup(formData: SignupDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData)
      .pipe(catchError(this.handleError));
  }

  setToken(token:string) {
    document.cookie = `token=${token}; HttpOnly; Secure; SameSite=Strict`;
  }

  getToken() : String {
    return document.cookie;
  }

  logout() {
    this.setToken('');
    this.router.navigate(['']);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong'));
  }
}
