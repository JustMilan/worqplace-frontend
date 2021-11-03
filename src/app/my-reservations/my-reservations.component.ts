import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../interface/reservation";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  allMyReservations: Reservation[];
  columnsToDisplay = ['id', 'date', 'tijd', 'roomId', 'workplaceAmount'];
  dataSource: MatTableDataSource<Reservation> = new MatTableDataSource();

  constructor(private reservationService: ReservationService) {
  }

  getAllReservationsByEmployeeId(employeeId: number) {
    employeeId = 1;

    this.reservationService.getAllReservationsByEmployeeId(employeeId).subscribe(reservations => this.allMyReservations = reservations);
  }

  ngOnInit(): void {
    this.getAllReservationsByEmployeeId(1);
    this.dataSource = new MatTableDataSource(this.allMyReservations);
    console.log(this.dataSource)
  }
}
