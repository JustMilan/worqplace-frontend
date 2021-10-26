import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workplace } from "../interface/workplace";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {
  private apiUrl = 'http://localhost:8080/workplaces';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAvailableWorkplaces(locationId: number, date: string, start: string, end: string): Observable<Workplace[]> {
    const url = `${this.apiUrl}/availability/workplaces?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;

    return this.httpClient.get<Workplace[]>(url).pipe(catchError(error => throwError(error)));
  }

}
