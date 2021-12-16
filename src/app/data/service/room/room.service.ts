import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { Room } from "../../interface/Room";

/**
 * The RoomService makes API calls to the RoomController in the back-end.
 */
@Injectable({
	providedIn: 'root'
})
export class RoomService {
	apiUrl = `${environment.baseUrl}/rooms`;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	/**
	 * Constructor of the RoomService class.
	 *
	 * @param http - The http client to make http requests
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * Makes a http GET request to the /rooms/availability path
	 *
	 * @param locationId - the location id
	 * @param date - the date
	 * @param start - the start time
	 * @param end - the end time
	 * @returns - An observable of the rooms array
	 */
	getAvailableFullRooms(locationId: number, date: string, start: string, end: string): Observable<Room[]> {
		const url = `${this.apiUrl}/availability?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;

		return this.http.get<Room[]>(url).pipe(catchError(error => throwError(error)));
	}

	/**
	 * Makes a http GET request to the /rooms/availability/workplaces path
	 *
	 * @param locationId - the location id
	 * @param date - the date
	 * @param start - the start time
	 * @param end - the end time
	 * @returns - An observable of the rooms array
	 */
	getAvailableWorkplacesInRooms(locationId: number, date: string, start: string, end: string): Observable<Room[]> {
		const url = `${this.apiUrl}/availability/workplaces?locationId=${locationId}&date=${date}&start=${start}&end=${end}`;
		return this.http.get<Room[]>(url).pipe(catchError(error => throwError(error)));
	}
}
