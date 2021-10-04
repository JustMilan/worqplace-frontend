import {Component, OnInit} from '@angular/core';
import {Workplace} from "../Workplace";
import {ReservationService} from "../reservation.service";
import {OpenWorkplace} from "../open-workplace";
import {Observable} from "rxjs";

@Component({
  selector: 'app-open-workplace-card',
  templateUrl: './open-workplace-card.component.html',
  styleUrls: ['./open-workplace-card.component.css']
})
export class OpenWorkplaceCardComponent implements OnInit {
  workplaces: OpenWorkplace[] = [];

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit(): void {
    this.getOpenReservations();
  }

  getOpenReservations(): void {
    this.reservationService.getOpenReservations().subscribe(openReservations => this.workplaces = openReservations);
  }

}
