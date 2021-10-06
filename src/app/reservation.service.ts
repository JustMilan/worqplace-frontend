import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Location} from "./interface/location";
import {OpenWorkplace} from "./interface/open-workplace";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private locationURL = 'http://localhost:8080/locations';  // URL to web api
  private availableWorkplacesURL = 'http://localhost:8080/workplaces/available';

  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient) {
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.locationURL, this.httpOptions);
  }

  getAllAvailableWorkplaces(): Observable<OpenWorkplace[]> {
    return this.http.get<OpenWorkplace[]>(this.availableWorkplacesURL, this.httpOptions);
  }

  reserve(workplace: OpenWorkplace) {

    this.http.post<OpenWorkplace>("http://localhost:8080/workplaces/book/" + workplace.id.toString(), {observe: 'response'})
      .subscribe(resp => {
        alert(resp)
      })
  }
}
