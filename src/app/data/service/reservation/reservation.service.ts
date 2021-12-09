import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Reservation } from "../../interface/Reservation";

@Injectable({
	providedIn: 'root'
})
export class ReservationService {
	private apiUrl = `${environment.baseUrl}/reservations`;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	constructor(private http: HttpClient) {
	}

	reserveWorkplace(reservation: Reservation): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/workplaces`, reservation, this.httpOptions);
	}

	reserveRoom(reservation: Reservation): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/rooms`, reservation, this.httpOptions);
	}

	getAllReservationsByEmployeeId(employeeId: number): Observable<Reservation[]> {
		return this.http.get<Reservation[]>(`${this.apiUrl}/${employeeId}/all`, this.httpOptions);
	}

	getAllReservationsByLocationId(locationId: number): Observable<Reservation[]> {
		return this.http.get<Reservation[]>(`${this.apiUrl}/location/${locationId}`, this.httpOptions);
	}

	deleteReservationById(reservation: Reservation): Observable<Reservation> {
		console.log("stap 2/2 deleteReservationById " + `${this.apiUrl}/${reservation.id}`)
		return this.http.post<Reservation>(`${this.apiUrl}/delete/${reservation.id}`, this.httpOptions)
	}
}
