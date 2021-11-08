import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Reservation } from "../../../data/interface/Reservation";
import { ReservationService } from "../../../data/service/reservation/reservation.service";

@Component({
	selector: 'app-my-reservations-table',
	templateUrl: './my-reservations-table.component.html',
	styleUrls: ['./my-reservations-table.component.css']
})
export class MyReservationsTableComponent implements OnInit {

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

	OnPageChange(event: PageEvent) {
		const startIndex = event.pageIndex * event.pageSize;
		let endIndex = startIndex + event.pageSize;
		if (endIndex > this.allMyReservations.length) {
			endIndex = this.allMyReservations.length;
		}
		this.allMyReservationsSlice = this.allMyReservations.slice(startIndex, endIndex)
	}

	ngOnInit(): void {
		this.getAllReservationsByEmployeeId(1);
		setTimeout(() => {
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
		}, 50);
	}
}
