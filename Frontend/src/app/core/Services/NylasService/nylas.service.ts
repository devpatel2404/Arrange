import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Schedule} from "../../Models/Schedule";

@Injectable({
  providedIn: 'root'
})
export class NylasService {
  private apiUrl = 'https://api.us.nylas.com/v3/grants'
  private key = 'Arrange'
  constructor(private http: HttpClient) { }

  retrieveSchedule(userID : number, username : string) {
    return this.http.get<Schedule[]>(`${this.apiUrl}`);
  }
}
