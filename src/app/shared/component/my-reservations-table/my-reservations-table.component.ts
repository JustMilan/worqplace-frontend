import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Reservation } from "../../../data/interface/Reservation";
import { ReservationService } from "../../../data/service/reservation/reservation.service";
import { Subscription } from "rxjs";
import { UiService } from "../../../modules/reservation/service/ui.service";
import { Router } from "@angular/router";

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

	showAddTask: boolean;
	subscription: Subscription;

	constructor(private reservationService: ReservationService,
				private uiService: UiService, private router: Router) {

		this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
	}

	hasRoute(route: string) {
		return this.router.url === route;
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
