import {Component, OnInit} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../interface/reservation";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
  allMyReservations: Reservation[];
  columnsToDisplay = ['id', 'date', 'start time', 'end time', 'workplace', 'room'];

  constructor(private reservationService: ReservationService) {
  }

  getAllReservationsByEmployeeId(employeeId: number){
    employeeId = 1;

    this.reservationService.getAllReservationsByEmployeeId(employeeId).subscribe(reservations => this.allMyReservations = reservations);
  }

  ngOnInit(): void {
  }

  //TODO: function that will get the 3 most recent reservations and if there
  // is a fourth enables the empty card with the text and link "See other reservations"
}
