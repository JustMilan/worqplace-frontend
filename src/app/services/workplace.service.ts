import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Workplace } from "../interface/workplace";

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
    const url = `${this.apiUrl}/availability?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;

    return this.httpClient.get<Workplace[]>(url);
  }

}
