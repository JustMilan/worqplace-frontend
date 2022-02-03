import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Reservation } from "../../interface/Reservation";

/**
 * The ReservationService makes API calls to the ReservationController in the back-end.
 */
@Injectable({
	providedIn: 'root'
})
export class ReservationService {
	apiUrl = `${environment.baseUrl}/reservations`;

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	}

	/**
	 * Constructor of the ReservationService class.
	 *
	 * @param http - The http client to make http requests
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * Makes a http POST request to the reservations/workplaces path to reserve workplaces
	 *
	 * @param reservation - the reservation object for the workplace
	 * @returns - An observable of the reservation object
	 */
	reserveWorkplace(reservation: Reservation): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/workplaces`, reservation, this.httpOptions);
	}

	/**
	 * Makes a http POST request to the reservations/rooms path to reserve a room
	 *
	 * @param reservation - the reservation object for the room
	 * @returns - An observable of the reservation object
	 */
	reserveRoom(reservation: Reservation): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/rooms`, reservation, this.httpOptions);
	}

	/**
	 * Makes a http GET request to the /reservations/all path
	 * The Backend automatically picks up the userId from the JWT token.
	 *
	 * @returns - An observable of the reservations array
	 */
	getAllReservationsByEmployeeId(): Observable<Reservation[]> {
		return this.http.get<Reservation[]>(`${this.apiUrl}/all`, this.httpOptions);
	}

	/**
	 * Makes a http GET request to the /reservations/all path with date and locationId params
	 * The Backend automatically picks up the userId from the JWT token.
	 *
	 * @param date - the lowest date to get Reservations from
	 * @param locationId - the id of the location
	 *
	 * @returns - An observable of the reservations array
	 */
	getAllReservationsByEmployeeIdAndFilters(date: Date | null, locationId: number | undefined): Observable<Reservation[]> {
		let params = new HttpParams();

		if (date) {
			date.setHours(12);
			params = params.set("date", date.toISOString().split('T')[0]);
		}

		if (locationId) params = params.set("location", locationId);
		let customHttpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			}),
			params: params,
		}


		return this.http.get<Reservation[]>(`${this.apiUrl}/all`, customHttpOptions);
	}

	/**
	 * Makes a http GET request to the /reservations/locations/{id} path
	 *
	 * @param locationId - the id of the location
	 *
	 * @returns - An observable of the reservations array
	 */
	getAllReservationsByLocationId(locationId: number): Observable<Reservation[]> {
		return this.http.get<Reservation[]>(`${this.apiUrl}/location/${locationId}`, this.httpOptions);
	}

	/**
	 * Makes a http POST request to the reservations/delete/{id} path to reserve a room
	 *
	 * TODO -> Its currently a post because the delete is not allowed in the CORS filter, it must be fixed
	 * @param reservationId - the id of the reservation
	 * @returns - An observable of the reservation object
	 */
	deleteReservationById(reservationId: number): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/delete/${reservationId}`, this.httpOptions)
	}

	/* istanbul ignore next: backend not implemented yet */
	/**
	 * Makes a http POST request to the reservations/update/{id} path to update a reservation.
	 *
	 * @param reservation {@link Reservation}
	 */
	updateReservation(reservation: Reservation): Observable<Reservation> {
		return this.http.post<Reservation>(`${this.apiUrl}/update`, reservation, this.httpOptions)
	}
}
