import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Workplace} from "../interface/workplace";
import {ReservationResponse} from "../interface/reservation-response";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/reservation';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
  }

  reserve(workplace: Workplace): Observable<ReservationResponse> {
    return this.http.put<ReservationResponse>("http://localhost:8080/reservations/workplaces/" + workplace.id.toString(), {observe: 'response'});
  }
}
