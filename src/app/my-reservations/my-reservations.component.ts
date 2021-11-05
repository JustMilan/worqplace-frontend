import {Component, OnInit, ViewChild} from '@angular/core';
import {ReservationService} from "../services/reservation.service";
import {Reservation} from "../interface/reservation";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public allMyReservations: Reservation[];
  public allMyReservationsSlice: Reservation[];
  columnsToDisplay = ['id', 'date', 'tijd', 'roomId', 'workplaceAmount'];

  constructor(private reservationService: ReservationService) {
  }

  getAllReservationsByEmployeeId(employeeId: number) {
    employeeId = 1;

    this.reservationService.getAllReservationsByEmployeeId(employeeId).subscribe(reservations => this.allMyReservations = reservations);
  }

  OnPageChange(event: PageEvent){
    console.log(event)
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allMyReservations.length){
      endIndex = this.allMyReservations.length;
    }
    this.allMyReservationsSlice = this.allMyReservations.slice(startIndex, endIndex)
  }

  ngOnInit(): void {
    this.getAllReservationsByEmployeeId(1);
    setTimeout(()=>{
      this.allMyReservationsSlice = this.allMyReservations.slice(0,3);
      console.log(this.allMyReservationsSlice);
    }, 50);
  }
}
