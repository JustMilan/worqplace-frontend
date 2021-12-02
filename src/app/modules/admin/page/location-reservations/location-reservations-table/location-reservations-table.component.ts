import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Reservation } from "../../../../../data/interface/Reservation";
import { ReservationService } from "../../../../../data/service/reservation/reservation.service";
import { Subscription } from "rxjs";
import { UiService } from "../../../../reservation/service/ui.service";
import { Router } from "@angular/router";

@Component({
	selector: 'app-admin-location-reservations-table',
	templateUrl: './location-reservations-table.component.html',
	styleUrls: ['./location-reservations-table.component.css']
})
export class AdminLocationReservationsTableComponent implements OnInit {

	@ViewChild(MatPaginator) paginator: MatPaginator;
	public allMyReservations: Reservation[];
	public allMyReservationsSlice: Reservation[];
	columnsToDisplay = ['id', 'date', 'tijd', 'roomId', 'workplaceAmount', 'recurrence'];

	showAddTask: boolean;
	subscription: Subscription;

	constructor(private reservationService: ReservationService,
				private uiService: UiService, private router: Router) {

		this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
	}

	hasRoute(route: string) {
		return this.router.url === route;
	}

	getAllReservationsByLocationId(locationId: number) {
		this.reservationService.getAllReservationsByLocationId(locationId).subscribe(reservations => this.allMyReservations = reservations);
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
		this.getAllReservationsByLocationId(2);
		setTimeout(() => {
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
		}, 50);
	}
}
