import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { Location } from "../../interface/Location";

@Injectable({
	providedIn: 'root'
})
export class LocationService {
	private apiUrl = `${environment.baseUrl}/locations`;

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json'
		})
	}

	constructor(private httpClient: HttpClient) {
	}

	getLocations(): Observable<Location[]> {
		return this.httpClient.get<Location[]>(this.apiUrl);
	}
}
