import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Reservation } from "../../../../../data/interface/Reservation";
import { ReservationService } from "../../../../../data/service/reservation/reservation.service";
import { Subscription } from "rxjs";
import { UiService } from "../../../../reservation/service/ui.service";
import { Router } from "@angular/router";
import { LocationService } from "../../../../../data/service/location/location.service";
import { Location } from "../../../../../data/interface/Location";
import { MatSelectChange } from "@angular/material/select";

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

	locations: Location[];
	location: number;

	showAddTask: boolean;
	subscription: Subscription;

	constructor(private reservationService: ReservationService,
				private locationService: LocationService,
				private uiService: UiService, private router: Router) {

		this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
	}

	hasRoute(route: string) {
		return this.router.url === route;
	}

	getAllReservationsByLocationId(locationId: number) {
		this.reservationService.getAllReservationsByLocationId(locationId).subscribe(reservations => {
			this.allMyReservations = reservations;
			this.allMyReservationsSlice = this.allMyReservations.slice(0, 3);
		});
	}

	refresh($event: MatSelectChange) {
		this.getAllReservationsByLocationId($event.value);
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
		this.locationService.getLocations()
			.subscribe(locations => {
				this.locations = locations
			});
	}
}
