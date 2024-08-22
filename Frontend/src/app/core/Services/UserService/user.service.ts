import { Injectable } from '@angular/core';
import {UserResponse} from "../../Models/UserResponse";
import {AccountService} from "../AccountService/account.service";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  User: UserResponse | null= null;
  private apiUrl = 'http://localhost:8080';
  constructor(private accountService : AccountService, private http : HttpClient) { }

  getInfo() {
    this.accountService.userInfo().subscribe({
      next: (data : UserResponse) => {
        this.User = data;
      },
      error: (err : any) => {
        console.error(err);
      }
    });
  }

  getUsername() {
    return this.User?.username;
  }

  getName() {
    return this.User?.name;
  }

  getEmail() {
    return this.User?.email;
  }

  findUser(username : String): Observable<UserResponse> {
    let params = new HttpParams();
    params = params.append('username', `${username}`);
    return this.http.get<UserResponse>(`${this.apiUrl}/profile/user`, {params : params})
  }

}
