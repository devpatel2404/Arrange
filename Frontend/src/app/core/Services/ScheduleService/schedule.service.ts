import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NylasService} from "../NylasService/nylas.service";
import {Observable} from "rxjs";
import {Schedule} from "../../Models/Schedule";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient : HttpClient, private nylasService : NylasService) { }

  getUserSchedule(userId : number, username : string): Observable<Schedule[]> {
    return this.nylasService.retrieveSchedule(userId, username);
  }

}
