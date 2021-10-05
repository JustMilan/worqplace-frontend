import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {MockReservations} from "./mockReservations";
import {OpenWorkplace} from "./interface/open-workplace";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() {
  }

  getOpenReservations(): Observable<OpenWorkplace[]> {
    return of(MockReservations);
  }
}
