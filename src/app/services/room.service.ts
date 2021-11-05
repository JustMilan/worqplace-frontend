import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Room } from "../interface/Room";

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/rooms';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAvailableFullRooms(locationId: number, date: string, start: string, end: string): Observable<Room[]> {
    const url = `${this.apiUrl}/availability?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;

    return this.httpClient.get<Room[]>(url).pipe(catchError(error => throwError(error)));
  }

  getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string): Observable<Room[]> {
    const url = `${this.apiUrl}/availability/workplaces?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;
    return this.httpClient.get<Room[]>(url).pipe(catchError(error => throwError(error)));
  }
}
