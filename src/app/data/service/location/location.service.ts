import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Location } from "../../interface/Location";

/**
 * The LocationService makes API calls to the LocationController in the back-end.
 */
@Injectable({
	providedIn: 'root'
})
export class LocationService {
	apiUrl = `${environment.baseUrl}/locations`;

	/**
	 * Constructor of the LocationService class.
	 *
	 * @param http - The http client to make http requests
	 */
	constructor(private http: HttpClient) {
	}

	/**
	 * Makes a http GET request to the /locations path
	 *
	 * @returns - An observable of the locations array
	 */
	getLocations(): Observable<Location[]> {
		return this.http.get<Location[]>(this.apiUrl);
	}
}